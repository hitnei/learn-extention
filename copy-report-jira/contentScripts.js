(() => {
  chrome.runtime.onMessage.addListener((message) => {
    console.log(
      "🚀 ~ file: contentScripts.js ~ line 3 ~ chrome.runtime.onMessage.addListener ~ message",
      message
    );
    const { type } = message;
    switch (type) {
      case "onLoadedPage":
        console.log(
          "🚀 ~ file: contentScripts.js ~ line 4 ~ chrome.runtime.onMessage.addListener ~ message",
          message
        );
        break;
      default:
        break;
    }
  });
})();
