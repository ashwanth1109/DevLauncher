const forcePopup = ({ id, url }) => {
  if (/https?:\/\/(github).com\/*\/!*/.test(url)) {
    chrome.pageAction.show(id);
  }
};

chrome.tabs.onUpdated.addListener((tabId, activeInfo, tab) => {
  forcePopup(tab);
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, forcePopup);
});
//
// // chrome.pageAction.onClicked.addListener(({ url }) => {
// //   chrome.windows.create({
// //     url: `devspaces-electron://abc=1`,
// //   });
// // });

// let tab;

// chrome.pageAction.onClicked.addListener(({ url }) => {
//   window.pageUrl = url;
//   // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   //   tab = tabs[0];
//   //
//   //   // chrome.tabs.update(tab.id, { url: "devspaces-electron://abc=1" });
//   // });
// });
