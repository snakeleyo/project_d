$(function () {
  var phototemplate="<li><input type=\"file\" class=\"takePicture\" accept=\"image/*\" style=\"display: none;\">";
  phototemplate+="<div class=\"upload photo\"><i class=\"fa fa-camera\"></i></div>";
  phototemplate+="</li>";
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
    $(document).on("click touchend", ".photo-delete", function(event) {
        var $this;
        event.preventDefault();
        event.stopPropagation();
        $this = $(this);
        $this.closest(".photo").remove();
    });
    
    $(document).on("click touchend", ".photo-open", function(event) {
        var $this = $(this); 
        var $bgimg = $this.parent().parent();
        $('#modal-info').find('img').attr('src', $bgimg.css('background-image').replace('url("', '').replace('")', ''));
    }); 
    
    
    /**  PC  **/
    $(document).on("mousedown", ".changePos", function(event) {
		if(event.which == 1) { 
	        var ul = $('.photos');
			var li = ul.find('.photo.pass'); 
			
            var $this = $(this).parent().parent();
			var oEvent = event; 
			
			var disX = oEvent.clientX;
			var disY = oEvent.clientY; 
			
			li.css('z-index', '1');
			var imgURLFrom = $this.css('background-image');
			var imgURLTo = ''
			
			var clone = $('<div></di>');
			clone.addClass('photo pass clone');
			clone.css('left', $this.position().left);
			clone.css('top', $this.position().top);
			clone.css('z-index', '2'); 
			clone.css('position', 'absolute');
			clone.css('background-image', imgURLFrom);
			ul.append(clone);
			$this.css('background-image', '');
			$this.css('border', 'dashed 1px #ccc');
			
			document.onmousemove = function (ev) {
				var oEvent = ev; 
				clone.css('left', oEvent.clientX - disX + $this.position().left + 'px');
				clone.css('top', oEvent.clientY - disY + $this.position().top + 'px');
			}; 
			
			document.onmouseup = function (event) {
			    var oEvent = event;
				var ele = getCollEle(oEvent.clientX - disX + $this.position().left, oEvent.clientY - disY + $this.position().top);
				if (ele && ele.css('background-image')!='none') {
				    imgURLTo = ele.css('background-image');
					ele.css('background-image', imgURLFrom);
					$this.css('background-image', imgURLTo);
				} else {
				    $this.css('background-image', imgURLFrom)
				}
				clone.remove();
				$this.css('border', 'none');
				document.onmousemove = null;
				document.onmouseup = null;
				
			};
			return false;
		}
		
		function getCollEle(left, top) { 
			var minEle = null;
			for (var i = 0; i < li.length; i++) {
				var num = collide(left, top, li[i]);

				if (num > 0) {
					min = num;
					minEle = $(li[i]);
				}
				li[i].style.marginTop = '';
				li[i].style.marginLeft = '';
				li[i].style.borderColor = '#ccc';
			}
			return minEle;
		}

		function collide(pLeft, pTop, testEle) {
		    var pWidth  = testEle.offsetWidth;
		    var pHeight = testEle.offsetHeight;
		    
			var dragL = pLeft;
			var dragR = pLeft + pWidth;
			var dragT = pTop;
			var dragB = pTop + pHeight;
			var testL = testEle.offsetLeft;
			var testR = testEle.offsetLeft + pWidth;
			var testT = testEle.offsetTop;
			var testB = testEle.offsetTop + pHeight;

			var x = Math.abs(testL - dragL);
			var y = Math.abs(testT - dragT);

			if(dragR < testL || dragB < testT || dragL > testR || dragT > testB){
				return 0;
			}else{
				return Math.sqrt(x*x + y*y);
			}
		}
    }); 
    
    /**  Mobile  **/
    $(document).on("touchstart", ".changePos", function(event) {
         
		if(event.which == 0) { 
		
	        var ul = $('.photos');
			var li = ul.find('.photo.pass'); 
			
            var $this = $(this).parent().parent();
			var oEvent = event; 
			
			var disX = oEvent.touches[0].clientX;
			var disY = oEvent.touches[0].clientY; 
			
			li.css('z-index', '1');
			var imgURLFrom = $this.css('background-image');
			
			var clone = $('<div></di>');
			clone.addClass('photo pass clone');
			clone.css('left', $this.position().left);
			clone.css('top', $this.position().top);
			clone.css('z-index', '2'); 
			clone.css('position', 'absolute');
			clone.css('background-image', imgURLFrom);
			ul.append(clone);
			$this.css('background-image', '');
			$this.css('border', 'dashed 1px #ccc');
			
			$(document).on("touchmove", function (ev) {
			
				var oEvent = ev; 
				clone.css('left', oEvent.touches[0].clientX - disX + $this.position().left + 'px');
				clone.css('top', oEvent.touches[0].clientY - disY + $this.position().top + 'px');
			}); 
			
			$(document).on("touchend", function (event) {
			    var oEvent = event;
				var ele = getCollEle(oEvent.changedTouches[0].clientX - disX + $this.position().left, oEvent.changedTouches[0].clientY - disY + $this.position().top);
				
				if (ele && (ele.css('background-image')!='none')) {
				     
				    $this.css('background-image', ele.css('background-image'));
					ele.css('background-image', imgURLFrom);
				} else {
				    $this.css('background-image', imgURLFrom)
				}
				clone.remove();
				$this.css('border', 'none');
				document.onmousemove = null;
				document.onmouseup = null;
				
			});
			
			return false;
		}
		
		function getCollEle(left, top) { 
			var minEle = null;
			for (var i = 0; i < li.length; i++) {
				var num = collide(left, top, li[i]);

				if (num > 0) {
					minEle = $(li[i]);
					break;
				}
			}
			return minEle;
		}

		function collide(pLeft, pTop, testEle) {
		    var pWidth  = testEle.offsetWidth;
		    var pHeight = testEle.offsetHeight;
		    
			var dragL = pLeft;
			var dragR = pLeft + pWidth;
			var dragT = pTop;
			var dragB = pTop + pHeight;
			var testL = testEle.offsetLeft;
			var testR = testEle.offsetLeft + pWidth;
			var testT = testEle.offsetTop;
			var testB = testEle.offsetTop + pHeight;

			var x = Math.abs(testL - dragL);
			var y = Math.abs(testT - dragT);

			if(dragR < testL || dragB < testT || dragL > testR || dragT > testB){
				return 0;
			}else{
				return Math.sqrt(x*x + y*y);
			}
		}
    }); 
    
    $(document).on("click touchend", ".photo.add", function(event) {
      var $this;
      event.preventDefault();
      event.stopPropagation();
      $this = $(this); 
      $this.parent().find(":file").click();
    });
     
    $(document).on("change", ".takePicture", function(event) {
        var $this;
        event.preventDefault();
        event.stopPropagation();
        $this = $(this);
        
        
        /* 
        var fd = new FormData();
        fd.append("photo", $this[0].files[0]);     
        $.ajax({
            url: common.photoCutUrl,
            type: "POST",
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.FLG) {
                    var src = "data:image/gif;base64," + data.PHOTO;
                    $this.parent().find(".photo.add").before('<div class="photo pass" style="background-image:url(' + src +');"><div class="control-panel"><button type="button" class="photo-delete pull-right"><i class="fa fa-times-circle"></i></button><button type="button" class="pull-left photo-open" data-toggle="modal" data-target="#modal-info"><i class="fa fa-search-plus"></i></button></div></div>');
                }
            }
        });
        */
        
        
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        dataURL = windowURL.createObjectURL($this[0].files[0]);      
        $this.parent().find(".photo.add").before('<li class="photo pass" style="background-image:url(' + dataURL +');"><div class="control-panel"><button type="button" class="photo-delete pull-right"><i class="fa fa-times-circle"></i></button><button type="button" class="pull-left photo-open" data-toggle="modal" data-target="#modal-info"><i class="fa fa-search-plus"></i></button><button type="button" class="changePos" style="padding: 50px 65px;"></button></div></li>'); 
    });
    
    $('.must_color').on('change', function() { 
        if ($(this).val() != '') {
            $(this).css('background-color', '#ffffff');
        } else {
            $(this).css('background-color', '#F5CDC5');
        }
    });

    $('.slide-title').on('click', function(){
        $(this).parent().parent().find('.form-group').slideUp();
        $(this).parent().parent().find('.fa.fa-minus').addClass('fa-plus').removeClass('fa-minus');
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
    showTitle($target.attr("title"));
  }
}

function showTitle(title){
  if(common.isPhone()){
    $(".step-title").css("margin-left",0);
    //$(".step-title").css("text-align","center");
  }else{
    var i=0;
    $(".step-bar li").each(function(index,ele){
      if($(ele).hasClass("active")){
        i=index;
        return false;
      }
    });
    var w=$(".step-bar li:first-child").width();
    $(".step-title").css("margin-left",w*i);
  }
  $(".step-title").text(title);
}





/*  Šm”F‰æ–Ê—p  */
function jumpAnchorPoint(target) {
    var $target=$(target);
    
	if(!$target.hasClass("active")){
	    $(".step-bar li").removeClass("active");
	    $target.addClass("active");
	    showTitle($target.attr("title"));
	    
	    var tabid=$target.attr("data-tab");
	    var $dataTab=$("#"+tabid);
	    $('html,body').animate({scrollTop:$dataTab.offset().top},1000)
	}            
}
function jumpTab(id) {
    
    var $target = $($(".step-bar li")[id-1]); 

    if(!$target.hasClass("active")){
	    $(".step-bar li").removeClass("active");
	    $(".box.box-danger.tab-box").removeClass("active");
	    $target.addClass("active");
	    var tabid=$target.attr("data-tab");
	    var $dataTab=$("#"+tabid);
	    $dataTab.addClass("active");
	    showTitle($target.attr("title"));
    }
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
