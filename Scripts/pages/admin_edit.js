$(function () {
  $("#top-tree-table").treetable({
    expandable: true,
    expanderTemplate: '<a class="fa fa-caret-right" aria-hidden="true"></a>',
    onNodeExpand: nodeExpand,
    onNodeCollapse: function(){
      this.expander.removeClass("fa-caret-down").addClass("fa-caret-right");
    }
  });
	$("#top-tree-table").treetable("expandAll");

	//
	$("#top-tree-02").treetable({
    expandable: true,
    expanderTemplate: '<a class="fa fa-caret-right" aria-hidden="true"></a>',
    onNodeExpand: nodeExpand02,
    onNodeCollapse: function(){
      this.expander.removeClass("fa-caret-down").addClass("fa-caret-right");
    }
  });

  $("#top-tree-02").treetable("expandAll");

  $("#btn_save").click(function() {
	savedata();
  });

  $("#btn_add").click(function() {

	var trHtml = "";
	trHtml = "";
	trHtml += "<tr>";
	trHtml += "<td>" + getDelBtnHtml() + "</td>";
	trHtml += "<td></td>";
	trHtml += "<td>" + getInputHtml("name", "") + "</td>";
	trHtml += "<td>" + "" + "</td>";
	trHtml += "<td>" + getInputHtml("buy_price", "") + "</td>";
	trHtml += "<td>" + getInputHtml("sell_price", "") + "</td>";
	trHtml += "<td>" + getInputHtml("profits", "") + "</td>";
	trHtml += "<td>" + getInputHtml("leavings", "") + "</td>";
	trHtml += "</tr>";

	$(trHtml).appendTo("#top-tree-table tbody");
  });

  pageInit();
});

