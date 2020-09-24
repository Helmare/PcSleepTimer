const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');

const SETTINGS_FILE_PATH = 'settings.json';

/**
 * @type {BrowserWindow}
 */
let mainWindow = null;
let settings = {
    duration: 30,
    overtime: 10,
    process: 'shutdown /t /s 0'
};

//
// Events to listen to.
//
ipcMain.on('shutdown', () => console.log('Executing: ' + settings.process));
ipcMain.on('over', () => {
    mainWindow.flashFrame(true);
    mainWindow.restore();
    mainWindow.center();
    mainWindow.moveTop();
});

// Loads settings and pushes them to the renderer.
ipcMain.on('load-settings', () => {
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
        let raw = fs.readFileSync(SETTINGS_FILE_PATH);
        Object.assign(settings, JSON.parse(raw));
    }
    mainWindow.webContents.send('push-settings', settings);
});
// Saves new settings to the settings.json file.
ipcMain.on('save-settings', (e, data) => {
    Object.assign(settings, data);
    fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(settings, null, 4));
});

// Creates the window when the app is ready.
app.whenReady().then(() => {
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
    mainWindow.on('focus', () => mainWindow.flashFrame(false));
});