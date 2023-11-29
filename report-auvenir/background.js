chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab?.url?.includes("7pace.Timetracker.Timesheet")) {
    chrome.action.onClicked.addListener(() => {
      console.log("🚀 ~ file: background.js ~ line 5 ~ chrome.tabs.onUpdated.addListener ~ ()");
    });
  }
});
