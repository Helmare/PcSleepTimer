/*
 * The core PcSleepTimer javascript file for the renderer.
 */
const { ipcRenderer } = require('electron');

let timer = new SleepTimer();
timer.duration(10);
tick();

// Start timer on button click.
document.querySelector('#btn_timer_start').addEventListener("click", function() {
    timer.start();
    timer.reset();
    tick();
});
ipcRenderer.on("tick", tick);

/**
 * Called for updating the UI and checking the timer.
 */
function tick() {
    if (timer.isActive()) {
        if (timer.isFinished()) {
            ipcRenderer.send("shutdown");
            timer.stop();
            tick();
        }
        else {
            setClock(timer.timeLeft());
        }
    }
    else {
        setClock(timer.duration());
    }
}
/**
 * Set the clock to a set number of seconds.
 * @param {number} seconds 
 */
function setClock(seconds) {
    console.log(seconds);

    let negative = seconds < 0;
    seconds = Math.floor(Math.abs(seconds));

    let hours = Math.floor(seconds / 3600);
    seconds = seconds - hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
    
    document.querySelector("#clock").innerText = (negative ? '-' : '') + hours + ":" + pad(minutes, 2) + ":" + pad(seconds, 2);
}
/**
 * Pads a number until it reaches the length with leading zeros.
 * @param {number} num 
 * @param {number} length 
 */
function pad(num, length) {
    let str = num + '';
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}