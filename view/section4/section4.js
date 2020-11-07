// 1.menu1存在第一次点击移动translateZ跳跃一下的bug
$(function() {
    //开始====================页面4===================//
    let $item = $("#page4 .wrap .item");
    let $menu1 = $("#page4 .grid .menu1");
    let $li = $menu1.find("li");

    let deg = 30; //相邻图片之间的角度
    let rotates_X = 0; //存取旋转的度数
    let distance = 0; //图片距离中心的距离
    // 当每个li移到最中间Z轴都要是相同的高度
    let offset_X = 200; //滑动时左右偏移倍率和左右相邻li相差距离
    let move_X = 0.5; //左右移动速度

    const rotate_X = 0.1; //旋转角度
    const timer_X = 50; //旋转时间间隔

    // menu1初始化
    (function() {
        $li.each(function(index) {
            $(this).css({
                "left": (index - 3) * offset_X + "px"
            });
            $(this).css({
                "transform": "translateZ(" + -Math.abs((index - 3) * offset_X) + "px)",
                "opacity": 1 - Math.abs((index - 3) * offset_X) / 400
            });
        })
    })()

    //初始化
    function init() {
        if (isOne[2]) {
            $item.each(function() {
                $(this).css({
                    "transform": "rotateY(" + deg * $(this).index() + "deg) translateZ(" + distance + "px)",
                })
            })
            isOne[2] = false;
        }
        distance = $window.width() / 5;
        if (parseFloat($("body").css("width")) < 768) {
            distance *= 2;
        }
        $("#page4 .wrap").find(".item").addBack().css({
            "width": distance / 2 + "px",
            "height": distance * 0.75 + "px"
        })
    }
    init();

    $window.resize(function() {
        init();
    });

    setInterval(() => {
        if (rotates_X === 360) {
            rotates_X = 0;
        }
        rotates_X += rotate_X;
        $item.each(function() {
            $(this).css({
                "transform": "rotateY(" + (deg * $(this).index() + rotates_X) + "deg) translateZ(" + distance + "px)",
            })
        })
    }, timer_X);

    $menu1.on("swipe", function() {
        console.log(11111);
    })

    $menu1.mousedown(function(ev) {
        let e = ev || window.event;
        let beforeX = e.clientX;
        let beforeLeft = parseFloat($(e.target).css("left"));

        // 由于鼠标抬起会强制到达中间,left_X也要更新
        let left_X = parseFloat($li[3].style.left);

        // 清除过渡
        $li.each(function() {
            $(this).css({
                "transition": ""
            });
        });

        $(this).mousemove(function(ev) {
            let e = ev || window.event;
            let afterX = e.clientX;
            // 控制左右不超出范围
            if (parseFloat($li.first().css("left")) <= 0 && parseFloat($li.last().css("left")) >= 0) {
                left_X += (afterX - beforeX) * move_X;
            } else {
                if (parseFloat($li.first().css("left")) > 0) {
                    left_X--;
                }
                if (parseFloat($li.last().css("left")) < 0) {
                    left_X++;
                }
            }
            $li.each(function(index) {
                let temp_num = (index - 3) * offset_X + left_X;
                $(this).css({
                    "left": temp_num + "px",
                    "transform": "translateZ(" + -Math.abs(temp_num) + "px)",
                    "opacity": 1 - Math.abs(temp_num) / 400
                })
            });
            // 改变初始值
            beforeX = afterX;
        });
        $(document).mouseup(() => {
            $(this).off("mousemove");
            $(document).off("mouseup");
            let arr_offsetX = []; //存取li距离中心的的距离

            //取得最接近中心的li的距离(带正负号)
            $li.each(function() {
                arr_offsetX.push(-parseFloat($(this).css("left")));
            })
            arr_offsetX.sort(function(a, b) {
                return Math.abs(a) - Math.abs(b);
            })

            $li.each(function() {
                let temp_num = parseFloat($(this).css("left")) + arr_offsetX[0];
                $(this).css({
                    "left": temp_num + "px",
                    "transform": "translateZ(" + -Math.abs(temp_num) + "px)",
                    "opacity": 1 - Math.abs(temp_num) / 400,
                    "transition": "0.5s all"
                });
                // 解决li站位是的屏幕变宽的bug
                // if (Math.abs(parseFloat($(this).css("left"))) > 200) {
                //     $(this).css("display", "none");
                // } else {
                //     $(this).css("display", "block");
                // }
            });

            setTimeout(function() {
                // 判断是否切换了li
                if (parseFloat($(e.target).css("left")) !== beforeLeft) {
                    random_height();
                }
            }, 550);
        });
        return false; //阻止默认事件 
    });
    //结尾====================页面4===================//
    let $menu2 = $("#page4 .grid .menu2");
    let $wrap = $("#page4 .grid>.wrap");

    let canvas = $("#menu2")[0];
    let ctx = canvas.getContext("2d");

    function init_1() {
        canvas.width = parseFloat($menu2.css("width"));
        canvas.height = parseFloat($menu2.css("height"));

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(canvas.width / 5, canvas.height * 4 / 5);
        ctx.lineTo(canvas.width, canvas.height * 4 / 5);
        ctx.lineTo(canvas.width * 4 / 5, canvas.height);
        ctx.closePath();
        ctx.fill()
    }
    init_1();

    $window.resize(function() {
        random_height();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        init_1();
        bar1.draw();
        bar1.move();
        bar2.draw();
        bar2.move();
    })

    function CreateBar(x, maxheight) {
        this.x = x;
        this.maxheight = maxheight;

        this.height = 0;
        this.draw = function() {
            // 正面
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x, canvas.height * 9 / 10 - this.height, canvas.width / 5, this.height);
            // 侧面
            ctx.fillStyle = "green";
            ctx.beginPath();
            ctx.moveTo(this.x + canvas.width / 5, canvas.height * 9 / 10);
            ctx.lineTo(this.x + canvas.width / 4, canvas.height * 17 / 20);
            ctx.lineTo(this.x + canvas.width / 4, canvas.height * 17 / 20 - this.height);
            ctx.lineTo(this.x + canvas.width / 5, canvas.height * 18 / 20 - this.height);
            ctx.closePath();
            ctx.fill();
            // 上面
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.moveTo(this.x, canvas.height * 9 / 10 - this.height);
            ctx.lineTo(this.x + canvas.width / 5, canvas.height * 9 / 10 - this.height);
            ctx.lineTo(this.x + canvas.width / 4, canvas.height * 17 / 20 - this.height);
            ctx.lineTo(this.x + canvas.width / 20, canvas.height * 17 / 20 - this.height);
            ctx.closePath();
            ctx.fill();
            // 数字
            ctx.font = "bold 20px Arial";
            ctx.fillText(this.height * 999, this.x + canvas.width / 28, canvas.height * 4 / 5 - this.height);
        }
        this.move = function() {
            if (this.height < this.maxheight) {
                this.height++;
            }
        }
    }
    let bar1 = new CreateBar(canvas.width / 5, canvas.height * 3 / 5);
    let bar2 = new CreateBar(canvas.width * 3 / 5, canvas.height * 2 / 5);
    let rotate__X = 0.5;
    let rotate__Y = 0.5;
    let rotate__Z = 0.5;

    function random_height() {
        //随机生成柱状图高度
        bar1 = new CreateBar(canvas.width / 5, canvas.height * Math.random() * 0.75);
        bar2 = new CreateBar(canvas.width * 3 / 5, canvas.height * Math.random() * 0.75);
        // 旋转角度
        rotate__X = Math.random();
        rotate__Y = Math.random();
        rotate__Z = Math.random();
        aniamte_rotateX();
    }

    // 点击改变旋转动画的rotateX
    function aniamte_rotateX() {
        $wrap.stop().css({
            transition: "all 1s",
            // transform: "rotateX(" + rotate__X + "deg) rotateY(" + rotate__Y + "deg)  rotateZ(" + rotate__Z + "deg)",
            transform: "rotate3d(" + rotate__X + "," + rotate__Y + "," + rotate__Z + ",90deg)"
        });
    }
    aniamte_rotateX();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        init_1();
        bar1.draw();
        bar1.move();
        bar2.draw();
        bar2.move();
        window.requestAnimationFrame(animate);
    }
    animate();
})