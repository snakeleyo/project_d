$(function(){
    if(common.isPhone()){
        common.menuOffset = 100;
        common.navbarOffset = 47;
    }
    FastClick.attach(document.body);
    //go-top
    var ga = $('#return-to-top');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            ga.fadeIn(200);
        }
        else {
            ga.fadeOut(200);
        }
    });
    $(ga).click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});

var common = {
    photoCutUrl: "http://54.249.9.220/PhotoCut/api/cut",
    menuOffset:150,
    stepBarOffset:150,
    isPhone:function(){
        var ua = navigator.userAgent;
        if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
            return true;
        }
        return false;
    },
    isPad:function(){
        var ua = navigator.userAgent;
        if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
            return true;
        }
        return false;
    }
};