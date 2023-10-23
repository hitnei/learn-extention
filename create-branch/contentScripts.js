(() => {
  const setCBName = (value) => chrome.storage.sync?.set({ CBName: value });
  const getCBName = () => chrome.storage.sync?.get("CBName");

  const onCopyBranch = async (event, idTask) => {
    // HOM-xxxx
    event.preventDefault();
    const CBName = await getCBName();
    let taskName = document.querySelector("h1")?.textContent;
    const currentYear = `${new Date().getFullYear()}`.slice(2, 4);
    let currentMonth = new Date().getMonth();
    currentMonth = currentMonth < 10 ? "0" + currentMonth : "" + currentMonth;
    if (typeof taskName === "string") {
      taskName =
        "-" +
        taskName
          ?.split(/\[.*\]/g)?.[1]
          ?.trim()
          ?.replaceAll(/\W/g, " ")
          ?.replaceAll(/\s{1,}/g, "-");
    } else {
      taskName = "";
    }
    navigator.clipboard.writeText(
      `${CBName?.CBName || ""}/${currentYear}${currentMonth}/${idTask}${taskName}`.toLowerCase()
    );
  };

  const addIconCopy = (idTask) => {
    const eleParentAction = document.querySelector(
      `#jira-issue-header a[href='/browse/${idTask}']`
    );
    if (!eleParentAction?.querySelector(".copyBranchIcon")) {
      const btnCopy = document.createElement("img");
      btnCopy.src = chrome.runtime.getURL("assets/logo.png");
      btnCopy.alt = "Copy branch";
      btnCopy.title = "Copy branch";
      btnCopy.className = "copyBranchIcon";
      btnCopy.title = "Copy branch";
      btnCopy.onclick = (event) => onCopyBranch(event, idTask);

      eleParentAction?.appendChild(btnCopy);
    }
  };

  chrome.runtime.onMessage.addListener((message = {}, sender, sendResponse) => {
    const { type } = message;
    switch (type) {
      case "onLoadedPage":
        const { idTask } = message;
        if (idTask) {
          addIconCopy(idTask);
        }
        break;
      case "onChangeName":
        const { CBName } = message;
        setCBName(CBName);
        break;
      default:
        break;
    }
  });
})();
