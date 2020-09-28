/*
 * The core PcSleepTimer javascript file for the renderer.
 */
const { ipcRenderer } = require('electron');
const { Clock } = require('./../js/clock');
const { SleepTimer } = require('./../js/sleeptimer');

document.addEventListener('DOMContentLoaded', () => {
    // Grab elements
    let clock = new Clock('#clock');
    clock.addEventListener('input', (e) => {
        timer.duration(e.duration);
        ipcRenderer.send('save-settings', {
            duration: e.duration
        });
    });

    let btnGroupStart = document.querySelector('#group_start');
    let btnGroupRunning = document.querySelector('#group_running');

    let btnStart = document.querySelector('#btn_timer_start');
    let btnReset = document.querySelector('#btn_timer_reset');
    let btnStop = document.querySelector('#btn_timer_stop');

    // Setup sleep timer.
    let timer = new SleepTimer();
    ipcRenderer.send('load-settings');
    ipcRenderer.on('push-settings', (e, settings) => {
        timer.duration(settings.duration);
        timer.overtime(settings.overtime);
        refresh();
    });

    // Add sleeptimer events.
    timer.addEventListener('tick', refresh);

    timer.addEventListener('reset', () => { 
        ipcRenderer.send('reset-window');
        refresh();
    });
    timer.addEventListener('start', () => {
        btnGroupStart.classList.add('hidden');
        btnGroupRunning.classList.remove('hidden');
        clock.setReadonly(true);
        refresh();
    });
    timer.addEventListener('stop', () => {
        btnGroupStart.classList.remove('hidden');
        btnGroupRunning.classList.add('hidden');
        clock.setReadonly(false);

        ipcRenderer.send('reset-window');

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
        clock.set(timer.isActive() ? timer.timeLeft() : timer.duration());
    }
});