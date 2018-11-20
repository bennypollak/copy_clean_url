// Copyright (c) 2018 Alben Software. All rights reserved.

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
