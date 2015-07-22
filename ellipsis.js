(function($) {
  // Call like: $('.ellipsis').addEllipsis();
  // where 'ellipsis' is a class name of your element, which have to have
  // 1. fixed height and css style: overflow: hidden; 
  // 2. <p> inside your element. This tag will be ellipsis according to parent's height.

  $.fn.addEllipsis = function() {

    return this.each(function(){
      var p = $(this).find('p');
      var div_height = $(this).height();

      while ($(p).outerHeight() > div_height) {
        $(p).text(function (index, text) {
          return text.replace(/\W*\s(\S)*$/, '...');
        })
      }
    })
  }
})(jQuery);
