/*
* @Author: anchen
* @Date:   2017-06-11 16:28:00
* @Last Modified by:   anchen
* @Last Modified time: 2017-06-11 21:32:33
*/

'use strict';
const  _baseAngle = Math.PI /  360;
let speed = 1,
    angleX = speed * _baseAngle,
    angleY = -speed * _baseAngle,
    _focalLength = 300;

function Initialization(options) {
    this.options = options;
    this.container = options.container;
    this.dataArr = options.data;
    this.r = options.r;
    // this.test();
    this.init();
}

Initialization.prototype.init = function() {
    let len = this.dataArr.length;
    let newTags = [];

    for(let i = 0; i < len; i++) {
        var angleA =  Math.acos(2*(i-1)/len - 1);
        var angleB = angleA * Math.sqrt(len * Math.PI);
        var x = this.r * Math.cos(angleA);
        var y = this.r * Math.sin(angleA) * Math.sin(angleB);
        var z = this.r * Math.sin(angleA) * Math.cos(angleB);
        var color = '#' + Math.floor(Math.random()* 0xffffff).toString(16);
        this.dataArr[i].style.color = color;
        var newtag = new Tag(this.dataArr[i], x, y, z, this.options);
        newtag.move();
        newTags.push(newtag);
        this.animate();
    }
    this.newTags = newTags;
}


Initialization.prototype.rotateX =  function() {
     let cos = Math.cos(angleY),
        sin = Math.sin(angleY);
    this.newTags.forEach((tag) => {
        let y = tag.y * cos - tag.z * sin,
            z = tag.z*cos + tag.y * sin;
        tag.y = y;
        tag.z = z;
    });

}

Initialization.prototype.rotateY = function() {
    let cos = Math.cos(angleY),
        sin = Math.sin(angleY);
    this.newTags.forEach((tag) => {
        let x = tag.x * cos - tag.z * sin,
            z = tag.z*cos + tag.x * sin;
        tag.x = x;
        tag.z = z;
    });
}
Initialization.prototype.animate = function() {
    var that = this;
    setInterval(function() {
        that.rotateX();
        that.rotateY();
        that.newTags.forEach((tag)=> {
            tag.move();
        })
    }, 20);


}
function Tag(data, x, y, z, options) {
    this.options = options;
    this.dataArr = options.data;
    this.data = data;
    this.x = x;
    this.y = y;
    this.z = z;
}
Tag.prototype.move = function() {
    var len = this.dataArr.length;
    var scale = _focalLength /(_focalLength  - this.z);
    var alpha = (this.z +  this.r)/(2 * this.r);

    this.data.style.left =  this.x + 'px';
    this.data.style.top =  this.y + 'px';
    this.data.style.fontSize = 14*scale + 'px';
    this.data.style.opacity = alpha + 0.5;
}

window.onload = function() {
    let tags = document.getElementsByTagName('a');
    let wrap = document.getElementById('wrap');

    let options = {
        data: tags,
        container: wrap,
        r: 200
    }
    let tagCloud = new Initialization(options);
    document.addEventListener('mousemove', function(e) {
        // angleY = 2 * (e.clientX/ document.body.getBoundingClientRect().width- 0.5) * speed  * _baseAngle;
        angleY = 2 * (e.clientX/ 1000- 0.5) * speed  * _baseAngle;
        angleX = 2 * (e.clientY/ 500 - 0.5) * speed  * _baseAngle;
        // console.log(angleX);
    })
}