$(function() {
    let canvas = $("#bg_canvas")[0];
    $(canvas).attr({ width: "1475", height: "730" })
    let ctx = canvas.getContext("2d");

    function init() {
        ctx.fillStyle = "rgb(0,23,56,1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    init();

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = -10;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(100,100,100,0.5)";

    // 三角形
    function CreateTriangle(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.isDelete = false; //是否删除对象
        this.draw = function() {
            if (this.y - 1000 >= canvas.height) {
                this.isDelete = true;
            } else {
                let linearGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                linearGradient.addColorStop(0, "rgba(100,100,100,0)");
                linearGradient.addColorStop(0.5, "rgba(100,100,100,0.5)");
                linearGradient.addColorStop(1, "rgba(100,100,100,0)");
                ctx.fillStyle = linearGradient;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.size / 2, this.y - 1000);
                ctx.lineTo(this.x + this.size, this.y);
                ctx.lineTo(this.x, this.y);
                ctx.closePath();
                ctx.fill();
            }
        }
        this.move = function() {
            this.y += 50;
        }
    }

    // 圆形
    function CreateCircle(x, y, radius, opacity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.opacity = opacity;

        this.isDelete = false; //是否删除对象
        this.draw = function() {
            if (this.opacity <= 0) {
                this.isDelete = true;
            } else {
                ctx.fillStyle = "rgb(100,100,100," + this.opacity + ")";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }
        this.move = function() {
            this.opacity -= 0.001;
        }
    }

    // 心形
    function CreateHeart(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.isDelete = false; //是否删除对象
        this.draw = function() {
            if (this.y - this.size / 2 >= canvas.height) {
                this.isDelete = true;
            } else {
                // 立体效果
                let linearGradient = ctx.createLinearGradient(this.x, this.y, this.x + this.size, this.y);
                linearGradient.addColorStop(0, "rgba(255,255,255,1)");
                linearGradient.addColorStop(0.5, "rgba(100,100,100,1)");
                linearGradient.addColorStop(1, "rgba(0,0,0,0.5)");
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 5;
                ctx.shadowColor = "rgba(255,0,0,1)";
                ctx.fillStyle = linearGradient;

                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
                ctx.lineTo(this.x + this.size, this.y);
                ctx.arc(this.x + this.size * 3 / 4, this.y - this.size / 4, Math.sqrt(2) * this.size / 4, Math.PI / 4, Math.PI * 5 / 4, true);
                ctx.arc(this.x + this.size / 4, this.y - this.size / 4, Math.sqrt(2) * this.size / 4, -Math.PI / 4, Math.PI * 3 / 4, true);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = "red";
                ctx.stroke();

                ctx.shadowColor = "rgba(0,0,0,0)"; //清除阴影
            }
        }
        this.move = function() {
            this.y += 0.5;
        }
    }

    function random_object() {
        let random_count = Math.floor(Math.random() * 3);
        let object = null;
        switch (random_count) {
            case 0:
                let size1 = Math.random() * 10 + 5;
                let x4 = Math.random() * (canvas.width - size1);
                let y4 = -size1;
                object = new CreateTriangle(x4, y4, size1);
                break;
            case 1:
                let radius = Math.random() * 20 + 10;
                let x2 = Math.random() * (canvas.width - radius) + radius;
                let y2 = Math.random() * (canvas.height - radius) + radius;
                let opcity = Math.random();
                object = new CreateCircle(x2, y2, radius, opcity);
                break;
            case 2:
                let size = Math.random() * 20 + 10;
                let x3 = Math.random() * (canvas.width - 2 * size);
                let y3 = -size / 2;
                object = new CreateHeart(x3, y3, size);
                break;
        }
        return object;
    }

    let thing = []; //存取生成的物块

    // 移动速度
    // setInterval(animate, 10);
    animate();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        init();
        let len = thing.length;
        for (let i = 0; i < len; i++) {
            if (thing[i].isDelete) {
                thing.splice(i, 1);
                len--;
                continue;
            }
            thing[i].move();
            thing[i].draw();
        }
        window.requestAnimationFrame(animate);
    }
    // 生成时间
    setInterval(function() {
        thing.push(random_object());
    }, 1000);
})