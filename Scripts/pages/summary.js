$(function () {
  $("#summary-table01").treetable({
    expandable: true,
    expanderTemplate: '<a class="fa fa-caret-right" aria-hidden="true"></a>',
    onNodeExpand: nodeExpand1,
    onNodeCollapse: function(){
      this.expander.removeClass("fa-caret-down").addClass("fa-caret-right");
    }
  });
	$("#summary-table02").treetable({
    expandable: true,
    expanderTemplate: '<a class="fa fa-caret-right" aria-hidden="true"></a>',
    onNodeExpand: nodeExpand2,
    onNodeCollapse: function(){
      this.expander.removeClass("fa-caret-down").addClass("fa-caret-right");
    }
  });
});
function nodeExpand1(){
			this.expander.removeClass("fa-caret-right").addClass("fa-caret-down");
			if(this.children.length==0){
				var parentId=this.id;
				$.ajax({
					type: 'GET',
					dataType: 'json',
					url: './data/data.json',
					success: function(data) {
						var childNodes = data.nodeID[parentId];
						if(childNodes) {
							var parentNode = $("#summary-table01").treetable("node", parentId);
							for (var i = 0; i < childNodes.length; i++) {
								var node = childNodes[i];
								var nodeToAdd = $("#summary-table01").treetable("node",node['ID']);
								if(!nodeToAdd) {
									var row ='<tr data-tt-id="' + node['ID'] + '" data-tt-parent-id="' + parentId + '" ';
									if(node['childNodeType'] == 'branch') {
										row += ' data-tt-branch="true" ';
									}
									row += ' >';
									for (var index in node['childData']) {
										var temp_num = node['childData'][index];
										var num = temp_num > 0 || temp_num == "-"?"<a href=\"./症例一覧_PV.html\">"+ temp_num +"</a>":temp_num;
										row += "<td>" + num + "</td>";
									}
									row +="</tr>";
								}
								$("#summary-table01").treetable("loadBranch", parentNode, row);
							}
						}
					}
				});
			}
		}

function nodeExpand2(){
			this.expander.removeClass("fa-caret-right").addClass("fa-caret-down");
			if(this.children.length==0){
				var parentId=this.id;
				$.ajax({
					type: 'GET',
					dataType: 'json',
					url: './data/data.json',
					success: function(data) {
						var childNodes = data.nodeID[parentId];
						if(childNodes) {
							var parentNode = $("#summary-table02").treetable("node", parentId);
							for (var i = 0; i < childNodes.length; i++) {
								var node = childNodes[i];
								var nodeToAdd = $("#summary-table02").treetable("node",node['ID']);
								if(!nodeToAdd) {
									var row ='<tr data-tt-id="' + node['ID'] + '" data-tt-parent-id="' + parentId + '" ';
									if(node['childNodeType'] == 'branch') {
										row += ' data-tt-branch="true" ';
									}
									row += ' >';
									for (var index in node['childData']) {
										var temp_num = node['childData'][index];
										var num = temp_num > 0 || temp_num == "-"?"<a href=\"./症例一覧_PV.html\">"+ temp_num +"</a>":temp_num;
										row += "<td>" + num + "</td>";
									}
									row +="</tr>";
								}
								$("#summary-table02").treetable("loadBranch", parentNode, row);
							}
						}
					}
				});
			}
		}