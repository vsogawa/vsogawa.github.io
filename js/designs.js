$(".toflip").click(function() {
    $(this).parent().toggleClass("flip");
    $(this).children().toggleClass("flip");
})

$(".project").hover(function() {
  $(this).children().children("p").toggleClass("show");  
    $(this).children().children("img").toggleClass("opacity");  
})