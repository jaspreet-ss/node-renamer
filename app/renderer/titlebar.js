// Titlebar buttons
let titleBarBtns = document.querySelector(".title-bar");
titleBarBtns.addEventListener("click", (e) => {
  console.log("Clicked on titlebar button: ", e.target.innerText);
  if (e.target.innerText == "remove") {
    ipcRenderer.send("minimize");
    return;
  }
  if (e.target.innerText == "fullscreen") {
    ipcRenderer.send("maximize");
    return;
  }
  if (e.target.innerText == "close") {
    ipcRenderer.send("closeWindow");
    return;
  }
});
