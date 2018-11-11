// Copyright (c) 2018 Alben Software. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// https://github.com/mdn/webextensions-examples
// /blob/master/context-menu-copy-link-with-types/
// clipboard-helper.js
const copyToClipboard = text => {
  const onCopy = event => {
    document.removeEventListener("copy", onCopy, true);
    event.stopImmediatePropagation();
    event.preventDefault();
    event.clipboardData.setData("text/plain", text);
  };

  document.addEventListener("copy", onCopy, true);
  document.execCommand("copy");
};

function copyURL(url) {
  chrome.tabs.getSelected(null, function(tab) {
    var clean = url.replace(/\?.*/, "")
    console.log("copied '%s'", clean);
    //chrome.tabs.update(tab.id, {
      //url: clean
    //});
    copyToClipboard(clean)
  });
}

chrome.runtime.onConnect.addListener(function(port) {
  var tab = port.sender.tab;
  // This will get called by the content script we execute in
  // the tab as a result of the user pressing the browser action.
  port.onMessage.addListener(function(info) {
    chrome.tabs.getSelected(null, function(tab) {
      copyURL(tab.url)
    });
  });
});

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
  // We can only inject scripts to find the title on pages loaded with http
  // and https so for all other pages, we don't ask for the title.
  if (tab.url.indexOf("http:") != 0 &&
    tab.url.indexOf("https:") != 0) {} else {
    console.log('copying %s', tab.url)
    copyURL(tab.url)
    chrome.tabs.executeScript(null, {
      file: "content_script.js"
    });
  }
});
