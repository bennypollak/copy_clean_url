// Copyright (c) 2018 Alben Software. All rights reserved.

'use strict';
let title = document.getElementById('title');
title.innerHTML = "t"
////let button = document.getElementById('changeColor');
//
//button.style.backgroundColor = 'white'
//button.style.color = 'black'
////button.innerHTML = 'init'
var keysDown = {}

processURL(function (texts) {
    for (var text of texts) {
        let button = document.createElement("button");
        button.innerHTML = text
        button.onclick = function (element) {
            bp.console.log('copying %s', button.innerHTML)
            copyToClipboard(button.innerHTML)
            window.close();
        }
        button.onclick = function (event) {
            let url = button.innerHTML
            bp.console.log('copying %s %s %s', url, event.shiftKey, event.altKey)
            let key = currentKey()
            if (OSName != "MacOS") {
                if (event.shiftKey)
                    key = shift
                else if (event.altKey)
                    key = alt
            }
            if (key == shift) {
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    var tab = tabs[0];
                    chrome.tabs.update(tab.id, {url: url});
                })
            }
            if (key == alt) {
                chrome.tabs.create({url: url}, function (tab) {
                });
            } else {
                copyToClipboard(url)
            }
            window.close();
        }
        let node = document.createElement("li");
        node.appendChild(button)
        document.getElementById("buttons").appendChild(node);
    }
})
let shift = 16
let cmd = 91
let ctrl = 17
let alt = 18

function currentKey() {
    let keys = Object.keys(keysDown)
    bp.console.log('kd %s ' + keysDown)
    if (keys != undefined && keys.length == 1) {
        return keys[0]
    }
    return undefined
}
function setTitle() {
    let title = document.getElementById('title');
    let key = currentKey()
    var t = ""
    if (OSName == "MacOS") {

        if (key == shift) {
            t = "Open"
//    } else if (key == cmd) {
//        t = "Open"
        } else if (key == alt) {
            t = "Open in new tab"
        } else {
            t = "Copy"
        }
    }
    bp.console.log('t %s ', title.innerHTML, key)
    title.innerHTML = t
}
setTitle()
document.body.onkeydown = function (e) {
    keysDown["" + e.keyCode] = e.keyCode
    bp.console.log('down %s ' + e.keyCode, Object.keys(keysDown))
    setTitle()
}
document.body.onkeyup = function (e) {
    bp.console.log('up %s ', e.keyCode, Object.keys(keysDown).length)
    delete keysDown["" + e.keyCode]
    setTitle()
}
