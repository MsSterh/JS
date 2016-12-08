// set the same 'name' for next tags:
// [data-popup-link='name'] - for link which calls popup
// [data-popup-content='name'] - for popup
// [data-popup-ajax='true'] - for ajax popups
// [data-popup-position='left'] - set status as class 'isLeft'
// [data-popup-close='true'] - for close popup button

(function($) {
  $.fn.popup = function(options) {

    var showOverlay = function() {
          if ($('.PopupOverlay').length === 0) {
            $("body").append("<div class='PopupOverlay'></div>");
          } else {
            $('.PopupOverlay').removeClass('isHidden');
          }

          if ($('.PopupContainer').length === 0) {
            $("body").append("<div class='PopupContainer'></div>");
          } else {
            $('.PopupContainer').removeClass('isHidden');
          }
          $('body').addClass('PopupOpen');
        },

      $link = function(name) { return  $('[data-popup-link=' + name + ']'); },
      $popup = function(name) { return  $('[data-popup-content=' + name + ']'); };

    var closeAllPopups = function() {
          $('[data-popup-content]').hide();
          $('.PopupOverlay').unbind('click').addClass('isHidden');
          $('.PopupContainer').addClass('isHidden');
          $(document).unbind('keyup');
          $('body').removeClass('PopupOpen');
        };

    var bindClosePopup = function(name) {
          // close by clicking on Overlay
          $('.PopupOverlay').bind('click', function() {
            closeAllPopups();
          });
          // close by ESC pressing
          $(document).on('keyup', function(e) {
            (e.keyCode == 27) && (closeAllPopups());
          });
        };

    var closePopupByButton = function() {
      $("[data-popup-close='true']").on('click', function() {
        closeAllPopups();
      });
    };

    var setPopupPosition = function(name) {
      var position = $link(name).data('popup-position');

      if (position) {
        var $content = $("[data-popup-content=" + name + "]"),
            new_class = 'is' + position.substr(0, 1).toUpperCase() + position.substr(1);

        $content.removeClass(new_class);
        $content.position({
          my: "right top",
          at: "right top",
          of: $("[data-popup-link=" + name + "]"),
          collision: "none"
        });
        $content.addClass(new_class);
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
              $(".PopupContainer").append($(data).attr('data-popup-content', name));
              closePopupByButton();
              setPopupPosition(name);
            });
          } else {
            var $loaded_popup = $popup(name);
            if (!$loaded_popup.parent().hasClass('.PopupContainer')) {
              $(".PopupContainer").append($loaded_popup);
            }
            $loaded_popup.show();
            setPopupPosition(name);
          }
        });

        closePopupByButton();
    });
  };
})(jQuery);
