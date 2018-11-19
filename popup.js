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
    for (var text of texts) {
        let button = document.createElement("button");
        button.innerHTML = text
        button.onclick = function (element) {
            bp.console.log('copying %s', button.innerHTML)
            copyToClipboard(button.innerHTML)
            window.close();
        }
        let node = document.createElement("li");
        node.appendChild(button)
        document.getElementById("buttons").appendChild(node);
    }
})
