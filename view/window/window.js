$(function() {
    let $new_window = $("#window");
    let $cancle_determine = $("#window .wrap form table tr:last-child button");
    let $label = $("#window .updata_window .wrap form table tr:nth-child(3) label");
    let $update_input = $("#window .updata_window .wrap form table tr:nth-child(4) input");
    let $add_input = $("#window .add_window .wrap form table tr:nth-child(n+3) input");

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
        $new_window.css("display", "none");
        draw_table();
        alert("更改成功");
    })

    // 添加确定按钮
    $cancle_determine.filter(".add_determine").click(function() {
        let add_arr = { "isSelect": false, "order": data.length, "name": "", "price": 0, "author": "" };
        add_arr.name = $add_input.val();
        add_arr.price = Number($add_input.val());
        add_arr.author = $add_input.val();
        new_data.push(add_arr);
        $new_window.css("display", "none");
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