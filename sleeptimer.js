/**
 * A sleep timer class which can start
 * and stop sleep timers.
 */
class SleepTimer {
    constructor() {
        this.millis = 10000;
        this.startTime = -1;
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
        return this.startTime >= 0;
    }
    /**
     * Gets the time left on this timer.
     * @returns the number of seconds left on the timer or -1 if inactive.
     */
    timeLeft() {
        if (this.isActive())
            return (this.millis - (new Date().getTime() - this.startTime)) / 1000;
        else
            return -1;
    }
    /**
     * @returns whether the timer is finished.
     */
    isFinished() {
        return !this.isActive() && this.timeLeft() <= 0;
    }

    /**
     * Starts the sleep timer.
     */
    start() {
        if (this.isActive()) return;
        this.startTime = new Date().getTime();
    }
    /**
     * Resets the sleep timer.
     */
    reset() {
        if (!this.isActive()) return;
        this.startTime = new Date().getTime();
    }
    /**
     * Stops the sleep timer.
     */
    stop() {
        this.startTime = -1;
    }
}