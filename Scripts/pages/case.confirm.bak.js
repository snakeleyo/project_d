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
	$(".fixed-steps").stick_in_parent();
	//scrollTo
	$(".step-tab").on("click touchend",function(){
		$(".step-bar li").removeClass("active");
		$(this).addClass("active");
		$.scrollTo($(this).attr("data-tab"),500,{
			offset:0-common.stepBarOffset
		});
	});

	$("input[type=\"checkbox\"].minimal-red, input[type=\"radio\"].minimal-red").iCheck({
      checkboxClass: "icheckbox_minimal-red",
      radioClass   : "iradio_minimal-red"
  	});
	// $('.tab-box').scrollSpy({offsetTop:10});
	// $('.tab-box').on('scrollSpy:enter', function() {
	// 	console.log('enter:', $(this).attr('id'));
	// });
});
