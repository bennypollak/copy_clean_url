// Copyright (c) 2018 Alben Software. All rights reserved.

console.log('lo]]:')
chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command)
    processURL(function (texts) {
        
        if (texts.length > 0) {
            var item = command == 'clean-copy' ? item = texts.length-1 : 0
            copyToClipboard(texts[item])
        }
    })
});

//chrome.contextMenus.removeAll();
//chrome.contextMenus.create({
//      title: "Help",
//      contexts: ["browser_action"],
//      onclick: function() {
//        alert('first');
//      }
//});