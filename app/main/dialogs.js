const { ipcMain, dialog } = require("electron");

//Dialog to add files
ipcMain.on("add-files-dialog", (event) => {
  files = dialog.showOpenDialogSync({
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "All Files", extensions: ["*"] }],
  });
  if (files) {
    event.sender.send("selected-files", files);
  }
});

//Dialog to add folder
ipcMain.on("add-folders-dialog", (event) => {
  folders = dialog.showOpenDialogSync({
    properties: ["openDirectory"],
  });
  if (folders) {
    event.sender.send("selected-folders", folders);
  }
});

//Error Dialog
ipcMain.on('open-error-dialog', (event,fileName) => {
  dialog.showErrorBox('Unable to rename file: ' , fileName)
  console.log("Recieved error, showing the dialog.")
})
