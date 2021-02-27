const { ipcRenderer } = require("electron");

const addFoldersAndFilesBtns = document.getElementById("content");

//Add folders and files dialog
addFoldersAndFilesBtns.addEventListener("click", (event) => {
  if (event.target.id == "add-files-btn") {
    ipcRenderer.send("add-files-dialog");
  } else if (event.target.id == "add-folders-btn") {
    ipcRenderer.send("add-folders-dialog");
  }
});

ipcRenderer.on("selected-files", (event, path) => {
  addFilesToTableAndList(path);
});

ipcRenderer.on("selected-folders", (event, path) => {
  let files = folderToArrayOfFiles(path);
  addFilesToTableAndList(files);
});

//Function to scan files from a folder
function folderToArrayOfFiles(selectedFolder, arrayOfFiles){
  arrayOfFiles = arrayOfFiles || [];
  selectedFolder = selectedFolder.toString();
  let addSubFolders = document.getElementById("include-subfolders").checked;
  let files = fs.readdirSync(selectedFolder);

  files.forEach(function (file) {
      let selectedElement = path.join(selectedFolder, file)
      let directoryOrFile = fs.statSync(selectedElement).isDirectory()
    if (directoryOrFile == true && addSubFolders == true) {
      arrayOfFiles = folderToArrayOfFiles( selectedElement, arrayOfFiles);
    } else if (directoryOrFile == false) {
      arrayOfFiles.push(selectedElement);
    }
  });
  return arrayOfFiles;
}