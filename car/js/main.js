function burger() {
    var element = document.getElementById("slider-cover");
    element.classList.toggle("show");

    var element1 = document.getElementById("burger");
    element1.classList.toggle("z-index");

    var element2 = document.getElementById("line2");
    element2.classList.toggle("hide");

    var element3 = document.getElementById("line1");
    element3.classList.toggle("rotate1");

    var element4 = document.getElementById("line3");
    element4.classList.toggle("rotate2");
    var element5 = document.getElementById("circle");
    element5.classList.toggle("cls-2");
    var element6 = document.getElementById("a");
    element6.classList.toggle("cls-2");
    var element7 = document.getElementById("u");
    element7.classList.toggle("cls-2");
    var element8 = document.getElementById("t");
    element8.classList.toggle("cls-2");
    var element9 = document.getElementById("o");
    element9.classList.toggle("cls-2");
    var element10 = document.getElementById("logo");
    element10.classList.toggle("cls-3");
}

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