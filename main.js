const { app, shell, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
    },
  });

  win.maximize();
  win.webContents.openDevTools();
  win.removeMenu();
  win.loadURL("https://trilogy.devspaces.com/workspaces/");

  win.webContents.on("new-window", (event, url) => {
    event.preventDefault();

    console.log("URL", url);

    if (/https:\/\/4200-/.test(url)) {
      shell.openExternal(url);
    } else {
      win.loadURL(url);
    }
  });

  // win.once('ready-to-show', () => {
  //     win.show();
  // });
  //
  // win.on('closed', () => {
  //     win = null;
  // })
}

app.whenReady().then(createWindow);

app.setAsDefaultProtocolClient("devspaces-electron");

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
