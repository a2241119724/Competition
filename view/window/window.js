$(function() {
    let $new_window = $("#window");
    let $cancle_determine = $new_window.find(".wrap tr:last-child button");
    let $label = $new_window.find(".updata_window .wrap tr:nth-child(3) label");
    let $update_input = $new_window.find(".updata_window .wrap tr:nth-child(4) input");
    let $add_input = $new_window.find(".add_window .wrap tr:nth-child(n+3) input");
    let $img_path1 = $("#img_path1");
    let $res_path = $(".res_path");
    let $total_pagenum = $(".total_pagenum");
    let $data_total = $("#firstScreen .message .bottom .data_total span:eq(1)");
    let $search = $("#firstScreen .message .message_center ul input");

    // 改变input:file样式
    $img_path1.change(function() {
        if ($(this).prop("files").length === 0) {
            $res_path.text(null);
        } else {
            $res_path.text($(this).prop("files")[0].name);
        }
    })

    // 取消按钮
    $cancle_determine.filter(".cancle").click(function() {
        $new_window.css("display", "none");
    })

    // 更改确定按钮
    $cancle_determine.filter(".updata_determine").click(function() {
        let newdata = new_data.filter(function(item) {
            return item.order === Number($label.eq(0).text());
        })[0];
        newdata.name = $update_input.eq(0).val();
        newdata.price = $update_input.eq(1).val();
        newdata.author = $update_input.eq(2).val();
        newdata.img_path = $update_input.eq(3).val();
        $new_window.css("display", "none");

        draw_table();
        draw_item();
        draw_canvas();
        alert("更改成功");
    })

    // 添加确定按钮
    $cancle_determine.filter(".add_determine").click(function() {
        let add_arr = { "isSelect": 0, "order": data.length, "name": "", "price": 0, "author": "", img_path: "" };
        add_arr.name = $add_input.eq(0).val();
        add_arr.price = Number($add_input.eq(1).val());
        add_arr.author = $add_input.eq(2).val();
        add_arr.img_path = $add_input.eq(3).val();
        data.push(add_arr);
        $new_window.css("display", "none");

        // // 更新总页数
        // total = Math.ceil(data.length / page_of_count);
        // $total_pagenum.text(total);

        // // 更新总数据
        // $data_total.text(new_data.length);
        $search.first().trigger("change", false);

        draw_table();
        alert("添加成功");
    })

    // 登录确定按钮
    $cancle_determine.filter(".login").click(function() {
        // 密码
        let temp = $(this).parent().parent().prev();
        if (temp.prev().find("input").val() !== "admin") {
            alert("账号不存在");
        } else if (temp.find("input").val() != 123456) {
            alert("密码错误");
        } else {
            alert("登陆成功");
            $new_window.css("display", "none");
        }
    });

    // 注册确定按钮
    $cancle_determine.filter(".register").click(function() {
        // 再次确认密码
        let temp = $(this).parent().parent().prev();
        if (temp.prev().prev().find("input").val().length < 5) {
            alert("账号长度不能小于5");
        } else if (temp.prev().find("input").val().length < 6) {
            alert("密码长度不能小于6");
        } else if (temp.prev().find("input").val() !== temp.find("input").val()) {
            alert("两次密码不同");
        } else {
            alert("注册成功");
            $new_window.css("display", "none");
        }
    })
})