/**
 * A sleep timer class which can start
 * and stop sleep timers.
 */
class SleepTimer extends EventTarget {
    constructor() {
        super();

        this.millis = 10000;
        this.startTime = -1;
        this._worker = null;
    }

    /**
     * Gets or sets the duraiton in seconds.
     * @param {number} seconds 
     */
    duration(seconds) {
        if (seconds === undefined) {
            return this.millis / 1000;
        }
        else {
            this.millis = seconds * 1000;
        }
    }
    /**
     * @returns whether this timer is active.
     */
    isActive() {
        return this._worker !== null;
    }
    /**
     * Gets the time left on this timer.
     * @returns the number of seconds left on the timer or false if inactive.
     */
    timeLeft() {
        if (this.isActive())
            return (this.millis - (new Date().getTime() - this.startTime)) / 1000;
        else
            return false;
    }
    /**
     * @returns whether the timer is finished.
     */
    isFinished() {
        return this.isActive() && this.timeLeft() <= 0;
    }

    /**
     * Starts the sleep timer.
     */
    start() {
        if (this.isActive()) return;

        // Setup start time.
        this.startTime = new Date().getTime();

        // Start worker.
        this._worker = new Worker('../js/tick.js');
        this._worker.onmessage = () => {
            this.tick();
        };

        // Dispatch event
        this.dispatchEvent(new SleepTimerEvent('start', this));
    }
    /**
     * Called when the worker ticks.
     */
    tick() {
        if (this.isFinished()) {
            let event = new SleepTimerEvent('finished', this, true);
            this.dispatchEvent(event);
            if (!event.defaultPrevented) {
                this.stop();
            }
        }
        this.dispatchEvent(new SleepTimerEvent('tick', this));
    }

    /**
     * Resets the sleep timer.
     */
    reset() {
        if (!this.isActive()) return;
        this.startTime = new Date().getTime();

        this.dispatchEvent(new SleepTimerEvent('reset', this));
    }
    /**
     * Stops the sleep timer.
     */
    stop() {
        if (!this.isActive()) return;

        this._worker.terminate();
        this._worker = null;
        this.startTime = -1;

        this.dispatchEvent(new SleepTimerEvent('stop', this));
    }
}

/**
 * A simple class which extends event.
 */
class SleepTimerEvent extends Event {
    /**
     * @param {string} type 
     * @param {SleepTimer} sleepTimer 
     * @param {boolean} cancelable 
     */
    constructor(type, sleepTimer, cancelable = false) {
        super(type, {
            cancelable: cancelable
        });

        this.sleepTimer = sleepTimer;
    }
}