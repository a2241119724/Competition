$(function() {
    //开始====================瀑布流====================//
    let $waterfall = $("#page2 .waterfall");
    let $ul_img = $waterfall.find("ul");
    let $li_last = $ul_img.find("li:last"); //得到最后一个li
    let $beBig = $("#page2 .beBig .wrap");

    let img_width = $li_last.innerWidth(); //获取每个包裹盒子的宽度
    let waterfall = $ul_img.width(); //获取整个容器的宽度
    let cols_img = Math.floor(waterfall / img_width) || 1; //获取最多多少列
    let arr_height = []; //存储每列的高度
    let minHeight = 0; //存取每次更新后数组的最小值
    let indexHeight = 0; //存取每次更新后数组的最小值的索引
    let paddingofhalf = (img_width - $li_last.width()) / 2; //获取每个包裹盒子padding/2的宽度
    let imgName = 0; //图片的名字
    let count = 0; //图片的数量
    let ul_width = img_width * cols_img; //ul的宽度,使之居中
    // let clock; //函数节流

    // $ul_img.css({
    //     "width": `${ul_width}%`,
    //     "margin": `0 ${(100-ul_width)/2}%`,
    //     "transform": `translate(${-paddingofhalf}px)`,
    // });
    $ul_img.css({
        "width": ul_width + "px",
        "transform": "translate(" + (-paddingofhalf) + "px)",
    });

    //初始化图片
    for (let i = 0; i < 25; i++) {
        waterFall();
    }

    // 解决初始化图片排列不正确的bug(重叠)
    setTimeout(function() {
        $waterfall.scrollTop(200);
        // $waterfall.trigger("scroll");
        // $waterfall.trigger("scroll");
    }, 250)

    function refresh() {
        arr_height = [];
        // $ul_img.find("li").each((index, item) => { //遍历图片li
        //     if (index < cols_img) {
        //         arr_height.push($(item).innerHeight());
        //     } else {
        //         minHeight = Math.min(...arr_height);
        //         indexHeight = arr_height.indexOf(minHeight);
        //         // $(item).css({
        //         //     "position": "absolute",
        //         //     "top": `${minHeight}px`,
        //         //     "left": `${indexHeight * img_width}px`,
        //         // });
        //         $(item).css({
        //             "position": "absolute",
        //             "top": minHeight + "px",
        //             "left": indexHeight * img_width + "px",
        //         });
        //         arr_height[indexHeight] += $(item).innerHeight();
        //         //改变包裹li的ul的高度
        //         // $ul_img.css({ "height": `${$waterfall.scrollTop()+ $waterfall.innerHeight()}px` });
        //     }
        // })
        $ul_img.find("li").each(function(index, item) { //遍历图片li
            if (index < cols_img) {
                arr_height.push($(item).innerHeight());
                // 取消第一行有的定位
                $(this).removeAttr("style");
            } else {
                // minHeight = Math.min(...arr_height);
                minHeight = Math.min.apply(null, arr_height);
                indexHeight = arr_height.indexOf(minHeight);
                // $(item).css({
                //     "position": "absolute",
                //     "top": `${minHeight}px`,
                //     "left": `${indexHeight * img_width}px`,
                // });
                $(item).css({
                    "position": "absolute",
                    "top": minHeight + "px",
                    "left": indexHeight * img_width + "px",
                });
                arr_height[indexHeight] += $(item).innerHeight();
                //改变包裹li的ul的高度
                // $ul_img.css({ "height": `${$waterfall.scrollTop()+ $waterfall.innerHeight()}px` });
            }
        })
        $("#page2 .waterfall li:not(:last-child)").not("[is-loding]").each(function() {
            // 点击在旁边的盒子放大
            // $(this).off("click").click(function(event) {
            //     let e = event || window.e;
            //     let date = new Date();
            //     let newDate = date.getFullYear() + "月" + date.getMonth() + "月" + date.getDay() + "日 " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
            //     $beBig.find("img").attr("src", $(e.currentTarget).find("img").attr("src"));
            //     $beBig.find(".message h4").text($(e.currentTarget).find(".message h4").text());
            //     $beBig.find(".message p").html(newDate + "<br/>" + $(e.currentTarget).find(".message p").text());
            // });
        });
        // setTimeout(function() {
        //     $("#page2 .waterfall li:not(:last-child)").not("[is-loding]").each(function() {
        //         $(this).attr("is-loding", 1); //截断(只循环刚生成的li)
        //         // $(this).find(".wrap img").load(function() {
        //         if ($("#li" + $(this).index()).attr("width") === undefined) {
        //             canvas_width[1] = $(this).find(".wrap").outerWidth();
        //             canvas_height[1] = $(this).find(".wrap").outerHeight();
        //             // while (canvas_height[1] === 53.976) {
        //             //     canvas_height[1] = $(this).find(".wrap").outerHeight();
        //             // }
        //             $(this).find(".wrap #li" + $(this).index()).prop({
        //                 "width": canvas_width[1] + 1,
        //                 "height": canvas_height[1]
        //             });
        //             $(this).find(".wrap #li" + $(this).index()).css({
        //                 "top": 15 + "px",
        //                 "left": 15 + "px"
        //             });
        //             light($("#li" + $(this).index())[0]);
        //         }
        //         // })
        //     })
        // }, 200)
    }

    // 更新图片列的数量
    function update_img() {
        // location.reload();
        minHeight = 0;
        indexHeight = 0;
        $waterfall = $("#page2 .waterfall");
        $ul_img = $waterfall.find("ul");
        $li_last = $ul_img.find("li:last");
        img_width = $li_last.innerWidth();
        waterfall = $ul_img.width();
        cols_img = Math.floor(waterfall / img_width) || 1;
        colChange();
        // $ul_img.css({
        //     "width": `${ul_width}%`,
        //     "margin": `0 ${(100-ul_width)/2}%`,
        //     "transform": `translate(${-paddingofhalf}px)`,
        // });
        $ul_img.css({
            "width": ul_width + "px",
        });
        refresh();
    }
    //界面在瀑布流处并改变窗口大小刷新界面
    $window.resize(function() {
        // 解决窗口急速变化包裹盒子的位置bug(执行两次)
        update_img();
        update_img();
    });

    // 瀑布流函数
    function waterFall() {
        // // 懒加载
        // if (clock) {
        //     clearTimeout(clock);
        // }
        // clock = setTimeout(function() {
        //     start()
        // }, 200)

        if (minHeight < ($waterfall.scrollTop() + $waterfall.height())) {
            let timer = null;
            count = $ul_img.find("li").length;
            imgName = Math.ceil(Math.random() * 84);
            $('<li>' +
                '<div class="wrap">' +
                '<img src="./assets/images/' + imgName + '.jpg" alt="快乐">' +
                '<div class="message">' +
                '<h4>图片' + count + '</h4>' +
                '<p>中秋国庆快乐</p>' +
                '</div>' +
                '<canvas id="li' + (count - 1) + '"></canvas>' +
                '</div>' +
                '</li>').insertBefore($li_last);
            // refresh();
            // 等immg加载出来在渲染位置
            if ($li_last.find("li:not(.is-loding) img").height() !== 0) {
                clearInterval(timer);
                refresh();
            } else {
                // 如果图片未加载成功开启定时器,知道img加载完成为止
                timer = setInterval(() => {
                    if ($li_last.find("li:not(.is-loding) img").height() !== 0) {
                        clearInterval(timer);
                    }
                    refresh();
                }, 1000)
            }
        }
    }
    $waterfall.scroll(waterFall);

    // 判断section2宽度
    function colChange() {
        if ($waterfall.width() < $li_last.innerWidth() * 2) {
            ul_width = $li_last.innerWidth();
        } else if ($waterfall.width() < $li_last.innerWidth() * 3) {
            ul_width = $li_last.innerWidth() * 2;
        } else if ($waterfall.width() < $li_last.innerWidth() * 4) {
            ul_width = $li_last.innerWidth() * 3;
        } else if ($waterfall.width() < $li_last.innerWidth() * 5) {
            ul_width = $li_last.innerWidth() * 4;
        } else {
            ul_width = $li_last.innerWidth() * 5;
        }
        $waterfall.trigger("scroll");
    }
    //结尾====================瀑布流====================//
    let tran_timer = [];
    let tran_timer1 = [];

    // 事件委托
    $ul_img.click(function(event) {
        let e = event || window.e;
        // 点击canvas
        if (e.target.tagName.toLowerCase() === "canvas" && $(e.target).attr("is-loding") != 1) {
            let date = new Date();
            let li = $(e.target).parent().parent();
            let newDate = date.getFullYear() + "月" + date.getMonth() + "月" + date.getDay() + "日 " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
            $beBig.find("img").attr("src", li.find("img").attr("src"));
            $beBig.find(".message h4").text(li.find(".message h4").text());
            $beBig.find(".message p").html(newDate + "<br/>" + li.find(".message p").text());
        }
    }).mouseover(function(event) {
        let e = event || window.e;
        let translateY = 0;
        let scale = 1;
        let li = $(e.target).parent().parent();
        clearInterval(tran_timer1[li.index()]);
        if (li.css("transform") !== "none") {
            translateY = li.css("transform").match(/(\d+)\)/)[1];
        }
        tran_timer[li.index()] = setInterval(function() {
            if (translateY < 3) {
                translateY++;
                scale += 0.01;
                if (li[0].className !== "waterfall") {
                    li.css({
                        transform: "translateY(" + translateY + "px) scale(" + scale + ")",
                    });
                }
            } else {
                clearInterval(tran_timer[li.index()]);
            }
        }, 10)
    }).mouseout(function(event) {
        let e = event || window.e;
        let translateY = 0;
        let scale = 1;
        let li = $(e.target).parent().parent();
        clearInterval(tran_timer[li.index()]);
        if (li.css("transform") !== "none") {
            translateY = li.css("transform").match(/(\d+)\)/)[1];
        }
        tran_timer1[li.index()] = setInterval(function() {
            if (translateY > 0) {
                translateY--;
                scale -= 0.01;
                if (li[0].className !== "waterfall") {
                    li.css({
                        transform: "translateY(" + translateY + "px) scale(" + scale + ")",
                    });
                }
            } else {
                clearInterval(tran_timer1[li.index()]);
            }
        }, 10)
    });


    // let $item = $("#page1 .row .row_item");

    // let canvas_width = [0, 0];
    // let canvas_height = [0, 0];

    // // section1
    // $item.each(function() {
    //     canvas_width[0] = $(this).find(".border").outerWidth();
    //     canvas_height[0] = $(this).find(".border").outerHeight();
    //     $(this).find(".border").append($("<canvas id=item" + $(this).index() + " width=" + canvas_width[0] + " height=" + canvas_height[0] + "></canvas>"));
    //     $("#item" + $(this).index()).css({
    //         "top": -1.5 + "px",
    //         "left": -1.5 + "px"
    //     });
    //     light($("#item" + $(this).index())[0]);
    // })

    // $window.resize(function() {
    //     $item.each(function() {
    //         canvas_width[0] = $(this).find(".border").outerWidth()
    //         canvas_height[0] = $(this).find(".border").outerHeight()
    //         $(this).find(".border canvas").css({
    //             "width": canvas_width[0] + 1 + "px",
    //             "height": canvas_height[0] + "px"
    //         })
    //     })
    // })

    // function light(canvas) {
    //     let ctx = canvas.getContext("2d");

    //     let linear_width = 0.04; //发光边框的宽度
    //     let linear_light = 0.9; //发光边框的亮度
    //     let center_light = 0.1; //canvas中间的亮度

    //     canvas.style.boxShadow = "0 0 10px rgba(28,163,203," + linear_light + ")";

    //     // 左右渐变
    //     let linear = ctx.createLinearGradient(0, 0, canvas.width, 0);
    //     linear.addColorStop(0, "rgba(28,163,203," + linear_light + ")");
    //     linear.addColorStop(linear_width, "rgba(2,38,83," + center_light + ")");
    //     linear.addColorStop(1 - linear_width, "rgba(2,38,83," + center_light + ")");
    //     linear.addColorStop(1, "rgba(28,163,203," + linear_light + ")");
    //     ctx.fillStyle = linear;
    //     ctx.beginPath();
    //     ctx.moveTo(0, 0);
    //     ctx.lineTo(canvas.width, canvas.height);
    //     ctx.lineTo(canvas.width, 0);
    //     ctx.lineTo(0, canvas.height)
    //     ctx.moveTo(0, 0);
    //     ctx.closePath();
    //     ctx.fill();

    //     // 上下渐变
    //     linear = ctx.createLinearGradient(0, 0, 0, canvas.height);
    //     linear.addColorStop(0, "rgba(28,163,203," + linear_light + ")");
    //     linear.addColorStop(linear_width, "rgba(2,38,83," + center_light + ")");
    //     linear.addColorStop(1 - linear_width, "rgba(2,38,83," + center_light + ")");
    //     linear.addColorStop(1, "rgba(28,163,203," + linear_light + ")");
    //     ctx.fillStyle = linear;
    //     ctx.beginPath();
    //     ctx.moveTo(0, 0);
    //     ctx.lineTo(canvas.width, canvas.height);
    //     ctx.lineTo(0, canvas.height)
    //     ctx.lineTo(canvas.width, 0);
    //     ctx.moveTo(0, 0);
    //     ctx.closePath();
    //     ctx.fill();
    // }


    // start(); // 一开始没有滚动的时候，出现在视窗中的图片也会加载

    // function start() {
    //     $("#page2 .waterfall li:not(:last-child) img").not('[data-isLoading]').each(function() {
    //         if (minHeight - 200 < ($waterfall.scrollTop() + $waterfall.height())) {
    //             $(this).attr('src', $(this).attr('data-src'));
    //             // 已经加载的图片，给它设置一个属性，值为1，作为标识
    //             $(this).attr('data-isLoading', 1);
    //         }
    //     })
    // }
})