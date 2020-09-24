/*
 * The core PcSleepTimer javascript file for the renderer.
 */
const { ipcRenderer, ipcMain } = require('electron');

// Grab elements
let lblClock = document.querySelector('#clock');

let btnGroupStart = document.querySelector('#group_start');
let btnGroupRunning = document.querySelector('#group_running');

let btnStart = document.querySelector('#btn_timer_start');
let btnReset = document.querySelector('#btn_timer_reset');
let btnStop = document.querySelector('#btn_timer_stop');

// Setup sleep timer.
let timer = new SleepTimer();
timer.duration(10);

// Add sleeptimer events.
timer.addEventListener('tick', refresh);
timer.addEventListener('reset', refresh);
timer.addEventListener('start', () => {
    btnGroupStart.classList.add('hidden');
    btnGroupRunning.classList.remove('hidden');
    refresh();
});
timer.addEventListener('stop', () => {
    btnGroupStart.classList.remove('hidden');
    btnGroupRunning.classList.add('hidden');
    refresh();
});
timer.addEventListener('over', () => ipcRenderer.send('over'));
timer.addEventListener('finished', () => ipcRenderer.send('shutdown'));

// Add element events
btnStart.addEventListener('click', () => timer.start());
btnReset.addEventListener('click', () => timer.reset());
btnStop.addEventListener('click', () => timer.stop());

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
    seconds = Math.abs(seconds);
    seconds = negative ? Math.ceil(seconds) : Math.floor(seconds);

    let hours = Math.floor(seconds / 3600);
    seconds = seconds - hours * 3600;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
    
    if (negative) {
        lblClock.classList.add('negative');
    }
    else {
        lblClock.classList.remove('negative');
    }
    lblClock.innerText = hours + ":" + pad(minutes, 2) + ":" + pad(seconds, 2);
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