function nodeExpand(){
			this.expander.removeClass("fa-caret-right").addClass("fa-caret-down");
			if(this.children.length==0){
				var parentId=this.id;
				$.ajax({
					type: 'GET',
					dataType: 'json',
					url: './data/data-top.json',
					success: function(data) {
						var childNodes = data.nodeID[parentId];
						if(childNodes) {
							var parentNode = $("#top-tree-table").treetable("node", parentId);
							for (var i = 0; i < childNodes.length; i++) {
								var node = childNodes[i];
								var nodeToAdd = $("#top-tree-table").treetable("node",node['ID']);
								if(!nodeToAdd) {
									var row ='<tr data-tt-id="' + node['ID'] + '" data-tt-parent-id="' + parentId + '" ';
									if(node['childNodeType'] == 'branch') {
										row += ' data-tt-branch="true" ';
									}
									row += ' >';
									for (var index in node['childData']) {
										var temp_num = node['childData'][index];
										var temp_color = node['childDataColor'][index];
										var num = temp_num > 0 || temp_num == "-"?"<a href=\"./症例一覧_PV.html\">"+ temp_num +"</a>":temp_num;
										row += "<td class=\""+temp_color+"\">" + num + "</td>";
									}
									row +="</tr>";
								}
								$("#top-tree-table").treetable("loadBranch", parentNode, row);
							}
						}
					}
				});
			}
		}

		function nodeExpand02(){
			this.expander.removeClass("fa-caret-right").addClass("fa-caret-down");
			if(this.children.length==0){
				var parentId=this.id;
				$.ajax({
					type: 'GET',
					dataType: 'json',
					url: './data/data-top02.json',
					success: function(data) {
						var childNodes = data.nodeID[parentId];
						if(childNodes) {
							var parentNode = $("#top-tree-02").treetable("node", parentId);
							for (var i = 0; i < childNodes.length; i++) {
								var node = childNodes[i];
								var nodeToAdd = $("#top-tree-02").treetable("node",node['ID']);
								if(!nodeToAdd) {
									var row ='<tr data-tt-id="' + node['ID'] + '" data-tt-parent-id="' + parentId + '" ';
									if(node['childNodeType'] == 'branch') {
										row += ' data-tt-branch="true" ';
									}
									row += ' >';
									for (var index in node['childData']) {
										var temp_num = node['childData'][index];
										var temp_color = node['childDataColor'][index];
										var num = temp_num > 0 || temp_num == "-"?"<a href=\"./症例一覧_PV.html\">"+ temp_num +"</a>":temp_num;
										row += "<td class=\""+temp_color+"\">" + num + "</td>";
									}
									row +="</tr>";
								}
								$("#top-tree-02").treetable("loadBranch", parentNode, row);
							}
						}
					}
				});
			}
		}

		function pageInit() {
			
			var trHtml = "";

			$.ajax({
				url: '/edit/getdata',
				type: 'get',
				dataType: 'json',
				cache: false,
				processData: false,
				contentType: false,
				success: function(result) {
					var goods = result.goods;
					var groups = result.groups;

					$(goods.GOODS).each(function(idx, ele) {
						trHtml = "";
						trHtml += "<tr>";
						trHtml += "<td>" + getDelBtnHtml() + "</td>";
						trHtml += "<td>" + ele.ID + "</td>";
						trHtml += "<td>" + getInputHtml("name", ele.name) + "</td>";
						trHtml += "<td>" + getSelectHtml(groups.GROUP, "") + "</td>"; //ele.groups
						trHtml += "<td>" + getInputHtml("buy_price", ele.buy_price) + "</td>";
						trHtml += "<td>" + getInputHtml("sell_price", ele.sell_price) + "</td>";
						trHtml += "<td>" + getInputHtml("profits", ele.profits) + "</td>";
						trHtml += "<td>" + getInputHtml("leavings", ele.leavings) + "</td>";
						trHtml += "</tr>";

						$(trHtml).appendTo("#top-tree-table tbody");
					});
				}
			})
		}

		function getInputHtml(id, value) {
			var inputHtml = "";
			inputHtml += "<input type='text' data-id='" + id + "' value='" + value + "' class='form-control pull-right edit'/>";
			return inputHtml;
		}

		function getDelBtnHtml() {
			var buttonHtml = '<button type="button" class="btn btn-info btn-danger btn-item-remove" onclick="deleteGoods(this);"><i class="fa fa-times"></i></button>';
			return buttonHtml;
		}

		function getSelectHtml(json_option, selVal) {
			var selectHtml = '';
			selectHtml += '<div class="col-sm-5 col-sm-item" style="width:100%;">'
			selectHtml += '<select class="form-control" style="width:100%;">';
			selectHtml += '<option value=""></option>';

			$(json_option).each(function(idx, ele) {
				var selected = selVal == ele.code ?  "selected" : "";
				selectHtml += '<option value="' + ele.code + '" ' + selected + '>' + ele.name + '</option>';
			});
			selectHtml += '</select>';
			selectHtml += '</div>';

			return selectHtml;
		}

		function deleteGoods(obj) {
			//alert("删掉后，点击保存才可生效");
			$(obj).parents("tr").hide(300, function() {
				$(obj).parents("tr").remove();
			});
		}

		function savedata() {
			$("#top-tree-table").find("tr").filter(function() {
				return $(this).find("[data-id='name']").val() == "";
			}).remove();

			var goods = [];
			$("#top-tree-table tbody tr").each(function(idx, ele) {
				var data_row = {};
				data_row["ID"] = "";
		
				$(this).find("td").each(function() {
					var obj = $(this).find("input");
					var id = $(obj).attr("data-id");
					var value = $(obj).val();
					data_row[$(obj).attr("data-id")] = value;
				});
				goods.push(data_row);
			});
		
			var data = {"GOODS" : goods};
		
			$.ajax({
				url: '/edit/savedata',
				type: 'post',
				dataType: 'json',
				contentType: "application/json; charset=UTF-8",
				data : JSON.stringify(data),
				success: function(goods) {
					alert("保存完毕，恭喜发财");
				}
			})
		}