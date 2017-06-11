/*
* @Author: anchen
* @Date:   2017-05-23 09:19:54
* @Last Modified by:   anchen
* @Last Modified time: 2017-05-23 12:31:35
*/

'use strict';


var timer = 0;
function showColor(node) {
    node.style.backgroundColor = "#fff";
    setTimeout(function() {
        node.style.backgroundColor = "blue";
    }, timer+=500);
    setTimeout(function() {
        node.style.backgroundColor = "#fff";
    }, timer+=500);
}
function preOrder(root) {
    if(root) {
        showColor(root);
        preOrder(root.children[0]);
        preOrder(root.children[1]);
    }
}
function inOrder(root) {
    if(root) {
        preOrder(root.children[0]);
        showColor(root);
        preOrder(root.children[1]);
    }
}
function afterOrder(root) {
    if(root) {
        preOrder(root.children[0]);
        preOrder(root.children[1]);
        showColor(root);
    }
}


window.onload = function() {
    var btnFront = document.getElementById('front');
    var btnMid = document.getElementById('middle');
    var btnEnd = document.getElementById('end');
    var treeRoot = document.getElementById('root');
    btnFront.onclick = function() {
        timer = 0;
        preOrder(treeRoot);
    }
    btnMid.onclick = function() {
        timer = 0;
        inOrder(treeRoot);
    }
    btnEnd.onclick = function() {
        timer = 0;
        afterOrder(treeRoot);
    }



}