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
    mainWindow.restore();
    
    // Center on main screen.
    let display = screen.getPrimaryDisplay();
    let bounds = display.bounds;
    let size = mainWindow.getSize();

    mainWindow.setPosition(0, 0);
    mainWindow.setPosition(bounds.x + (bounds.width - size[0]) / 2, bounds.y + (bounds.height - size[1]) / 2);

    mainWindow.moveTop();
});