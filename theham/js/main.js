var elementWidth, childCount;
var activeIndex = 0;
var speed = 300;

$('document').ready(function(){

	elementWidth = $('.slide').width();
	childCount = $('.slide').length;
	$('.slider-button-right').on('click', function(){
		goToRight();
	})
	$('.slider-button-left').on('click', function(){
		goToLeft();

	})

	
});

	
	function goToSlide(index){
		if((index > childCount - 1)){
			index = 0;
		}
		if(index < 0){
			index =  childCount -1
		}

		$(".slider-container").animate({left : - (index * elementWidth)}, speed, function(){
			activeIndex = index;
		
		});
	}

	function goToLeft(){
		goToSlide(activeIndex - 1);
	}

	function goToRight(){
		goToSlide(activeIndex + 1);
	}

	



	