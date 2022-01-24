const path = require('path');

const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  ipcMain.handle('window-all-closed', () => { app.quit() });

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
