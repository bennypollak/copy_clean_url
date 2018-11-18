// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
//let button = document.getElementById('changeColor');
//
//button.style.backgroundColor = 'white'
//button.style.color = 'black'
////button.innerHTML = 'init';
bp.console.log('loading')
processURL(function (texts) {
    bp.console.log('loading1 %s', texts)
    for (var text of texts) {
        bp.console.log('loading2 ', text)
        let button = document.createElement("button");
        button.innerHTML = text
        button.onclick = function (element) {
            bp.console.log('copying %s', button.innerHTML)
            copyToClipboard(button.innerHTML)
            window.close();
        }
        let node = document.createElement("li");
        node.appendChild(button)
        bp.console.log('create %s', button.innerHTML)
        document.getElementById("buttons").appendChild(node);
    }
})
//
//button.onclick = function (element) {
//    chrome.extension.getBackgroundPage().console.log('copying %s', button.innerHTML)
//    copyToClipboard(button.innerHTML)
//
//    window.close();
//};
