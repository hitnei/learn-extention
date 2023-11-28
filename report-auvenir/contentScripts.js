(() => {
  chrome.runtime.onMessage.addListener((message) => {
    const { type } = message;
    switch (type) {
      case "onLoadedPage":
      default:
        break;
    }
  });
})();
