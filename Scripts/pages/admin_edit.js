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
	trHtml += "<td>" + getSelectHtml("group", "", json_option) + "</td>"; //ele.groups
	trHtml += "<td>" + getInputHtml("buy_price", "", "onchange='reCalculate(this)'") + "</td>";
	trHtml += "<td>" + getInputHtml("sell_price", "", "onchange='reCalculate(this)'") + "</td>";
	trHtml += "<td>" + getInputHtml("leavings", "", "") + "</td>";
	trHtml += "<td>" + getInputHtml("weight", "", "style:width:75px;min-width:75px; onchange='reCalculate(this);'") + "</td>";
	trHtml += "<td style='padding-top:15px;'>0<span data-id='tran_price'></span></td>";
	trHtml += "<td style='padding-top:15px;'>0(0)<span data-id='cost_price'></td>";
	trHtml += "<td style='padding-top:15px;'>0<span data-id='profits'></td>";
	trHtml += "</tr>";

	$(trHtml).appendTo("#top-tree-table tbody");
  });

  pageInit();
});

var TRAN_CONS = 62;
var json_option;

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
					json_option = result.groups.GROUP;

					$(goods.GOODS).each(function(idx, ele) {
						trHtml = "";
						trHtml += "<tr>";
						trHtml += "<td>" + getDelBtnHtml() + "</td>";
						trHtml += "<td>" + ele.ID + "</td>";
						trHtml += "<td>" + getInputHtml("name", ele.name) + "</td>";
						trHtml += "<td>" + getSelectHtml("group", ele.group, json_option) + "</td>"; //ele.group
						trHtml += "<td>" + getInputHtml("buy_price", ele.buy_price, "onchange='reCalculate(this)'") + "</td>";
						trHtml += "<td>" + getInputHtml("sell_price", ele.sell_price, "onchange='reCalculate(this)'") + "</td>";
						trHtml += "<td>" + getInputHtml("leavings", ele.leavings) + "</td>";
						trHtml += "<td>" + getInputHtml("weight", ele.weight, "style:width:75px;min-width:75px; onchange='reCalculate(this);'") + "</td>";
						trHtml += "<td style='padding-top:15px;'><span data-id='tran_price'>" + ele.tran_price + "</span></td>";
						trHtml += "<td style='padding-top:15px;'><span data-id='cost_price'>" + ele.cost_price + "</span></td>";
						trHtml += "<td style='padding-top:15px;'><span data-id='profits'>" + ele.profits + "</span></td>";
						trHtml += "</tr>";

						$(trHtml).appendTo("#top-tree-table tbody");
					});
				}
			})
		}

		function getInputHtml(id, value, others) {
			var inputHtml = "";
			inputHtml += "<input type='text' data-id='" + id + "' value='" + value + "' class='form-control pull-right edit' " + others + "/>";
			return inputHtml;
		}

		function getDelBtnHtml() {
			var buttonHtml = '<button type="button" class="btn btn-info btn-danger btn-item-remove" onclick="deleteGoods(this);"><i class="fa fa-times"></i></button>';
			return buttonHtml;
		}

		function getSelectHtml(id, selVal, options) {
			var selectHtml = '';
			selectHtml += '<div class="col-sm-5 col-sm-item" style="width:100%;">'
			selectHtml += '<select data-id="' + id + '"class="form-control" style="width:100%;">';
			selectHtml += '<option value=""></option>';

			$(options).each(function(idx, ele) {
				var selected = selVal == ele.code ?  "selected" : "";
				selectHtml += '<option value="' + ele.code + '" ' + selected + '>' + ele.name + '</option>';
			});
			selectHtml += '</select>';
			selectHtml += '</div>';

			return selectHtml;
		}

		function reCalculate(obj) {
			var trObj = $(obj).parents("tr");
			var weight = getItemVal(trObj, "weight");
			var buy_price = getItemVal(trObj, "buy_price");
			var sell_price = getItemVal(trObj, "sell_price");

			weight = isNaN(weight) || weight == "" ? "0" : weight;
			buy_price = isNaN(buy_price) || buy_price == "" ? "0" : buy_price;
			sell_price = isNaN(sell_price) || sell_price == "" ? "0" : sell_price;

			var tran_price = Math.round(eval(weight) * TRAN_CONS);
			var cost_price = eval(eval(buy_price) + eval(tran_price)) + "(" + tran_price + ")";
			var profits = eval(eval(sell_price) - eval(buy_price) - eval(tran_price));
			//alert(eval(eval(buy_price) + eval(tran_price)) + "(" + tran_price + ")");
			// trObj.find("td").eq(8).text(tran_price);
			// trObj.find("td").eq(9).text(cost_price);
			// trObj.find("td").eq(10).text(profits);

			setItemVal(trObj, "tran_price", tran_price);
			setItemVal(trObj, "cost_price", cost_price);
			setItemVal(trObj, "profits", profits);
		}

		function setItemVal(trObj, data_id, value) {
			//value = isNaN(value) ? "0" : value;
			
			$(trObj).find("*").filter(function(){
				if ($(this).attr("data-id") == data_id) {
					$(this).text(value);
					return false;
				}
			});
		}

		function getItemVal(trObj, data_id) {
			var value = "";
			$(trObj).find("*").filter(function(){
				if ($(this).attr("data-id") == data_id) {
					if ($(this).is("input") || $(this).is("select")) {
						value = $(this).val();
					} else {
						value = $(this).text();
					}
					return false;
				}
			});
			return isNaN(value) ? "0" : value;
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
					var obj = $(this).find("*").filter(function(){
						if ($(this).attr("data-id") != undefined) {
							return this;
						}
					});
					
					var id = $(obj).attr("data-id");
					var value = "";
					if ($(obj).is("input") || $(obj).is("select")) {
						value = $(obj).val();
					} else {
						value = $(obj).text();
					}
					id = (id == undefined) ? "" : id;
					value = (value == undefined) ? "" : value;

					data_row[id] = value;
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