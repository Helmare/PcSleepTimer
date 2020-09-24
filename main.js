const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { exec } = require('child_process');

/**
 * @type {BrowserWindow}
 */
let mainWindow = null;
/**
 * Creates the main window.
 */
function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 540,
        height: 960,
        resizable: false,

        webPreferences: {
            nodeIntegration: true,
        }
    });
    // mainWindow.removeMenu();
    mainWindow.loadFile('views/index.html');

    mainWindow.once('focus', () => mainWindow.flashFrame(false));
}

// Only create window when ready.
app.whenReady().then(() => {
    createMainWindow();
});

//
// Events to listen to.
//
ipcMain.on('shutdown', () => console.log('Shutting down...'));
ipcMain.on('over', () => {
    mainWindow.flashFrame(true);
    mainWindow.restore();
    mainWindow.center();
    mainWindow.moveTop();
});