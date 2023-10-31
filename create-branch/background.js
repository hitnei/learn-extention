chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url?.includes("/homing.atlassian.net/")) {
    const idTask = tab?.url?.match(/HOM-\d{1,}/g)?.[0];

    if (idTask) {
      chrome.tabs.sendMessage(tabId, {
        type: "onLoadedPage",
        idTask,
      });
    }
  }
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  setTimeout(() => {
    chrome.tabs.sendMessage(tabId, {
      type: "onCreated",
    });
  }, 5000);
});
