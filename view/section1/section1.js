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
                '<p>书籍简介书籍简介书籍简介书籍简介</p>' +
                '</div>' +
                '</div>' +
                '</div>');
        })
    }

    $row.mouseover(function(event) {
        let e = event || window.event;
        if (e.target.tagName === "CANVAS") {
            $(e.target).siblings().find("img").css("transform", "scale(1.05,1.05)");
        }
    }).mouseout(function(event) {
        let e = event || window.event;
        if (e.target.tagName === "CANVAS") {
            $(e.target).siblings().find("img").css("transform", "scale(1,1)");
        }
    })
})