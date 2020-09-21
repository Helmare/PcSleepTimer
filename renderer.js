/*
 * The core PcSleepTimer javascript file for the renderer.
 */
const { ipcRenderer } = require('electron');

// Shutdown on button click.
document.querySelector("#btn_shutdown").addEventListener("click", () => {
    console.log("sending shutdown event");
    ipcRenderer.send("shutdown");
});