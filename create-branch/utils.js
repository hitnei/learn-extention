export async function getActiveTabUrl() {
  let queryOptions = { active: true, currentWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export const setCBName = (value) => chrome.storage.sync?.set({ CBName: value });

export const getCBName = () => chrome.storage.sync?.get("CBName");
