const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

function createWindow () {

    ipcMain.handle('getUserDataPath', (event) => {
        const userDataPath = app.getPath('userData');
        return userDataPath;
    });

    ipcMain.on('open-folder-dialog', (event) => {
        dialog.showOpenDialog({properties: ['openDirectory']})
            .then(result => {
                const selectedDirectory = result.filePaths[0];
                event.sender.send('selected-folder', selectedDirectory);
            })
            .catch(err => {
                console.error(err);
            });
    });

    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        resizable: false,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })
        win.loadFile(path.join(__dirname, 'templates/index.html'))

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()

    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

try {
    require('electron-reloader')(module)
} catch (_) {}
