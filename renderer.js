/*
 * The core PcSleepTimer javascript file for the renderer.
 */
const { ipcRenderer } = require('electron');

let timer = new SleepTimer();
timer.duration(10);

// Start timer / Reset timer on button click.
document.querySelector("#btn_timer").addEventListener("click", function() {
    timer.start();
    timer.reset();
    tick();
});

// Called when main process calls tick.
function tick() {
    if (!timer.isActive()) return;
    if (timer.isFinished()) ipcRenderer.send("shutdown");
    
    let timeLeft = timer.timeLeft();
    let renderTime = (timeLeft < 0) ? 0 : timeLeft;
    document.querySelector("#time_left").innerText = Math.ceil(renderTime / 1000) + " seconds";
}
ipcRenderer.on("tick", tick);