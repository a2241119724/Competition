$(function() {
    //开始====================轮播图====================//
    let $ul = $("header .images ul");
    let $li = $ul.find("li");
    let $btnL = $("header .slideshow button:first");
    let $btnR = $("header .slideshow button:last");
    let $li_circle = $("header .circle li");

    let distance = $ul.width(); //动画每次轮播的距离
    let index = 0; //动画轮播的图片索引
    let timer = null; //定时器
    let timeA = 3000; //动画每次执行间隔
    let timeB = 1000; //动画每次执行时间

    // 每次手动操作前准备
    function pub() {
        clearInterval(timer);
        $btnL.off("click");
        $btnR.off("click");
    }

    // 初始化轮播图片位置
    function init() {
        distance = $ul.width();
        $li.each(function(index, item) {
            // $(this).css("left", `${index * distance}px`);
            $(this).css("left", index * distance + "px");
        });
        if (isOne[0]) { //克隆添加
            // $li.first().clone().appendTo($ul).css("left", `${$li.length * distance}px`);
            // $li.last().clone().prependTo($ul).css("left", `${-distance}px`);
            $li.first().clone().appendTo($ul).css("left", $li.length * distance + "px");
            $li.last().clone().prependTo($ul).css("left", -distance + "px");
            isOne[0] = false;
        } else { //改变
            // $li.first().prev("li").css("left", `${-distance}px`);
            // $li.last().next("li").css("left", `${$li.length * distance}px`);
            // $ul.stop().css("left", `${-index*distance}px`);
            $li.first().prev("li").css("left", -distance + "px");
            $li.last().next("li").css("left", $li.length * distance + "px");
            $ul.stop().css("left", -index * distance + "px");
        }
    }
    // 初始化
    init();

    //重新初始化图片位置
    $window.resize(function() {
        init();
    });

    // 开启轮播(相当于右按钮点击)
    timer = setInterval(btnR, timeA);

    //左按钮点击事件
    function btnL() {
        pub();
        //1.图片索引递减
        index--;
        //2.判断是否是边界
        if (index === -1) {
            index = $li.length - 1;
            setTimeout(function() {
                // $ul.finish().css("left", `${-($li.length-1)*distance}px`);
                $ul.finish().css("left", -($li.length - 1) * distance + "px");
            }, timeB);
        }
        //3.执行动画
        // $ul.finish().animate({ "left": `${$ul.position().left+distance}px` }, timeB, function() {
        //     $btnL.click(btnL);
        //     $btnR.click(btnR);
        // });
        $ul.finish().animate({ "left": $ul.position().left + distance + "px" }, timeB, function() {
            $btnL.click(btnL);
            $btnR.click(btnR);
        });
        //4.对圆点进行类的变换
        $li_circle.eq(index).addClass("bgColor").siblings("li").removeClass("bgColor");
        timer = setInterval(btnR, timeA);
    }
    // 左边的按钮
    $btnL.click(btnL);

    //右按钮点击事件
    function btnR() {
        pub();
        //1.图片索引递增
        index++;
        //2.判断是否是边界
        if (index === $li.length) {
            index = 0;
            setTimeout(function() {
                $ul.finish().css("left", "0");
            }, timeB);
        }
        //3.执行动画
        // $ul.finish().animate({ "left": `${$ul.position().left-distance}px` }, timeB, function() {
        //     $btnL.click(btnL);
        //     $btnR.click(btnR);
        // });
        $ul.finish().animate({ "left": $ul.position().left - distance + "px" }, timeB, function() {
            $btnL.click(btnL);
            $btnR.click(btnR);
        });
        //4.对圆点进行类的变换
        $li_circle.eq(index).addClass("bgColor").siblings("li").removeClass("bgColor");
        timer = setInterval(btnR, timeA);
    }
    // 右边的按钮
    $btnR.click(btnR);

    // 下面的圆点事件
    function circle() {
        let _this = $(this);
        pub();
        _this.off("click");
        // 1.改变索引
        index = _this.index();
        // // 解决点1快速点2不能快速点1的bug
        // $li_circle.each((index, item) => {
        //     if (index !== $(this).index()) {
        //         $(item).off("click").click(circle); //解决事件叠加
        //     } else {
        //         setTimeout(() => {
        //             $(this).off("click").click(circle); //解决事件叠加
        //         }, timeB);
        //     }
        // });
        $li_circle.each(function(index, item) {
            if (index !== _this.index()) {
                $(item).off("click").click(circle); //解决事件叠加
            } else {
                // setTimeout(() => {
                //     $(this).off("click").click(circle); //解决事件叠加
                // }, timeB);
                setTimeout(function() {
                    _this.off("click").click(circle); //解决事件叠加
                }, timeB);
            }
        });
        // $ul.stop().animate({ "left": `${-index*distance}px` }, timeB, function() {
        //     $btnL.click(btnL);
        //     $btnR.click(btnR);
        // });
        $ul.stop().animate({ "left": -index * distance + "px" }, timeB, function() {
            $btnL.click(btnL);
            $btnR.click(btnR);
        });
        $(this).addClass("bgColor").siblings("li").removeClass("bgColor");
        timer = setInterval(btnR, timeA);
    }
    $li_circle.click(circle);
    //结尾====================轮播图====================//
})