/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
let bp = chrome.extension.getBackgroundPage()
bp.console.log("loading utils")


// https://github.com/mdn/webextensions-examples/blob/master/context-menu
// -copy-link-with-types/clipboard-helper.js
const copyToClipboard = text => {
            bp.console.log("copied '%s'", text)
    const onCopy = event => {
        document.removeEventListener("copy", onCopy, true);
        event.stopImmediatePropagation();
        event.preventDefault();
        event.clipboardData.setData("text/plain", text);
    };

    document.addEventListener("copy", onCopy, true);
    document.execCommand("copy");
};

function processURL(cb) {
    chrome.tabs.getSelected(null, function (tab) {
        var urls = []
        let url = tab.url
            console.log("url '%s'", url)
             urls.push(url)
       if (url.indexOf("http:") == 0 ||
                url.indexOf("https:") == 0) {
            var clean = url.replace(/\?.*/, "")
            console.log("cleaned '%s'", clean)
            urls.push(clean)
       }
            cb(urls)
   });
}
