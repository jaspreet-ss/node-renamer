const { app, BrowserWindow, globalShortcut } = require("electron");
const { ipcMain } = require("electron");
const path = require("path");
const { glob } = require("glob");

loadDemos();

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    devTools: false,
    minWidth: 882,
    minHeight: 580,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
    },
    backgroundColor: "#ffffff",
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  console.log("Starting");

  //this will get call for Control+Shift+I.
  globalShortcut.register("Control+Shift+I", () => {
    return;
  }); //Uncomment when building
  globalShortcut.register("Control+Shift+R", () => {
    return;
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function loadDemos() {
  const files = glob.sync(path.join(__dirname, "./app/main/*.js"));
  files.forEach((file) => {
    require(file);
  });
}

ipcMain.on("minimize", () => {
  let window = BrowserWindow.getFocusedWindow();
  window.minimize();
});

ipcMain.on("maximize", () => {
  let window = BrowserWindow.getFocusedWindow();
  window.isMaximized() ? window.restore() : window.maximize();
});

ipcMain.on("closeWindow", (e) => {
  if (process.platform !== "darwin") {
    app.quit();
  } else {
    let window = BrowserWindow.getFocusedWindow();
    e.preventDefault();
    window.hide();
  }
});
