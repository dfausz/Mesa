const path = require('path');

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

  protocol.registerFileProtocol('background', (request, callback) => {
    const url = request.url.substr(9, request.url.length - 10)
    callback({path: app.getPath('userData') + '/backgrounds/' + url})
    }, (error) => {
      if (error) console.error('Failed to register protocol')
    }
  );

  ipcMain.handle('show-file-dialog', () => {
    dialog.showOpenDialog({properties: ["createDirectory"]}).then((files) => {
      if(!files.canceled){
        const dir = path.join(app.getPath("userData"), 'backgrounds');
        if (!existsSync(dir)) {
          mkdirSync(dir);
        }
  
        copyFile(files.filePaths[0], path.join(app.getPath("userData"), 'backgrounds', 'background.jpg'), () => {});

        // todo: figure out a way to do dynamic file sharing
        // var filename = path.parse(files.filePaths[0]).base;
        // win.webContents.send('file-selected', path.join(app.getPath("userData"), 'backgrounds', 'background.jpg'));
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
