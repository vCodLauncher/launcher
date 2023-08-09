const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
var pjson = require('./package.json');


function createWindow() {
    ipcMain.handle('getUserDataPath', (event) => {
        const userDataPath = app.getPath('userData');
        console.log(userDataPath)
        return userDataPath;
    });
    ipcMain.on('open-folder-dialog', (event) => {
        dialog
            .showOpenDialog({ properties: ['openDirectory'] })
            .then((result) => {
                const selectedDirectory = result.filePaths[0];
                event.sender.send('selected-folder', selectedDirectory);
            })
            .catch((err) => {
                console.error(err);
            });
    });

    const updateWindow = new BrowserWindow({
        width: 300,
        height: 400,
        resizable: false,
        fullscreenable: false,
        frame: false,
        movable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        icon: path.join(__dirname, 'assets/game_logo/cod_1_logo.png'),
    });



    updateWindow.setTitle('COD Launcher - Update');
    updateWindow.loadFile(path.join(__dirname, 'templates/update.html'));
    updateWindow.setMenu(null);

    ipcMain.handle('startUpdatedGame', (event) => {
        updateWindow.close();
        launchMainWindow();
    });
}

function launchMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        resizable: false,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        icon: path.join(__dirname, 'assets/game_logo/cod_1_logo.png'),
    });

    mainWindow.loadFile(path.join(__dirname, 'templates/index.html'));
    mainWindow.setTitle('CODLite Launcher - v' + pjson.version);
    /*mainWindow.setMenu(null);*/
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
