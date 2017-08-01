$(window).on("scroll",function(){

	if($(document).scrollTop()>200){
		$("header").addClass("headeranim");
	}else {

		$("header").removeClass("headeranim");
	}
})