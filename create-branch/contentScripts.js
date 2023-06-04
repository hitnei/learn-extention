(() => {
  const addIconCopy = () => {
    const eleParentAction = document.querySelector(
      "[data-test-id='issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container']"
    );

    const btnCopy = document.createElement("img");
    btnCopy.src = chrome.runtime.getURL("assets/logo.png");
    btnCopy.alt = "Copy branch";
    btnCopy.title = "Copy branch";
    btnCopy.className = "copyBranchIcon";

    eleParentAction?.appendChild(btnCopy);
  };

  addIconCopy();
})();
