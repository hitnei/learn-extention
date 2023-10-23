import { getActiveTabUrl } from "./utils.js";

document.getElementById("CBName").addEventListener("change", async (e) => {
  const CBName = e?.target?.value;
  const activeTab = await getActiveTabUrl();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "onChangeName",
    CBName,
  });
});
