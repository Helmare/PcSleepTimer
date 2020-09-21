const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');

/**
 * Creates the main window.
 */
function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    win.loadFile('index.html');
}

// Only create window when ready.
app.whenReady().then(createWindow);

// Listen to shutdown channel
ipcMain.on("shutdown", () => {
    console.log("HELLO WORLD!");
    exec('shutdown /s /t 0');
});