$(function () {
	$(".photo-open").on("click touchend", function(event) {
		event.preventDefault();
		event.stopPropagation();
		var $this = $(this); 
		var $img = $this.closest(".photo").find("img");
		$("#modal-info").find("img").attr("src", $img.attr("src"));
		$("#modal-info").modal("show");
	});
	//fixed
	//$(".fixed-steps").stick_in_parent();
	//scrollTo
	$(".step-tab").on("click touchend",function(){
		//$(".step-bar li").removeClass("active");
		//$(this).addClass("active");
		$.scrollTo($(this).attr("data-tab"),500,{
			offset:0
		});
	});
	// $(window).resize(function() {
	// 	$(".check-bottom-box").width($("#info06").width());
	// });
	// $(".check-bottom-box").width($("#info06").width());

	$("input[type=\"checkbox\"].minimal-red, input[type=\"radio\"].minimal-red").iCheck({
      checkboxClass: "icheckbox_minimal-red",
      radioClass   : "iradio_minimal-red"
  	});
	//
	// $(".tab-box").waypoint({
	// 	offset:common.stepBarOffset,
	// 	handler:function(direction){
	// 		if(direction == "down"){
	// 			$(".step-bar li").removeClass("active");
	// 			$(".step-bar li[data-tab=\"#" + this.element.id + "\"]").addClass("active");
	// 		}else{
	// 			var $target = $(".step-bar li[data-tab=\"#" + this.element.id + "\"]").prev();
	// 			if($target.length > 0){
	// 				$(".step-bar li").removeClass("active");
	// 				$target.addClass("active");
	// 			}
	// 		}
	// 	}
	// });

	// $(".tab-box").waypoint({
	// 	offset:157,
	// 	handler:function(direction){
	// 		console.log('enter:', direction);
	// 	}
	// });

	// $('.tab-box').on('scrollSpy:enter', function() {
	// 	console.log('enter:', $(this).attr('id'));
	// });
	// $('.tab-box').on('scrollSpy:exit', function() {
	// 	console.log('exit:', $(this).attr('id'));
	// });
	// $('.tab-box').scrollSpy({offsetTop:-157});
});
