$(function () {
  moment.locale("ja");
  //$('[data-mask]').inputmask();
  //$('.date-range').daterangepicker();
  $("input[type=\"checkbox\"].minimal-red, input[type=\"radio\"].minimal-red").iCheck({
      checkboxClass: "icheckbox_minimal-red",
      radioClass   : "iradio_minimal-red"
  });
  $(".datetimepicker").datetimepicker({
      useCurrent: false
  });
  var phototemplate="<li class=\"photo pass\"><div class=\"overlay\"><i class=\"fa fa-refresh fa-spin\"></i></div><div class=\"overlay-panel\"></div></li>";
  var photoBar="<div class=\"control-panel\"><button type=\"button\" class=\"photo-delete pull-right\"><i class=\"fa fa-times-circle\"></i></button>";
  photoBar+="<button type=\"button\" class=\"photo-open pull-left\"><i class=\"fa fa-search-plus\"></i></button></div>";
  $("[data-toggle=\"datepicker\"]").datepicker({
      autoclose: true,
      language: 'ja'
  });
  $(".btn-next").on("click",function(){
    var $tabBox=$(this).closest(".tab-box");
    $tabBox.removeClass("active");
    $tabBox.next(".tab-box").addClass("active");
    var tabBoxId=$tabBox.attr("id");
    var $step=$("li[data-tab=\""+tabBoxId+"\"]");
    $step.removeClass("active");
    $step.next("li").addClass("active");
  });
  $(".btn-previous").on("click",function(){
    var $tabBox=$(this).closest(".tab-box");
    $tabBox.removeClass("active");
    $tabBox.prev(".tab-box").addClass("active");
    var tabBoxId=$tabBox.attr("id");
    var $step=$("li[data-tab=\""+tabBoxId+"\"]");
    $step.removeClass("active");
    $step.prev("li").addClass("active");
  });
  $(".step-tab").on("click touchend",function(){
    var $target=$(this);
    if(!$target.hasClass("active")){
      $(".step-bar li").removeClass("active");
      $(".box.box-danger.tab-box").removeClass("active");
      $target.addClass("active");
      var tabid=$target.attr("data-tab");
      var $dataTab=$("#"+tabid);
      $dataTab.addClass("active");
    }
  });
  //
  // $(".fixed-steps").scrollFix({
  //   distanceTop:common.menuOffset,
  //   zIndex:5
  // });
  var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
  elems.forEach(function(html) {
    var switchery = new Switchery(html);
  });
  $(".file-upload").on("click",function(){
    $(this).closest("div").find(":file").click();
  });
  
  $(".photo-delete").on("click touchend",function(event){
    event.preventDefault();
    event.stopPropagation();
    var $this = $(this);
    $this.closest(".photo").remove();
  });
  $(".photo-open").on("click touchend", function(event) {
    event.preventDefault();
    event.stopPropagation();
    var $this = $(this); 
    var $img = $this.closest(".photo").find("img");
    $("#modal-info").find("img").attr("src", $img.attr("src"));
    $("#modal-info").modal("show");
  });
  $(".photo.add").on("click touchend", function(event) {
    event.preventDefault();
    event.stopPropagation();
    $("#photoUpload").click();
  });
     
  $(".takePicture").on("change",function(event) {
    event.preventDefault();
    event.stopPropagation();
    var $this = $(this);
    if($this[0].files.length==0){
      return;
    }
    var fd = new FormData();
    fd.append("photo", $this[0].files[0]);
    var $phototemp=$("#photo-button-bar .photo.pass").clone(true);
    $(".photos li.photo.add").before($phototemp);
    $.ajax({
        url: common.photoCutUrl,
        type: "POST",
        data: fd,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            var $img=$("<img>");
            if (data.FLG) {
              $img.attr("src","data:image/gif;base64," + data.PHOTO);
            }else{
              var reader = new FileReader();
              reader.readAsDataURL($this[0].files[0]);
              reader.onloadend = function () {
                $img.attr("src",reader.result);
              };
            }
            $phototemp.empty();
            $phototemp.append($img);
            $phototemp.append($("#photo-button-bar .control-panel").clone(true));
            //$phototemp.append($(photoBar));
        }
    });
  });
    
  $(".btn-item-add").on("click",function(){
    var items=$(this).closest(".sub-box").find(".group-add-items");
    var copyitem=items.find(".group-add-item:first-child").clone(true);
    items.append(copyitem);
    resetItem(items.find(".group-add-item"));
  });
  $(".btn-item-minus").on("click",function(){
    if($(this).children().hasClass("fa-minus")){
      $(this).closest(".group-add-item").find(".form-group").hide("normal");
      $(this).children().removeClass("fa-minus").addClass("fa-plus");
    }else{
      $(this).closest(".group-add-item").find(".form-group").show("normal");
      $(this).children().removeClass("fa-plus").addClass("fa-minus");
    }
  });
  $(".btn-item-remove").on("click",function(){
    var items=$(this).closest(".group-add-items");
    $(this).closest(".group-add-item").remove();
    resetItem(items.find(".group-add-item"));
  });
  //
  Sortable.create(document.getElementById("photos"),{
    //chosenClass:".photo.pass",
    filter: ".photo.add",
    onMove: function (evt) {
        return evt.related.className.indexOf('add') === -1;
	  }
  });
  //
  $(".btn-insert").on("click",function(){
    window.location="./症例編集-確認画面.html";
  });
   
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $('.must_input_color').on('change', function() { 
      var check_cnt_list = $('ul.step-bar').find('li.step-tab');
      var item = $(this).closest(".tab-box");
      var check_cnt_no = item.attr('id').substr(-1, 1) - 1;
      
      if ($(this).val() != '') {
          $(this).removeClass('input-validation-error');
      } else {
          $(this).removeClass('input-validation-error').addClass('input-validation-error');
      }
      
      if (item.find('.input-validation-error').length == 0) {
          check_cnt_list.eq(check_cnt_no).find('p.check-cnt').empty().append($('<i class="fa fa-check"></i>'));
      } else {
          check_cnt_list.eq(check_cnt_no).find('p.check-cnt').text(item.find('.input-validation-error').length);
      }
      
  });
  
  $(".seihin-control").on("click",function(){
      if ($(this).closest(".col-input-group").index() == 0) {
	      var items=$(this).closest(".col-sm-10");
	      var copyitem=items.find(".col-input-group:last-child").clone(true);
	      copyitem.find('.fa').removeClass('fa-plus').addClass('fa-minus');
	      items.append(copyitem);
	      resetItem(items.find(".col-input-group"));
      } else {
          $(this).closest('.col-input-group').remove();
      }
  });
  
  $('.btn-xs.btn-item-remove').on('click', function(){
      if ($(this).closest("tr").index() > 1) {
          $(this).closest('tr').remove();
      }
  });
  
  
  var isEidt = false;
  $('.btn-item-edit').on('click', function(){
      isEidt = true;
  });
  
  $(".save-modal").on("click",function(){ 
      if (!isEidt) {
	      var ele_i = $(this).closest(".modal").attr('id');
	      var table_list = $('.table.no-margin');
	      var items = '';
		  var copyitem = '';
	      
	      if (ele_i == 'modal-genshikkan') {               //原疾患
	          items = $('table').eq(0);
		      copyitem = items.find("tbody>tr:last-child").clone(true);
	      } else if (ele_i == 'modal-kioureki') {          //既往歴
	          items = $('table').eq(1);
		      copyitem = items.find("tbody>tr:last-child").clone(true);
	      } else if (ele_i == 'modal-arerugi') {           //アレルギー歴
	          items = $('table').eq(2);
		      copyitem = items.find("tbody>tr:last-child").clone(true);
	      } else if (ele_i == 'modal-kazokureki') {        //家族歴
	          items = $('table').eq(3);
		      copyitem = items.find("tbody>tr:last-child").clone(true);
	      } else if (ele_i == 'modal-kakofukusayo') {      //過去の副作用歴
	          items = $('table').eq(4);
		      copyitem = items.find("tbody>tr:last-child").clone(true);
	      } else if (ele_i == 'modal-ryouhou') {           //併用療法 
	          items = $('table').eq(5);
		      copyitem = items.find("tbody>tr:last-child").clone(true);
	      } else if (ele_i == 'modal-default') {           //投与状況
	          items = $('table').eq(6);
		      copyitem = items.find("tbody>tr:last-child").clone(true);
	      } else if (ele_i == 'modal-kusuri') {            //併用薬剤
	          items = $('table').eq(7);
		      copyitem = items.find("tbody>tr:last-child").clone(true);
	      } else if (ele_i == 'modal-higiyaku') {          //被疑薬の再投与
	          items = $('table').eq(8);
		      copyitem = items.find("tbody>tr:last-child").clone(true);
	      } else if (ele_i == 'modal-yuugaijisyou') {      //有害事象情報
	          items = $('table').eq(9);
		      copyitem = items.find("tbody>tr:last-child").clone(true);
	      } else if (ele_i == 'modal-fukusayoukeika') {    //副作用等の経過
	          items = $('table').eq(10);
		      copyitem = items.find("tbody>tr:last-child").clone(true);
	      } else if (ele_i == 'modal-fuguai') {            //不具合内容
	          items = $('table').eq(11);
		      copyitem = items.find("tbody>tr:last-child").clone(true);
	      }

	      items.append(copyitem);
		  resetItem(items.find("tr"));  
	  }
	  isEidt = false;
  });
  
  $(".cancel-modal").on("click",function(){
      isEidt = false;
  });
  
  
  
  $('input[name=optionsBaby]').on('change', function(){
      $(this).parent().parent().parent().next().find('input').attr('readonly', true);
      if ($(this).val()==1) {
          $(this).parent().parent().parent().next().find('input').attr('readonly', false);
      }
  });
  $('input[name=optionsName]').on('change', function(){
      $(this).parent().parent().parent().prev().find('input').val('').attr('readonly', true).css('cssText', 'background-color:#eeeeee!important;');
      $(this).parent().parent().parent().prev().prev().find('input').val('').attr('readonly', true).css('cssText', 'background-color:#eeeeee!important;');
  });
  $('input[name=optionsSex]').on('change', function(){
      if($(this).val()==1) {
          $(this).parent().parent().parent().parent().next().show();
      } else {
          $(this).parent().parent().parent().parent().next().hide();
      }
  });
  $('input[name=givests2]').on('change', function(){
      if($(this).val()==3) {
          $(this).parent().parent().next().show();
      } else {
          $(this).parent().parent().next().hide();
      }
  });
  $('input[name=optionsZ]').on('change', function(){
      if($(this).val()==1) {
          $(this).parent().parent().parent().next().show();
      } else {
          $(this).parent().parent().parent().next().hide();
      }
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  initActive();
  $(".fileinput-button").on("click",function(event){
    event.preventDefault();
    event.stopPropagation();
    $("#fileupload").click();
  });
  //
  $("#fileupload").on("change",function(){
    var $this = $(this);
    if($this[0].files.length==0){
      return;
    }
    // var fd = new FormData();
    // fd.append("files", $this[0].files[0]);
    // $.ajax({
    //     url:  "/test/",
    //     async: true,
    //     type: "post",
    //     data:fd,
    //     contentType: false,
    //     processData: false,
    //     xhr : function(){
    //         XHR = $.ajaxSettings.xhr();
    //         XHR.upload.addEventListener('progress',function(e){})
    //         return XHR;
    //     }
    // });
  });

});

function resetItem(items){
  items.each(function(i){
   if(i>0){
     $(this).find(".btn-item-remove").removeClass("hide");
     $(this).find(".box-title>.item-num").text(i+1);
   }
 });
}

function showtab(target){
  var $target=$(target);
  if(!$target.hasClass("active")){
    $(".step-bar li").removeClass("active");
    $(".box.box-danger.tab-box").removeClass("active");
    $target.addClass("active");
    var tabid=$target.attr("data-tab");
    var $dataTab=$("#"+tabid);
    $dataTab.addClass("active");
  }
}

function initActive(){
  var activekey=getURLParam();
  $("[data-tab=\"info0"+activekey+"\"]").addClass("active");
  $("#info0"+activekey).addClass("active");
}

function getURLParam() {
    var categoryKey = "1";

    var url = location.href;
    var parameters = url.split("?");
    
    if (parameters.length > 1) {
	    var params = parameters[1].split("&");
	    var paramsArray = [];
	    for ( i = 0; i < params.length; i++ ) {
	        neet = params[i].split("=");
	        paramsArray.push(neet[0]);
	        paramsArray[neet[0]] = neet[1];
	    }
	    categoryKey = paramsArray["t"];
    }
    return categoryKey;
}
$.fn.datetimepicker.defaults.icons = {
    time: 'fa fa-clock-o',
    date: 'fa fa-calendar',
    up: 'fa fa-chevron-up',
    down: 'fa fa-chevron-down',
    previous: 'fa fa-chevron-left',
    next: 'fa fa-chevron-right',
    today: 'fa fa-dot-circle-o',
    clear: 'fa fa-trash',
    close: 'fa fa-times'
};