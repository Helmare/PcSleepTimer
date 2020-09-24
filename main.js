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
    mainWindow.removeMenu();
    mainWindow.loadFile('index.html');

    // Start first tick.
    tick();
}
/**
 * Sends a tick message every second.
 */
function tick() {
    mainWindow.webContents.send('tick');
    setTimeout(tick, 1000);
}

// Only create window when ready.
app.whenReady().then(() => {
    createMainWindow();
});
// Listen to shutdown channel
ipcMain.on('shutdown', () => exec('shutdown /s /t 0'));