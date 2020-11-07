$(function() {
    //开始====================轮播图====================//
    let $ul = $("#firstScreen .images ul");
    let $li = $ul.find("li");
    let $btnL = $("#firstScreen .slideshow button:first");
    let $btnR = $("#firstScreen .slideshow button:last");
    let $li_circle = $("#firstScreen .circle li");

    let distance = 0; //动画每次轮播的距离
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
        $li.css("width", $("#firstScreen .center").width());
        distance = $li.width();
        $ul.css("left", -$li.width());
        if (isOne[0]) { //克隆添加
            let a = $li.first().clone();
            let b = $li.last().clone();
            a.appendTo($ul);
            b.prependTo($ul);
            isOne[0] = false;
        } else { //重新初始化时改变
            // $li只有四个
            $li.first().prev("li").css("width", distance + "px");
            $li.last().next("li").css("width", distance + "px");
            $ul.stop().css("left", -(1 + index) * distance + "px");
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
                $ul.finish().css("left", -($li.length) * distance + "px");
            }, timeB);
        }
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
                $ul.finish().css("left", -distance + "px");
            }, timeB);
        }
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
        $li_circle.each(function(index, item) {
            if (index !== _this.index()) {
                $(item).off("click").click(circle); //解决事件叠加
            } else {
                setTimeout(function() {
                    _this.off("click").click(circle); //解决事件叠加
                }, timeB);
            }
        });
        $ul.stop().animate({ "left": -(1 + index) * distance + "px" }, timeB, function() {
            $btnL.click(btnL);
            $btnR.click(btnR);
        });
        $(this).addClass("bgColor").siblings("li").removeClass("bgColor");
        timer = setInterval(btnR, timeA);
    }
    $li_circle.click(circle);
    //结尾====================轮播图====================//
    let linearCanvas = $("#linearCanvas")[0];
    let ctx = linearCanvas.getContext("2d");

    function init_1() {
        linearCanvas.width = $(linearCanvas).parent().width();
        linearCanvas.height = $(linearCanvas).parent().height();
    }
    init_1();
    $window.resize(function() {
        init_1();
    });

    function CreateLinear(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;

        this.redspeed = 1;
        this.greenspeed = 1;
        this.bluespeed = 1;
        this.draw = function() {
            let linearGradient = ctx.createLinearGradient(0, 0, linearCanvas.width, linearCanvas.height);
            linearGradient.addColorStop(0, "rgba(" + this.red + ",0 , 0, 0.3)");
            // linearGradient.addColorStop(0.5, "rgba(0," + this.green + ", 0, 0.5)");
            linearGradient.addColorStop(1, "rgba(0, 0, " + this.blue + ", 0.3)");
            ctx.fillStyle = linearGradient;
            ctx.fillRect(0, 0, linearCanvas.width, linearCanvas.height);
        }
        this.move = function() {
            if (this.red <= 0) {
                this.redspeed = -1;
            } else if (this.red >= 255) {
                this.redspeed = 1;
            }
            this.red -= this.redspeed;
            if (this.blue <= 0) {
                this.bluespeed = 1;
            } else if (this.blue >= 255) {
                this.bluespeed = -1;
            }
            this.blue += this.bluespeed;
        }
    }

    let linear = new CreateLinear(255, 0, 0);

    linearAnimate();

    function linearAnimate() {
        // 清除画布
        ctx.clearRect(0, 0, linearCanvas.width, linearCanvas.height);

        linear.draw();
        linear.move();

        // 定时执行
        window.requestAnimationFrame(linearAnimate);
    }

    // ==============================================
    let $thead = $("#firstScreen .message .top table th");
    let $table = $("#firstScreen .message .message_center table");
    let $center_li = $("#firstScreen .message .message_center li");
    let $li_option = $("#firstScreen .message .message_center ul");
    let $isAll = $("#firstScreen .message .wrap .bottom .isAll_wrap input");
    let $search = $li_option.find("input");
    let $update_add = $("#firstScreen .message .bottom .btns button");
    let $form = $("#firstScreen .message .message_center form");
    let $pagenum = $("#firstScreen .message .bottom .pageNum div");
    let $pagenum_input = $("#firstScreen .message .bottom .pageNum .toggle_num input");
    let $new_window = $("#window");
    let $updata_label = $("#window .updata_window .wrap form table tr:nth-child(3) label");
    let $add_label = $("#window .add_window .wrap form table tr:nth-child(2) label");


    // let count_of_count = 50; //每页数据
    let pagenum = 1; //页数

    // 是的头部的宽度与表中的一样
    function thead_ul() {
        $thead.each(function() {
            $(this).css("width", $($table.find("td")[$(this).index()]).css("width"));
        })
        $center_li.each(function() {
            $(this).css("width", $($table.find("td")[$(this).index()]).outerWidth() + 2);
        })
    }

    // 绘制表格 
    draw_table = function() {
        order = 0;
        $table.html(null);
        for (let i = 0; i < new_data.length; i++) {
            order++;
            let tr_td = $("<tr>");
            tr_td.html('<td><input type="checkbox" ' + (new_data[i].isSelect ? "checked" : "") + '></td>' +
                '<td>' + new_data[i].order + '</td>' +
                '<td>' + new_data[i].name + '</td>' +
                '<td>' + new_data[i].price + '元</td>' +
                '<td>' + new_data[i].author + '</td>' +
                '<td><button class="delete" onclick="return false;">删除</button>' +
                '</td>');
            $table.append(tr_td);
        }
        let count = 0;
        // 解决一开始全选不对应问题
        $table.find("tr input").each(function() {
            if ($(this).attr("checked") === "checked") {
                count++;
            }
        })
        if (count === $table.find("tr td input").length) {
            $isAll.attr("checked", "checked");
        }
        thead_ul();
        $form.find("tr").click(function() {
            $(this).addClass("bgr").siblings().removeClass("bgr");
        })
    }
    new_data = data;
    draw_table();

    $window.resize(function() {
        thead_ul();
    })

    $search.click(function(event) {
        let e = event || window.e;
        e.stopPropagation(); //阻止冒泡(也可以阻止捕捉)
        // e.stopImmediatePropagation(); //阻止捕捉(也可以阻止冒泡)
    });

    $li_option.click(function(event) {
        let e = event || window.e;
        if (e.target.tagName.toLowerCase() === "li") {
            //错误
        } else if ($(e.target).prev().prev().length == 1) {
            let min_max = $(e.target).val().match(/\w+(\.\w+)?/g);
            $(e.target).prev().prev().prev().val(min_max[0]);
            $(e.target).prev().val(min_max[1]);
            $(e.target).prev().prev().prev().trigger("change");
            $(e.target).prev().trigger("change");
        } else if (e.target.tagName.toLowerCase() === "select") {
            $(e.target).prev().val($(e.target).val());
            $(e.target).prev().trigger("change");
        }
    })

    $isAll.click(function() {
        new_data.forEach((item) => {
            item.isSelect = $(this).prop("checked");
        })
        draw_table();
    })

    $search.first().change(function() {
        new_data = [];
        if (isNaN(Number($(this).val()))) {
            alert("你输入的有错误");
        } else if ($(this).val() == "") {
            new_data = data;
        } else {
            data.forEach((item) => {
                if (item.order == $(this).val()) {
                    new_data.push(item);
                }
            })
        }
        draw_table();
        thead_ul();
        isSelectedAll();
    })
    $search.eq(1).change(function() {
        new_data = [];
        if ($(this).val() == "") {
            new_data = data;
        } else {
            data.forEach((item) => {
                if (item.name == $(this).val()) {
                    new_data.push(item);
                }
            })
        }
        draw_table();
        thead_ul();
        isSelectedAll();
    });
    $search.eq(2).change(function() {
        new_data = [];
        if ($(this).val() == "") {
            new_data = data;
        } else {
            let max = Number($search.eq(3).val()) || Infinity;
            data.forEach((item) => {
                if (item.price >= Number($(this).val()) && item.price < max) {
                    new_data.push(item);
                }
            })
        }
        draw_table();
        thead_ul();
        isSelectedAll();
    });
    $search.eq(3).change(function() {
        new_data = [];
        if ($(this).val() == "") {
            new_data = data;
        } else {
            let min = Number($search.eq(2).val()) || -Infinity;
            data.forEach((item) => {
                if (item.price <= Number($(this).val()) && item.price > min) {
                    new_data.push(item);
                }
            })
        }
        draw_table();
        thead_ul();
        isSelectedAll();
    });
    $search.last().change(function() {
        new_data = [];
        if ($(this).val() == "") {
            new_data = data;
        } else {
            data.forEach((item) => {
                if (item.author == $(this).val()) {
                    new_data.push(item);
                }
            })
        }
        draw_table();
        thead_ul();
        isSelectedAll();
    });

    // 
    $table.click(function(event) {
        let e = event || window.e;
        if (e.target.className === "delete") {
            // 删除页面数据
            e.target.parentNode.parentNode.remove();
            let delete_order = Number($(e.target.parentNode.parentNode).find("td").eq(1).text());
            // 删除源数据
            // data.splice(delete_order, 1); //有问题
            data = data.filter(function(item) {
                return item.order !== delete_order
            });
            new_data = new_data.filter(function(item) {
                return item.order !== delete_order
            });
            draw_table();
            thead_ul();
            isSelectedAll();
        }
        // 
        if (e.target.tagName.toLowerCase() === "input") {
            let newdata = new_data.filter(function(item) {
                return item.order === Number($(e.target).parent().next().text());
            })[0];
            newdata.isSelect = !newdata.isSelect;
            // 更改全选状态
            isSelectedAll();
        }
    })

    // 判断数据是全部选中
    function isSelectedAll() {
        if (new_data.every(function(item) {
                return item.isSelect === true;
            })) {
            // $isAll.attr("checked", true);
            $isAll.prop("checked", true);
        } else {
            // $isAll.attr("checked", false);
            $isAll.prop("checked", false);
        }
    }

    // 修改按钮
    $update_add.eq(0).click(function() {
        if ($form.find("tr").hasClass("bgr")) {
            $new_window.css("display", "block");
            $new_window.find(">div[class=updata_window]").css("display", "block").siblings("div").css("display", "none");
            $updata_label.each(function(index) {
                $(this).text($form.find("tr[class=bgr] td").eq(index + 1).text());
            })
        } else {
            alert("请选择数据");
        }
    })

    // 添加按钮
    $update_add.eq(1).click(function() {
        $new_window.css("display", "block");
        $new_window.find(">div[class=add_window]").css("display", "block").siblings("div").css("display", "none");
        $add_label.text(data.length);
    })

    // 初始页数
    $pagenum.eq(1).find("input").val(pagenum);
    $pagenum.eq(0).find("i").click(function() {
        if (pagenum > 1) {
            pagenum--;
            $pagenum.eq(1).find("input").val(pagenum);
        }
    });
    $pagenum.eq(2).find("i").click(function() {
        if (pagenum < 10) {
            pagenum++;
            $pagenum.eq(1).find("input").val(pagenum);
        }
    });

    $pagenum_input.blur(function() {
        if (Number($(this).val()) > 10) {
            pagenum = 10;
        } else if (Number($(this).val()) < 1) {
            pagenum = 1;
        } else {
            pagenum = Number($(this).val());
        }
        $pagenum.eq(1).find("input").val(pagenum);
    })
})