/*
 * The core PcSleepTimer javascript file for the renderer.
 */
const { ipcRenderer } = require('electron');

// Setup sleep timer.
let timer = new SleepTimer();
timer.duration(10);

// Add sleeptimer events.
timer.addEventListener('tick', refresh);
timer.addEventListener('stop', refresh);
timer.addEventListener('finished', (e) => ipcRenderer.send('shutdown'));

// Grab elements
let lblClock = document.querySelector('#clock');
let btnStart = document.querySelector('#btn_timer_start');

// Add events
btnStart.addEventListener('click', function(e) {
    timer.start();
    refresh();
});

// First refresh call.
refresh();

/**
 * Called for updating the UI and checking the timer.
 */
function refresh() {
    setClock(timer.isActive() ? timer.timeLeft() : timer.duration());
}
/**
 * Set the clock to a set number of seconds.
 * @param {number} seconds 
 */
function setClock(seconds) {
    let negative = seconds < 0;
    seconds = Math.floor(Math.abs(seconds));

    let hours = Math.floor(seconds / 3600);
    seconds = seconds - hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
    
    lblClock.innerText = (negative ? '-' : '') + hours + ":" + pad(minutes, 2) + ":" + pad(seconds, 2);
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