const { app, BrowserWindow } = require('electron');

/**
 * Creates the main window.
 */
function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 800,
        webPreference: {
            nodeIntegration: true,
        }
    });
    win.loadFile('index.html');
}

// Only create window when ready.
app.whenReady().then(createWindow);