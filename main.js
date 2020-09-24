const { app, BrowserWindow, ipcMain } = require('electron');
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
}

// Only create window when ready.
app.whenReady().then(() => {
    createMainWindow();
});

//
// Events to listen to.
//
ipcMain.on('shutdown', () => console.log('Shutting down...'));