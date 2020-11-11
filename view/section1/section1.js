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
                '<h4>' + item.name + '</h4>' +
                '<p>' + item.data + '</p>' +
                '</div>' +
                '</div>' +
                '</div>');
        })
    }

    $row.mouseover(function(event) {
        let e = event || window.event;
        if (e.target.tagName === "CANVAS") {
            $(e.target).siblings().find("img").css("transform", "scale(1.05,1.05)");
            $(e.target).parent().append('<canvas width="' + ($window.width() / 4) + '" height="' + ($window.height() / 4) + '" id="message_canvas"></canvas>');
        }
        $row.off("mousemove").mousemove(function(event) {
            let e = event || window.event;
            if (e.target.tagName === "CANVAS") {
                draw_message($(e.target), e.clientX, e.clientY, $(e.target).prev().find("p").text(), $(e.target).prev().find("h4").text());
            }
        })
    }).mouseout(function(event) {
        let e = event || window.event;
        if (e.target.tagName === "CANVAS") {
            $(e.target).siblings().find("img").css("transform", "scale(1,1)");
            $(e.target).parent().find("#message_canvas").remove();
        }
    })

    /**
     * 
     * @param {鼠标移入的目标} target 
     * @param {鼠标横坐标} x 
     * @param {鼠标纵坐标} y 
     * @param {段落} p 
     * @param {标题} h 
     */
    function draw_message(target, x, y, p, h) {
        let can = $("#message_canvas")[0];
        if ((target.offset().left - $window.width() / 2) >= 0) {
            can.style.left = x - target.offset().left - can.width - 25 + "px";
        } else {
            can.style.left = x - target.offset().left + 25 + "px";
        }
        can.style.top = y - target.offset().top + $window.scrollTop() + 25 + "px";
        let ctx = can.getContext("2d");

        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.clearRect(0, 0, can.width, can.height);
        ctx.fillRect(0, 0, can.width, can.height);

        // 标题
        ctx.fillStyle = "rgba(255,0,0,1)"; //文字颜色
        ctx.font = "20px Arial";
        ctx.fillText(center(can, h, 22), 0, 20);
        // 介绍
        ctx.fillStyle = "white"; //文字颜色
        ctx.font = "16px Arial";
        let col = can.width / 16 - 2; //一行文字个数(16是字的大小)(-2是为了留空格是的居中效果)
        let row = p.length / col; //文字行数
        let lineHeight = 18; //行高

        let len = can.width / 16 * 4 - 16; //文字占字节长度
        let count = 0;
        for (let i = 0; i < row; i++) {
            let a = 0;
            let str = "";
            for (let j = 0; a < len; j++) {
                if (p.charCodeAt(count) < 128) {
                    a += 2;
                } else {
                    a += 4;
                }
                str += p.charAt(count);
                count++;
            }
            str = "      " + str;
            ctx.fillText(str, 0, lineHeight * (i + 2) + 2);
        }
    }
    /**
     * 使canvas中的每行文字居中
     * @param {canvas} can 
     * @param {居中的文字} str 
     * @param {字体大小(不确定):可以控制文字位置} size 
     */
    function center(can, str, size) {
        let string = "";
        let byte = can.width / size * 4; //获取字节个数
        let len = str.length;
        for (let i = 0; i < len; i++) {
            if (str.charCodeAt(i) < 128) {
                byte -= 2;
            } else {
                byte -= 4;
            }
        }
        byte = byte / 2;
        for (let i = 0; i < byte; i++) {
            string += " ";
        }
        string += str;
        return string;
    }
})