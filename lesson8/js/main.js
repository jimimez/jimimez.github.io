$(window).on("scroll",function(){

	if($(document).scrollTop()>200){
		$("header").addClass("headeranim");
	}else {

		$("header").removeClass("headeranim");
	}
})

$(document).ready(function() {



	var elementWidth = $('.slide').width();
	var activeIndex = 0;
	var speed = 300;
	var childCount = $('.slide').length;
	var circleElement;

	console.log(childCount);

	

	function init(){

		var circles = '';
		console.log(childCount.length);
		for (var i = 1; i <= childCount; i++) {
			circles += '<div class="dot"></div>';
		};
		$('.dots').html(circles);
		// $(".cirlces").html('<div></div>');
		circleElement = $('.dots');
		activeByIndex(circleElement, activeIndex);
	}

	function goToSlide(index){
		console.log(index);
		if((index > childCount - 1)){
			index = 0;
		}
		if(index < 0){
			index =  childCount -1
		}
		console.log(index * elementWidth);
		$(".slider-block").animate({left : - (index * elementWidth)}, speed, function(){
			activeIndex = index;
			activeByIndex(circleElement, activeIndex);
		});
	}

	function goToLeft(){
		goToSlide(activeIndex - 1);
	}

	function goToRight(){
		goToSlide(activeIndex + 1);
	}

	function activeByIndex(element,index){
		console.log(element, index);
		element.children().removeClass("dot-active");
		element.children().eq(index).addClass("dot-active");
	}

	$('.slider-arrow-right').on('click', function(){
		goToRight();
	})
	$('.slider-arrow-left').on('click', function(){
		goToLeft();

	})

	$('.dot').on('click', function(){
		var ind=$(this).index();
		goToSlide(ind);
	})

	



	init();

});