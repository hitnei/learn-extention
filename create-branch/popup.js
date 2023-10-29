import { getActiveTabUrl, getCBName } from "./utils.js";

document.getElementById("CBName").addEventListener("input", async (e) => {
  const CBName = e?.target?.value?.trim();
  const activeTab = await getActiveTabUrl();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "onChangeName",
    CBName,
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const CBName = await getCBName();
  document.getElementById("CBName").value = CBName?.CBName || "";
});
