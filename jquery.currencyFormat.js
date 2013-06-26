(function( $ ) {
  $.fn.currencyFormat = function(options) {

    var convert_to_currency =  function(input, hidden_input) {
      hidden_input.val(input.val().replace(/\D/g, ""));

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

        .bind('keyup', function() {
          convert_to_currency(input, hidden_input);
        });
    })
  };
})( jQuery );
