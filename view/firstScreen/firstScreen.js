$(function() {
    //开始====================轮播图====================//
    let $ul = $("#firstScreen .images ul");
    let $li = $ul.find("li");
    let $btns = $("#firstScreen .slideshow button");
    let $btnL = $btns.first();
    let $btnR = $btns.last();
    let $li_circle = $("#firstScreen .circle li");

    let len = $li.length; //优化
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
        $ul.css("left", -distance);
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
            index = len - 1;
            setTimeout(function() {
                $ul.finish().css("left", -len * distance + "px");
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
        if (index === len) {
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
        let lc = $(linearCanvas).parent()
        linearCanvas.width = lc.width();
        linearCanvas.height = lc.height();
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
        // this.greenspeed = 1;
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
    let $m = $("#firstScreen .message"); //优化
    let $thead = $m.find(".top table th");
    let $mc = $m.find(".message_center"); //优化
    let $table = $mc.find("table");
    let $ul_option = $mc.find("ul");
    let $center_li = $ul_option.find("li");
    let $search = $ul_option.find("input");
    let $form = $mc.find("form");
    let $b = $m.find(".wrap .bottom"); //优化
    let $isAll = $b.find(".isAll_wrap input");
    let $update_add = $b.find(".btns button");
    let $pagenum = $b.find(".pageNum div");
    let $pagenum_input = $b.find(".pageNum .toggle_num input");
    let $new_window = $("#window");
    let $updata_label = $("#window").find(".updata_window .wrap form table tr:nth-child(3) label");
    let $add_label = $("#window").find(".add_window .wrap form table tr:nth-child(2) label");

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
        let len_1 = new_data.length; //优化
        for (let i = 0; i < len_1; i++) {
            order++;
            let nd = new_data[i]; //优化
            let tr_td = $("<tr>");
            tr_td.html('<td><input type="checkbox" ' + (nd.isSelect ? "checked" : "") + '></td>' +
                '<td>' + nd.order + '</td>' +
                '<td>' + nd.name + '</td>' +
                '<td>' + nd.price + '元</td>' +
                '<td>' + nd.author + '</td>' +
                '<td><button class="delete" onclick="return false;">删除</button>' +
                '</td>');
            $table.append(tr_td);
        }
        let count = 0;
        let it = $table.find("tr input"); //优化
        // 解决一开始全选不对应问题
        it.each(function() {
            if ($(this).attr("checked") === "checked") {
                count++;
            }
        })
        if (count === it.length) {
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
        let e = event || window.event;
        e.stopPropagation(); //阻止冒泡(也可以阻止捕捉)
        // e.stopImmediatePropagation(); //阻止捕捉(也可以阻止冒泡)
    });

    $ul_option.click(function(event) {
        let e = event || window.event;
        let pv = $(e.target).prev(); //优化
        if (e.target.tagName.toLowerCase() === "li") {
            //错误
        } else if (pv.prev().length == 1) {
            let min_max = $(e.target).val().match(/\w+(\.\w+)?/g);
            pv.prev().prev().val(min_max[0]);
            pv.val(min_max[1]);
            pv.prev().prev().trigger("change");
            pv.trigger("change");
        } else if (e.target.tagName.toLowerCase() === "select") {
            pv.val($(e.target).val());
            pv.trigger("change");
        }
    })

    $isAll.click(function() {
        let _this = $(this);
        new_data.forEach(function(item) {
            item.isSelect = _this.prop("checked");
        })
        draw_table();
    })

    $search.first().change(function() {
        new_data = [];
        let vl = $(this).val(); //优化
        if (isNaN(Number(vl))) {
            alert("你输入的有错误");
        } else if (vl == "") {
            new_data = data;
        } else {
            data.forEach(function(item) {
                if (item.order == vl) {
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
        let vl = $(this).val(); //优化
        if (vl == "") {
            new_data = data;
        } else {
            data.forEach(function(item) {
                if (item.name == vl) {
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
        let vl = $(this).val(); //优化
        if (vl == "") {
            new_data = data;
        } else {
            let max = Number($search.eq(3).val()) || Infinity;
            data.forEach((item) => {
                if (item.price >= Number(vl) && item.price < max) {
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
        let vl = $(this).val(); //优化
        if (vl == "") {
            new_data = data;
        } else {
            let min = Number($search.eq(2).val()) || -Infinity;
            data.forEach(function(item) {
                if (item.price <= Number(vl) && item.price > min) {
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
        let vl = $(this).val(); //优化
        if (vl == "") {
            new_data = data;
        } else {
            data.forEach((item) => {
                if (item.author == vl) {
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
        let e = event || window.event;
        let pn = e.target.parentNode.parentNode;
        if (e.target.className === "delete") {
            if (confirm("真的要删除吗")) {
                // 删除页面数据
                pn.remove();
                let delete_order = Number($(pn).find("td").eq(1).text());
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
        }
        // 
        if (e.target.tagName === "INPUT") {
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

    // 初始化页数
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
        let v = Number($(this).val());
        if (v > 10) {
            pagenum = 10;
        } else if (v < 1) {
            pagenum = 1;
        } else {
            pagenum = v;
        }
        $pagenum.eq(1).find("input").val(pagenum);
    })
})