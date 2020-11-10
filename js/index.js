let $window = $(window);
let isOne = [true, false, true]; //调用一次
let new_data = []; //存储数据
let draw_table = null; //绘制表格
let draw_item = null; //绘制表格中的内容
let draw_canvas = null; //绘制表格中的内容的外框
let page_of_count = 0; //每页数据
let pagenum = 0; //页数
let total = 0; //总页数

document.write("<script src='./js/data.js' async='true'></script>");
document.write("<script src='./view/background/background.js' async='true'></script>");
document.write("<script src='./view/firstScreen/firstScreen.js' async='true'></script>");
document.write("<script src='./view/header/header.js' async='true'></script>");
document.write("<script src='./view/nav/nav.js' async='true'></script>");
document.write("<script src='./view/section1/section1.js' async='true'></script>");
document.write("<script src='./view/section2/section2.js' async='true'></script>");
document.write("<script src='./view/section3/section3.js' async='true'></script>");
document.write("<script src='./view/section4/section4.js' async='true'></script>");
document.write("<script src='./js/canvas.js' async='true'></script>");
document.write("<script src='./view/window/window.js' async='true'></script>");

$(function() {
    let point = $(".underline .point");
    setInterval(function() {
        point.animate({
            left: "150px"
        }, 2000, function() {
            point.css({ left: "-22px" });
        });
    }, 2000);
})