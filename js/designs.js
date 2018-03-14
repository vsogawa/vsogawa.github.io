function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera    
}

$("#backToTop").on("mousedown", topFunction);

let tabDisplay = function(show, hide1, hide2, hide3){
	$(show).addClass("active").removeClass("inactive");
	$(hide1).addClass("inactive").removeClass("active");
	$(hide2).addClass("inactive").removeClass("active");	
	$(hide3).addClass("inactive").removeClass("active");		
}

let topTabDisplay = function(show, back1, back2, back3) {
	$(show).addClass("folderactive").removeClass("folderbehind");
	$(back1).addClass("folderbehind").removeClass("folderactive");
	$(back2).addClass("folderbehind").removeClass("folderactive");
	$(back3).addClass("folderbehind").removeClass("folderactive");
}

let tabDisplay1 = function(event){
	event.preventDefault(event);	
	tabDisplay("#page1", "#page2", "#page3", "#page4");
	topTabDisplay("#tab1", "#tab2", "#tab3", "#tab4");	
}

let tabDisplay2 = function(event){
	event.preventDefault(event);	
	tabDisplay("#page2", "#page1", "#page3", "#page4");
	topTabDisplay("#tab2", "#tab1", "#tab3", "#tab4");	
}

let tabDisplay3 = function(event){
	event.preventDefault(event);	
	tabDisplay("#page3", "#page1", "#page2", "#page4");
	topTabDisplay("#tab3", "#tab1", "#tab2", "#tab4");	
}

let tabDisplay4 = function(event){
	event.preventDefault(event);	
	tabDisplay("#page4", "#page1", "#page2", "#page3");
	topTabDisplay("#tab4", "#tab1", "#tab2", "#tab3");	
}

$("#tab1").on("click", tabDisplay1);
$("#tab2").on("click", tabDisplay2);
$("#tab3").on("click", tabDisplay3);
$("#tab4").on("click", tabDisplay4);

$(".cover").on("click", function(){
	$("#foldercover").addClass("open");
	setTimeout(function(){ $("#foldercover").remove(); }, 1000);
});