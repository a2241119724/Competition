$(function() {
    let $item = $("#page1 .row .row_item");
    let $waterfall = $("#page2 .waterfall");
    let $window_canvas = $("#window_canvas");

    let canvas_width = [0, 0];
    let canvas_height = [0, 0];

    // window
    light($window_canvas[0], 0.02);

    // section1
    $item.each(function() {
        canvas_width[0] = $(this).find(".border").outerWidth();
        canvas_height[0] = $(this).find(".border").outerHeight();
        $(this).find(".border").append($("<canvas id=item" + $(this).index() + " width=" + (canvas_width[0] + 1) + " height=" + canvas_height[0] + "></canvas>"));
        $("#item" + $(this).index()).css({
            "top": -1.5 + "px",
            "left": -1.5 + "px"
        });
        light($("#item" + $(this).index())[0]);
    })

    // 加载canvas
    function loadCanvas($this, timer) {
        // 加载图片高度不为0
        if ($this.find("img").height() != 0) {
            $this.attr("is-loding", 1); //截断(只循环刚生成的li)
            clearInterval(timer);
        }
        canvas_width[1] = $this.find(".wrap").outerWidth();
        canvas_height[1] = $this.find(".wrap").outerHeight();
        // while (canvas_height[1] === 53.976) {
        //     canvas_height[1] = $(this).find(".wrap").outerHeight();
        // }
        $this.find(".wrap #li" + $this.index()).prop({
            "width": canvas_width[1] + 1,
            "height": canvas_height[1]
        });
        $this.find(".wrap #li" + $this.index()).css({
            "top": 15 + "px",
            "left": 15 + "px"
        });
        light($("#li" + $this.index())[0]);
    }

    // section2(初始化时触发了滚动函数)
    $waterfall.scroll(function(event) {
        let e = event || window.event;
        e.stopPropagation();
        $("#page2 .waterfall li:not(:last-child)").not("[is-loding]").each(function() {
            let timer = null;
            // 判断图片是否加载完成
            // $(this).find("img")[0].complate
            if ($(this).find("img").height() !== 0) {
                loadCanvas($(this), timer);
            } else {
                // 如果图片未加载成功开启定时器,知道img加载完成为止
                timer = setInterval(() => {
                    loadCanvas($(this), timer);
                }, 10)
            }
        })
    });

    $window.resize(function() {
        $item.each(function() {
            canvas_width[0] = $(this).find(".border").outerWidth()
            canvas_height[0] = $(this).find(".border").outerHeight()
            $(this).find(".border canvas").css({
                "width": (canvas_width[0] + 1) + "px",
                "height": canvas_height[0] + "px"
            })
        })
    })

    function light(canvas, linear_width = 0.04) {
        let ctx = canvas.getContext("2d");

        // let linear_width = 0.04; //发光边框的宽度
        let linear_light = 0.9; //发光边框的亮度
        let center_light = 0.1; //canvas中间的亮度

        canvas.style.boxShadow = "0 0 10px rgba(28,163,203," + linear_light + ")";

        // 左右渐变
        let linear = ctx.createLinearGradient(0, 0, canvas.width, 0);
        linear.addColorStop(0, "rgba(28,163,203," + linear_light + ")");
        linear.addColorStop(linear_width, "rgba(2,38,83," + center_light + ")");
        linear.addColorStop(1 - linear_width, "rgba(2,38,83," + center_light + ")");
        linear.addColorStop(1, "rgba(28,163,203," + linear_light + ")");
        ctx.fillStyle = linear;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(0, canvas.height)
        ctx.moveTo(0, 0);
        ctx.closePath();
        ctx.fill();

        // 上下渐变
        linear = ctx.createLinearGradient(0, 0, 0, canvas.height);
        linear.addColorStop(0, "rgba(28,163,203," + linear_light + ")");
        linear.addColorStop(linear_width, "rgba(2,38,83," + center_light + ")");
        linear.addColorStop(1 - linear_width, "rgba(2,38,83," + center_light + ")");
        linear.addColorStop(1, "rgba(28,163,203," + linear_light + ")");
        ctx.fillStyle = linear;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height)
        ctx.lineTo(canvas.width, 0);
        ctx.moveTo(0, 0);
        ctx.closePath();
        ctx.fill();
    }
})