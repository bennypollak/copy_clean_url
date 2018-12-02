// Copyright (c) 2018 Alben Software. All rights reserved.

//let bp = browser.runtime.getBackgroundPage()
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;
console.log("loading utils s" + navigator.appVersion)
var OSName = undefined
if (navigator.appVersion.indexOf("Mac") != -1)
    OSName = "MacOS";
console.log('os ' + OSName)

// https://github.com/mdn/webextensions-examples/blob/master/context-menu
// -copy-link-with-types/clipboard-helper.js
const copyToClipboard = text => {
    console.log("copied '%s'", text)
    const onCopy = event => {
        document.removeEventListener("copy", onCopy, true);
        event.stopImmediatePropagation();
        event.preventDefault();
        event.clipboardData.setData("text/plain", text);
    };

    document.addEventListener("copy", onCopy, true);
    document.execCommand("copy");
};

// https://www.amazon.com/gp/product/B072J4QS9F/ref=?pf_rd_p=41cef49a-c281-400d-8a0c-3d4e8c84b0e1&pf_rd_s=detail-ilm&pf_rd_t=201&pf_rd_i=&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=54HQ54F21A99SZBXC60J&pf_rd_r=54HQ54F21A99SZBXC60J&pf_rd_p=41cef49a-c281-400d-8a0c-3d4e8c84b0e1
let patterns = [
    [/(https?:\/\/[^/]*).*$/, "$1"],
    [/(https?:\/\/).*\.([^/.]*)\.([^/.]*).*$/, "$1$2.$3"],
    [/(https:\/\/.*)\?.*$/, "$1"],
    [/(https?:\/\/.*)\/ref=.*$/, "$1"]
]
function processURL(cb) {
   if (isFirefox) {
        browser.tabs.query({active: true})
                .then(processTabs.bind(null, cb), onError);
    } else {
        chrome.tabs.getSelected(null, function (tab) {
            processTabs(cb, [tab])
        });
    }
}
function processTabs(cb, tabs) {
    for (let tab of tabs) {
        var urls = []
        let url = tab.url
        console.log("url '%s' %s", url, tab.id)
        urls.push(url)
        if (url.indexOf("http:") == 0 ||
                url.indexOf("https:") == 0) {
            for (pattern of patterns) {
                var clean = url.replace(pattern[0], pattern[1])
                console.log("cleaned '%s'", clean)
                if (urls.indexOf(clean) < 0) {
                    urls.push(clean)
                }
            }
        }
        cb(urls)
    }
}

function onError(error) {
    console.log(`Error: ${error}`);
}
