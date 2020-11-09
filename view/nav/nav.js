$(function() {
    //开始====================导航====================//
    let $nav = $("nav");
    let $ul_first = $nav.find(".mobile ul:first");
    let $ul_last = $nav.find(".mobile ul:last");
    let $login_register = $nav.find(".login_register button");
    let $new_window = $("#window");
    let $li = $nav.find(".left li:not(.slide),.mobile .mobile_nav li");
    // let $li = $nav.find("");
    let $slide = $nav.find(".left li.slide");

    function fade() {
        if ($window.scrollTop() > ($window.height())) {
            isOne[1] = true;
            $nav.removeClass("animate_top").addClass("animate_bottom");
        } else {
            if (isOne[1]) {
                $nav.removeClass("animate_bottom").addClass("animate_top");
            }
        }
    }
    $window.scroll(fade);

    function open() {
        $ul_last.toggleClass("open");
    }
    $ul_first.click(open);

    // 登录按钮
    $login_register.eq(0).click(function() {
        $new_window.css("display", "block");
        $new_window.find(">div[class=login_window]").css("display", "block").siblings("div").css("display", "none");
    });
    // 注册按钮
    $login_register.eq(1).click(function() {
        $new_window.css("display", "block");
        $new_window.find(">div[class=register_window]").css("display", "block").siblings("div").css("display", "none");
    });

    $li.mouseover(function() {
        $slide.stop().animate({ "left": $(this).index() * parseFloat($(this).css("width")) + "px" }, 200);
    })
    $li.find("a").click(function() {
        let top = $($(this).attr("data-href")).offset().top;
        $("html,body").stop().animate({ scrollTop: top }, 1000)
    })

    $window.resize(function() {
        $slide.css("width", $li.css("width"));
    });
    //结尾====================导航====================//
})