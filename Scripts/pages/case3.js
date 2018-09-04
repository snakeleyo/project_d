$(function () {
  moment.locale("ja");
  $('[data-mask]').inputmask();
  $('.date-range').daterangepicker();
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
    showTitle($step.next("li").attr("title"));
  });
  $(".btn-previous").on("click",function(){
    var $tabBox=$(this).closest(".tab-box");
    $tabBox.removeClass("active");
    $tabBox.prev(".tab-box").addClass("active");
    var tabBoxId=$tabBox.attr("id");
    var $step=$("li[data-tab=\""+tabBoxId+"\"]");
    $step.removeClass("active");
    $step.prev("li").addClass("active");
    showTitle($step.prev("li").attr("title"));
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
            if (data.FLG) {
              var $img=$("<img>").attr("src","data:image/gif;base64," + data.PHOTO);
              $phototemp.empty();
              $phototemp.append($img);
              $phototemp.append($("#photo-button-bar .control-panel").clone(true));
              //$phototemp.append($(photoBar));
            }
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