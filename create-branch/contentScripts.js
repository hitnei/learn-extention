(() => {
  const getUserName = () => document.getElementById("name")?.value;

  const onCopyBranch = (event, idTask) => {
    // HOM-xxxx
    event.preventDefault();
    const userName = getUserName();
    navigator.clipboard.writeText(idTask);
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

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { idTask } = message;
    if (idTask) {
      addIconCopy(idTask);
    }
  });
})();
