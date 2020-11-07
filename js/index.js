let $window = $(window);
let isOne = [true, false, true]; //调用一次
let new_data = []; //存储数据
let draw_table = null; //绘制表格

document.write("<script src='./js/data.js' async='true'></script>");
document.write("<script src='./view/background/background.js' async='true'></script>");
document.write("<script src='./view/firstScreen/firstScreen.js' async='true'></script>");
document.write("<script src='./view/header/header.js' async='true'></script>");
document.write("<script src='./view/nav/nav.js'></script>");
document.write("<script src='./view/section1/section1.js' async='true'></script>");
document.write("<script src='./view/section2/section2.js' async='true'></script>");
document.write("<script src='./view/section3/section3.js' async='true'></script>");
document.write("<script src='./view/section4/section4.js' async='true'></script>");
document.write("<script src='./js/canvas.js' async='true'></script>");
document.write("<script src='./view/window/window.js' async='true'></script>");

$(function() {
    let point = $(".underline .point");
    setInterval(() => {
        point.animate({
            left: "150px"
        }, 2000, function() {
            point.css({ left: "-22px" });
        });
    }, 2000);
})