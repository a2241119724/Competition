$(function() {
    let $row = $("#page1 .row");

    // 渲染数据中的内容(回调函数)
    draw_item = function() {
        $row.html(null);
        new_data.forEach(function(item) {
            $row.append('<div class="row_item">' +
                '<div class="border">' +
                '<div class="warp"><img src="' + item.img_path + '" alt=""></div>' +
                '<div class="content">' +
                '<h4>我的书籍</h4>' +
                '<p>书籍简介书籍简介书简介书籍简介书简介书籍简介书简介书籍简介书简介书籍简介书简介书籍简介书简介书籍简介书简介书籍简介书籍简介书籍简介</p>' +
                '</div>' +
                '</div>' +
                '</div>');
        })
    }

    $row.mouseover(function(event) {
        let e = event || window.event;
        if (e.target.tagName === "CANVAS") {
            $(e.target).siblings().find("img").css("transform", "scale(1.05,1.05)");
            $(e.target).parent().append('<canvas width="' + ($window.width() / 5) + '" height="' + ($window.height() / 5) + '" id="message_canvas"></canvas>');
        }
        $row.off("mousemove").mousemove(function(event) {
            let e = event || window.event;
            if (e.target.tagName === "CANVAS") {
                // draw_message($(e.target), e.clientX, e.clientY);
            }
        })
    }).mouseout(function(event) {
        let e = event || window.event;
        if (e.target.tagName === "CANVAS") {
            $(e.target).siblings().find("img").css("transform", "scale(1,1)");
            $(e.target).parent().find("#message_canvas").remove();
        }
    })

    function draw_message(target, x, y) {
        console.log(target.offset().top, target.offset().left);
        let can = $("#message_canvas")[0];
        // can.style.top = y - target.offset().top + "px";
        // can.style.left = x - target.offset().left + "px";
        // can.style.top = y + "px";
        // can.style.left = x + "px";
        let ctx = can.getContext("2d");

        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, can.width, can.height);
    }
})