// set the same 'name' for next tags:
// [data-popup-link='name'] - for link which calls popup
// [data-popup-content='name'] - for popup
// [data-popup-close='name'] - for close popup button

(function($) {
  $.fn.popup = function(options) {

    var showOverlay = function() {
          if ($('.PopupOverlay').length === 0) {
            $("body").append("<div class='PopupOverlay'></div>");
          } else {
            $('.PopupOverlay').removeClass('isHidden');
          }
        },

      $popup = function(name) { return  $('[data-popup-content=' + name + ']'); },
      $close = function(name) { return  $('[data-popup-close=' + name + ']');   };

    var closePopup = function(name) {
          $popup(name).hide();
          $('.PopupOverlay').unbind('click').addClass('isHidden');
          $(document).unbind('keyup');
        };

    var bindClosePopup = function(name) {
          // close by clicking on Overlay
          $('.PopupOverlay').bind('click', function() {
            closePopup(name);
          });
          // close by ESC pressing
          $(document).on('keyup', function(e) {
            (e.keyCode == 27) && (closePopup(name));
          });
        };

    var closePopupByButton = function(name) {
      if ($close(name).length > 0) {
        $close(name).on('click', function() {
          closePopup(name);
        });
      }
    };

    return this.each(function() {
      var name = $(this).data('popup-link');

      $(this)
        .bind('click', function(e) {
          e.preventDefault();
          var $this = $(this);

          showOverlay();
          bindClosePopup(name);

          if (($this.data('popupAjax') === true) && ($popup(name).length === 0)) {
            var url = ($this.data('popupUrl') !== undefined) ? $this.data('popupUrl') : $this.attr('href');

            $.ajax({
              url: url,
              dataType: 'html'
            }).done(function(data) {
              $this.after($(data).attr('data-popup-content', name));
              closePopupByButton(name);
            });
          } else {
            $popup(name).show();
          }
        });

        closePopupByButton(name);
    });
  };
})(jQuery);
