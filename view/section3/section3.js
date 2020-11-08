$(function() {
    //开始====================页面3===================//
    let $section3 = $("#page3")
    let $bg = $section3.find(".main");

    function bgMove() {
        if ($section3.offset().top < ($window.scrollTop() + $window.height()) && ($section3.offset().top + $section3.height()) > $window.scrollTop()) {
            $bg.css({
                "background-position": "center calc(50% - " + -($window.scrollTop() - $section3.offset().top + $section3.height() / 2) / 2.5 + "px",
            })
        }
    }
    $window.scroll(bgMove);
    //结尾====================页面3===================//
})