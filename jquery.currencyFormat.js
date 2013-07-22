(function( $ ) {
  $.fn.currencyFormat = function(options) {

    var settings = $.extend( {
      min : 0,          // min value
      max : 99999999    // max value
    }, options);


    function getCaret(el) {
      var pos = 0;
      if (document.selection) {
        // IE Support
        // el.focus ();
        var Sel = document.selection.createRange ();
        Sel.moveStart ('character', -el.value.length);
        pos = Sel.text.length;
      } else if (el.selectionStart || el.selectionStart == '0')
      // Firefox support
        pos = el.selectionStart;
      return (pos);
    }

    function setCaret(el, pos) {
      if(el.setSelectionRange) {
        // el.focus();
        el.setSelectionRange(pos,pos);
      }
      else if (el.createTextRange) {
        var range = el.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }

    var convert_to_currency =  function(input, hidden_input) {
      var value = input.val().replace(/\D/g, "");
      if (value < settings.min) { value = settings.min };
      if (value > settings.max) { value = settings.max };
      hidden_input.val(value);

      if (hidden_input.val() != '') {
        var number = hidden_input.val().split('').reverse().join('');
        var currency = '';
        for (var i = 0; i < number.length; i++) {
          var comma = ((i % 3 == 0) && (i > 0)) ? ','  : '';
          currency = number[i] + comma + currency;
        }
        input.val('$' + currency);
      }
    }

    return this.each(function() {
      var input = $(this),
          hidden_input_id = 'currencyFormat_' + input.attr('name').replace(/\W/g, ""),
          hidden_input = $('<input id=' + hidden_input_id + ' type=hidden name=' + input.attr('name') + ' />');

      if (!$('#' + hidden_input_id).length) {
        input.wrap("<div></div>");
        input.parent().append(hidden_input);
      }

      convert_to_currency(input, hidden_input);

      $(this)
        .bind('keypress', function(ev) {
          var keyCode = window.event ? ev.keyCode : ev.which;

          if (!(keyCode == 118 && (ev.ctrlKey || ev.metaKey)) && ((keyCode < 48) || (keyCode > 57))) {
            if (keyCode != 0 && keyCode != 8 && keyCode != 13 && !ev.ctrlKey) {
              ev.preventDefault();
            }
          }
        })

        .bind('keyup', function(ev) {
          var pos = getCaret($(this).get(0)),
              keyCode = window.event ? ev.keyCode : ev.which,
              comma = input.val().split(',').length;

          convert_to_currency(input, hidden_input);

          comma = comma - input.val().split(',').length;
          if ((comma > 0) && (pos != 1)) {
            pos--;
          } else if ((comma < 0) && (keyCode != 8) || (input.val().length == 2) && (pos == 1)) {
            pos++;
          }
          setCaret($(this).get(0), pos);
        })

        .bind('focusout', function() {
          convert_to_currency(input, hidden_input);
        });
    })
  };
})( jQuery );
