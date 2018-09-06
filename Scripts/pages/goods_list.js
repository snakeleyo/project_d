$(function () {

	pageInit();
});

function pageInit() {
	
	var trHtml = "";

	$.ajax({
		url: '/showlist/getdata',
		type: 'get',
		dataType: 'json',
		cache: false,
		processData: false,
		contentType: false,
		success: function(goods) {
			$(goods.GOODS).each(function(idx, ele) {
				trHtml = "";
				trHtml += "<tr>";
				//trHtml += "<td>" + ele.ID + "</td>";
				trHtml += "<td>" + ele.name + "</td>";
				trHtml += "<td>" + ele.leavings + "</td>";
				trHtml += "</tr>";

				$(trHtml).appendTo("#top-tree-table tbody");
			});
		}
	})
}
