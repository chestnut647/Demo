/*
* @Author: anchen
* @Date:   2017-06-13 19:50:55
* @Last Modified by:   anchen
* @Last Modified time: 2017-06-13 19:51:07
*/

'use strict';
            window.onload = function() {
                var box = document.getElementById('box');
                var instruct = document.getElementById('instruct');
                var btn = document.getElementById('btn');
                var table = document.getElementById('table');
                var direction = 0;
                var fragment = document.createDocumentFragment();
                for(let i = 0; i < 10; i++) {
                    var tr = document.createElement('tr');
                    for(let j = 0; j < 10; j++ ) {
                        var td = document.createElement('td');
                        tr.appendChild(td);
                    }
                    fragment.appendChild(tr);
                }
                table.appendChild(fragment);
                btn.onclick = function() {
                    var text = instruct.value;
                    switch(text) {
                        // case 'GO': box.style.left  = box.offsetLeft + 10 + 'px';
                        case 'TUN LEF': direction = (direction + 3)%4;break;
                        case 'TUN RIG': direction = (direction + 1)%4; break;
                        case 'TUN BAC': direction = (direction + 2)%4; break;
                        case 'GO':
                                switch(direction) {
                                    case 0:
                                            if(box.offsetTop <= 0) break;
                                            box.style.top = box.offsetTop - 50 + 'px';
                                            break;
                                    case 1:
                                            if(box.offsetLeft >= 450) break;
                                            box.style.left = box.offsetLeft + 50 + 'px';
                                            break;
                                    case 2:
                                            if(box.offsetTop >= 450) break;
                                            box.style.top = box.offsetTop + 50 + 'px';
                                            break;
                                    case 3:
                                            if(box.offsetLeft <= 0) break;
                                            box.style.left = box.offsetLeft - 50 + 'px';
                                            break;
                                }
                    }
                    switch(direction) {
                        case 0: box.style.transform = "rotateZ(0)" ;break;
                        case 1: box.style.transform = "rotateZ(90deg)"; break;
                        case 2: box.style.transform = "rotateZ(180deg)"; break;
                        case 3: box.style.transform = "rotateZ(270deg)"; break;
                    }

                }
                document.onkeydown = function(e) {

                    var event = e || window.event;
                    var code = event.keyCode;
                    switch(code) {
                        case 38: box.style.transform = "rotateZ(0)" ; direction = 0; break;
                        case 39: box.style.transform = "rotateZ(90deg)"; direction = 1;  break;
                        case 40: box.style.transform = "rotateZ(180deg)"; direction = 2; break;
                        case 37: box.style.transform = "rotateZ(270deg)"; direction = 3; break;
                        case 13:
                             switch(direction) {
                                    case 0:
                                            if(box.offsetTop <= 0) break;
                                            box.style.top = box.offsetTop - 50 + 'px';
                                            break;
                                    case 1:
                                            if(box.offsetLeft >= 450) break;
                                            box.style.left = box.offsetLeft + 50 + 'px';
                                            break;
                                    case 2:
                                            if(box.offsetTop >= 450) break;
                                            box.style.top = box.offsetTop + 50 + 'px';
                                            break;
                                    case 3:
                                            if(box.offsetLeft <= 0) break;
                                            box.style.left = box.offsetLeft - 50 + 'px';
                                            break;
                                }
                    }
                }
            }