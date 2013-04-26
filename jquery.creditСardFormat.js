(function( $ ) {
  $.fn.creditСardFormat = function(options) {

    var settings = $.extend( {
      positionArray : [4, 8, 12],  // array of hyphens position
      lengthArray   : 16           // length of numbers array without hyphen
    }, options);

    var i = -1;
    var arr = settings.positionArray.sort(function(a,b){return a-b}).map(function(value) {
      return value += ++i;
    });

    this.keypress(function(ev) {
      var keyCode = window.event ? ev.keyCode : ev.which;

      // add '-'
      if ($.inArray($(this).val().length, arr) > -1) {
        if (keyCode != 8) {
          $(this).val($(this).val() + '-');
        }
      }

      // remove '-'
      if ($.inArray($(this).val().length - 2, arr) > -1) {
        if (keyCode == 8) {
          $(this).val($(this).val().slice(0, -1));
        }
      }

      //codes for 0-9
      if ((keyCode < 48  ) || keyCode > 57 || $(this).val().length > settings.lengthArray + 2) {
        if (keyCode != 0 && keyCode != 8 && keyCode != 13 && !ev.ctrlKey) {
          ev.preventDefault();
        }
      }
    });
  };
})( jQuery );
