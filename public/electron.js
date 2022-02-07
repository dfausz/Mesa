const path = require('path');
const fs = require('fs');

const { app, BrowserWindow, ipcMain, ipcRenderer, dialog, protocol } = require('electron');
const isDev = require('electron-is-dev');

const { copyFile, existsSync, mkdirSync } = require('fs');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  
  win.removeMenu();
  win.maximize();

  ipcMain.handle('window-all-closed', () => { app.quit() });
  ipcMain.handle('window-minimize', () => { win.minimize() });
  ipcMain.handle('window-toggle-maximize', () => { 
    if(win.isMaximized()){
      win.restore();
    }
    else {
      win.maximize(); 
    }
  });

  ipcMain.on("uploadBackground", (event, uploadName) => {
    const result = dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["png","jpg","jpeg"] }]
    });
  
    result.then(({canceled, filePaths}) => {
      if(!canceled){
        try{
          const base64 = fs.readFileSync(filePaths[0]).toString('base64');
          win.webContents.send("chosen-background", base64, uploadName);
        }
        catch(ex) {
          console.log(ex);
        }
      }
    });
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'right' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);
