window.addEventListener("load", () => {
  document.getElementById("test")?.addEventListener("click", (e) => {
    console.log("🚀 ~ file: script.js ~ line 5 ~ document.getElementById ~ e", e);
  });
});