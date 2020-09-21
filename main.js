const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const { SSL_OP_NO_TICKET } = require('constants');

/**
 * @type {BrowserWindow}
 */
let mainWindow = null;

/**
 * Creates the main window.
 */
function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
        }
    });
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
    SSL_OP_NO_TICKET
});
// Listen to shutdown channel
ipcMain.on("shutdown", () => exec('shutdown /s /t 0'));