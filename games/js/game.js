/*
* @Author: chestnut_647
* @Date:   2017-09-01 16:47:41
* @Last Modified by:   anchen
* @Last Modified time: 2017-09-01 19:07:14
*/

'use strict';
// 创建画布
var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");
canvas.width = 520;
canvas.height = 480;
document.body.appendChild(canvas);


/**
 * bgReady heroReady 以及monsterReady是保证图片加载完成，保证绘制不会出现问题
 */
// 背景图片
var bgReady = false;
var bgImg = new Image();
bgImg.onload = function() {
    bgReady = true;

}

bgImg.src = "images/background.png";


// 英雄图片
var heroReady = false;
var heroImg = new Image();
heroImg.onload = function() {
    heroReady = true;
}
heroImg.src = "images/hero.png";
// 怪物图片
var monsterReady = false;
var monsterImg = new Image();
monsterImg.onload = function() {
    monsterReady = true;

}
monsterImg.src = "images/monster.png";


// 游戏对象
var hero = {
    speed: 256, //用于控制英雄移动的速度
    x: canvas.width/2,
    y: canvas.height/2
};
var monster = {}; //怪物无需移动
var monstersCaught = 0;
// 处理用户输入
var keysDown = {};
document.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});
document.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});
/** [开始一轮游戏(捕获一次重置英雄与怪物的位置)] */
var reset = function() {
    // hero.x = canvas.width/2;
    // hero.y = canvas.height/2;
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};
/**
 * [负责更新各个对象，会被周期性地重复调用]
 * @param  {[type]} modifier [基于1开始并随着时间变化，保证英雄的速度恒定]
 * @return {[type]}          [description]
 */
var update = function(modifier) {
    if(38 in keysDown) { //上
        if(hero.y > 0) {
           hero.y -= hero.speed * modifier;
        }

    }
    if(40 in keysDown) { //下
        if(hero.y < 450) {
            hero.y += hero.speed * modifier;
        }
    }
    if(37 in keysDown) { //左
        if(hero.x > 0) {
            hero.x -= hero.speed * modifier;
        }
    }
    if(39 in keysDown) {
        if(hero.x < 480) {
            hero.x += hero.speed * modifier;
        }
    }
    // 检查是否抓到怪物
    if(Math.abs(hero.x - monster.x) <= 32 && Math.abs(hero.y - monster.y) <= 32) {
        ++monstersCaught;
        reset();
    }
};
/** [物体渲染] */
var render = function() {

    if(bgReady) {
        ctx.drawImage(bgImg, 0, 0);
    }
    if(heroReady) {
        ctx.drawImage(heroImg, hero.x, hero.y);
    }
    if(monsterReady) {
        ctx.drawImage(monsterImg, monster.x, monster.y);
    }
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.testBaseline = "top";


    ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
}

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;

/** [函数的主循环部分] */
var main = function() {
    var now = Date.now();
    var delta = now - then;

    update(delta/1000);
    render();
    then = now;
    requestAnimationFrame(main);
}

var then = Date.now();
reset();
main();