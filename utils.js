// Copyright (c) 2018 Alben Software. All rights reserved.

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
/*
 var patterns:[String:String] =  [ "(https?://.*)\\?.*$":"$1",
 "(https?://[^/]*).*$":"$1",
 "(https?://).*\\.([^/.]*)\\.([^/.]*).*$":"$1$2.$3"
 * 
 */
// https://www.amazon.com/gp/product/B072J4QS9F/ref=?pf_rd_p=41cef49a-c281-400d-8a0c-3d4e8c84b0e1&pf_rd_s=detail-ilm&pf_rd_t=201&pf_rd_i=&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=54HQ54F21A99SZBXC60J&pf_rd_r=54HQ54F21A99SZBXC60J&pf_rd_p=41cef49a-c281-400d-8a0c-3d4e8c84b0e1
let patterns = [
    [/(https?:\/\/[^/]*).*$/, "$1"],
    [/(https?:\/\/).*\.([^/.]*)\.([^/.]*).*$/, "$1$2.$3"],
    [/(https:\/\/.*)\?.*$/, "$1"],
    [/(https?:\/\/.*)\/ref=.*$/, "$1"]
]

function processURL(cb) {
    chrome.tabs.getSelected(null, function (tab) {
        var urls = []
        let url = tab.url
        bp.console.log("url '%s'", url)
        urls.push(url)
        if (url.indexOf("http:") == 0 ||
                url.indexOf("https:") == 0) {
            for (pattern of patterns) {
                var clean = url.replace(pattern[0], pattern[1])
                bp.console.log("cleaned '%s'", clean)
                if (urls.indexOf(clean) < 0) {
                    urls.push(clean)
                }
            }
        }
        cb(urls)
    });
}
