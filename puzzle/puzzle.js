/*
* @Author: anchen
* @Date:   2017-08-31 15:51:32
* @Last Modified by:   anchen
* @Last Modified time: 2017-08-31 17:21:54
*/

'use strict';
// 保存定时时间
var time = 0;
// 是否暂停
var pause = true;
// 定时函数
var set_timer;

var  d = [ undefined ,1, 2, 3, 4, 5, 6, 7, 8, 0];
var d_direct = [
    [0],
    [2, 4],
    [1, 3, 5],
    [2, 6],
    [1, 5, 7],
    [2, 4, 6, 8],
    [3, 5, 9],
    [4, 8],
    [5, 7, 9],
    [6, 8]
];
// 存储大编号的位置
var d_posXY = [
    [0],
    [0, 0],
    [150, 0],
    [300, 0],
    [0, 150],
    [150, 150],
    [300, 150],
    [0, 300],
    [150, 300],
    [300, 300]
];

function switchij(i, j) {
    var temp = d[i];
    d[i] = d[j];
    d[j] = temp;

}
function changeXY(id, target) {
    var elem = document.getElementById("d" + id);
    elem.style.left = d_posXY[target][0] + 'px';
    elem.style.top = d_posXY[target][1] + 'px';
}
function move(id) {
    // 当前点击div在大div中的位置
    var index = 1;
    for(; index<10; index++) {
        if(d[index] == id) {
            break;
        }
    }
    // 保存小div可以去的编号，0表示不能去
    var target_d = 0;
    target_d = whereCanTo(index);
    if(target_d) {
        switchij(index, target_d);
        changeXY(id, target_d);
    }
    var finish_flag = true;
    for(var k=1; k<9; k++) {
        if(d[k] != k) {
            finish_flag = false;
            break;
        }
    }

    if(finish_flag) {

        if(!pause) {
            start();
            alert("congratulation");
        }
    }

}
// 判断是否可移动
function whereCanTo(cur_dir) {
    var can_to = d_direct[cur_dir];
    for(var i = 0; i < can_to.length; i++) {
        if(d[can_to[i]] == 0) {
            return can_to[i];
        }
    }
    return 0;
    // return 0;
}
// 定时函数，每秒执行一次
function timer() {
    time += 1;
    var min = parseInt(time/60);
    var sec  = time % 60;
    document.getElementById('timer').innerHTML = min + '分' + sec +　'秒';
}
function start() {
    if(pause) {
        document.getElementById('start').innerHTML = "暂停";
        pause = false;
        set_timer = setInterval(timer, 1000);
    } else {
        document.getElementById('start').innerHTML = "开始";
        pause = true;
        clearInterval(set_timer);
    }
}
// 重置
function reset() {
    time = 0;
    random_d();
    if(pause) {
        start();
    }
}
// 随机打乱方块
function random_d() {
    var set = new Set();
    while(set.size < 9) {
        var rand = Math.floor(Math.random() * 9);
        set.add(rand);
    }
    d = [...set];
    d.unshift(undefined);
    // d = [undefined, 1, 2, 3, 4, 5, 6, 7, 0 ,8];
    console.log(d);
    for(var i = 1; i < 10; i++) {
        if(d[i]) {
            var elem = document.getElementById("d" + d[i]);
            console.log(d[i]);
            elem.style.left = d_posXY[i][0] + 'px';
            elem.style.top = d_posXY[i][1] + 'px';
        }

    }
}

window.onload = function() {
    reset();
}