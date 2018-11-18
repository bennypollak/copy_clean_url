// Copyright (c) 2018 Alben Software. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


chrome.commands.onCommand.addListener(function (command) {
    bp.console.log('Command:', command);
    processURL(function (texts) {
        if (texts.length > 0) {
            copyToClipboard(texts[0])
        }
    })
});
