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
}