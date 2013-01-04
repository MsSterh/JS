// event after image loading
// second part for cash images

$("#myImg").one("load",function(){
	//do something
})

.each(function(){
	if(this.complete || (jQuery.browser.msie && parseInt(jQuery.browser.version) == 6)) 
	$(this).trigger("load");
});