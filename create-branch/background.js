chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url?.includes("atlassian.net/browse/")) {
    const idTask = tab.url?.split("/browse/")[1];

    chrome.tabs.sendMessage(tabId, {
      idTask,
    });
  }
});
