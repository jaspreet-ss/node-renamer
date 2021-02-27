let contextMenu = document.querySelector(".main-window")
let filesContextMenu = document.getElementById("files-context-menu");
let rulesContextMenu = document.getElementById("rules-context-menu");
let clickedFileElement = "";
let clickedRuleElement = "";

// Event listener for context-menu of rules and files table
contextMenu.addEventListener("contextmenu", (e) => {
  if (clickedFileElement) {
    clickedFileElement.classList.remove("table-selected-row");
  }
  if (clickedRuleElement) {
    clickedRuleElement.classList.remove("table-selected-row");
  }
  console.log(
    "Files Table right clicked:" + e.path[4].classList.contains("files-table")
  );
  if (
    e.target.localName == "td" &&
    e.path[4].classList.contains("files-table")
  ) {
    filesContextMenu.style.display = "block";
    filesContextMenu.style.left = e.pageX + "px";
    filesContextMenu.style.top = e.pageY + "px";
    clickedFileElement = e.target;
    clickedFileElement.classList.add("table-selected-row");
  }
  console.log(
    "Rules Table right clicked:" + e.path[4].classList.contains("rules-table")
  );
  if (
    e.target.localName == "td" &&
    e.path[4].classList.contains("rules-table")
  ) {
    rulesContextMenu.style.display = "block";
    rulesContextMenu.style.left = e.pageX + "px";
    rulesContextMenu.style.top = e.pageY + "px";
    clickedRuleElement = e.target;
    clickedRuleElement.classList.add("table-selected-row");
  }
});

contextMenu.addEventListener("click", (e) => {
  filesContextMenu.style.display = "none";
  rulesContextMenu.style.display = "none";
  // Files context menu items
  if (e.target.id == "remove-selected-file") {
    removeFileFromTableAndList(clickedFileElement);
    clickedFileElement.remove();
    return;
  }
  if (e.target.id == "show-file-details") {
    let selectedFile = clickedFileElement.innerText;
    let fileDetails = fs.statSync(selectedFile);
    let fileCreatedTime = fileDetails.birthtime.toUTCString();
    let fileModifiedTime = fileDetails.mtime.toUTCString();
    let fileAccessedTime = fileDetails.atime.toUTCString();
    let fileSize = fileDetails.size;
    let fileExtension = path.extname(selectedFile);
    let filePath = path.dirname(selectedFile);
    alert(
      `File Path: ${filePath}\nFile Extension: ${fileExtension}\nFile Size: ${fileSize} bytes\nCreated Time: ${fileCreatedTime}\nModified Time: ${fileModifiedTime}\nAccessed Time: ${fileAccessedTime}`
    );

    return;
  }
  if (e.target.id == "remove-all-files") {
    removeAllFilesFromTableAndList();
    return;
  }

  // Rules Context Menu items
  if (e.target.id == "remove-selected-rule") {
    removeRuleFromTableAndList(clickedRuleElement);
    clickedRuleElement.remove();
    return;
  }
  if (e.target.id == "remove-all-rules") {
    removeAllRulesFromTableAndList();
    return;
  }
});
