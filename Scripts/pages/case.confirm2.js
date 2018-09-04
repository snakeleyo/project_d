$(function () {

	$(".mailadduserto").on("click",function(){
	 	if ($(this).closest("li").index() == 0) {
		    var items=$(this).closest("ul");
		    var copyitem=items.find("li:last-child").clone(true);
		    copyitem.find('label>.fa').removeClass('fa-plus-circle').addClass('fa-minus-circle');
		    items.append(copyitem);
		    resetItem(items.find("li"));
	    } else {
            $(this).closest('li').remove();
        }
	});

});