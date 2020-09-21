/*
 * The core PcSleepTimer javascript file for the renderer.
 */
const { ipcRenderer } = require('electron');

// Time constans
const MILLIS_PER_MINUTE = 60000;

// Timer constants
const TIMER_DURATION = 10000;
const TIMER_GRACE_PERIOD = 0;

// If this is -1, timer is not running.
let timerStart = -1;

// Start timer / Reset timer on button click.
document.querySelector("#btn_timer").addEventListener("click", function() {
    this.innerText = "Reset Timer";
    timerStart = new Date().getTime();

    tick();
});

// Called when main process calls tick.
function tick() {
    if (timerStart < 0) return;

    let timeLeft = TIMER_DURATION - (new Date().getTime() - timerStart);
    if (timeLeft <= -TIMER_GRACE_PERIOD) ipcRenderer.send("shutdown");
    
    let renderTime = (timeLeft < 0) ? 0 : timeLeft;
    document.querySelector("#time_left").innerText = Math.ceil(renderTime / 1000) + " seconds";
}
ipcRenderer.on("tick", tick);