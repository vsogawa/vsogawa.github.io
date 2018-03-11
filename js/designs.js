let color = $("#colorpicker").val();


function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera    
}

$("#backToTop").on("mousedown", topFunction);


$("#colorpicker").change(function(){
	color = $("#colorpicker").val();
	$(".color-change").css("color", color);
	$("hr").css("border", `1px solid ${color}`);
	$("li").css("color", color);	
	$(".divider").css("background", `linear-gradient(to right, #D6D6D6, #D6D6D6, ${color})`)
})