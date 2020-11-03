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

chrome.runtime.onMessage.addListener((req) => {
  chrome.storage.local.set({ hash: req.hash });
});
