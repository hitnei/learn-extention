import { getActiveTabUrl } from "./utils.js";

const onPlay = async (e) => {
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const activeTab = await getActiveTabUrl();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "PLAY",
    value: bookmarkTime,
  });
};

const addNewBookmark = (bookmarksElement, bookmark) => {
  const bmTitleEle = document.createElement("div");
  const newBmEle = document.createElement("div");
  const controlsElement = document.createElement("div");

  bmTitleEle.textContent = bookmark.desc;
  bmTitleEle.className = "bookmark-title";

  controlsElement.className = "bookmark-controls";

  newBmEle.id = `bookmark-${bookmark.time}`;
  newBmEle.className = "bookmark";
  newBmEle.setAttribute("timestamp", bookmark.time);

  setBookmarkAttribute("play", onPlay, controlsElement);

  newBmEle.appendChild(bmTitleEle);
  newBmEle.appendChild(controlsElement);
  bookmarksElement.appendChild(newBmEle);
};

const setBookmarkAttribute = (src, eventListener, controlParentElement) => {
  const controlElement = document.createElement("img");
  controlElement.src = `assets/${src}.png`;
  controlElement.title = src;
  controlElement.addEventListener("click", eventListener);
  controlParentElement.appendChild(controlElement);
};

const viewBookmarks = (currentBookmarks = []) => {
  const bookmarksElement = document.getElementById("bookmarks");
  if (bookmarksElement) {
    bookmarksElement.innerHTML = "";
    if (!!currentBookmarks.length) {
      currentBookmarks.forEach((bookmark) => {
        addNewBookmark(bookmarksElement, bookmark);
      });
    } else {
      bookmarksElement.innerHTML = '<i class="row">No bookmark to show</i>';
    }
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabUrl();
  console.log("🚀 ~ file: popup.js ~ line 5 ~ document.addEventListener ~ activeTab", activeTab);
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);

  const currentVideo = urlParameters.get("v");

  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

      viewBookmarks(currentVideoBookmarks);
    });
  } else {
    const container = document.getElementsByClassName("container")[0];

    container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
  }
});
