/**
 * A class for dealing with the clock.
 */
class Clock extends EventTarget {
    /**
     * 
     * @param {string} selector 
     */
    constructor(selector) {
        super();

        /**
         * @type {HTMLInputElement}
         */
        this.elem = document.querySelector(selector);
        this.elem.addEventListener('input', (e) => { this._oninput(e) });
        this.elem.addEventListener('click', (e) => { this._onclick(e); });
    }

    _oninput(e) {
        // Grab numbers
        let value = this.elem.value;
        let nums = [];
        for (let i = 0; i < value.length; i++) {
            let num = parseInt(value[i]);
            if (!isNaN(num)) nums.push(num);
        }
        
        // Correct length.
        while (nums.length < 5) {
            nums.splice(0, 0, 0);
        }
        nums.splice(0, nums.length - 5);

        // Build new string.
        let nvalue = '';
        for (let i = 0; i < 5; i++) {
            nvalue += nums[i];
            if (i == 0 || i == 2) nvalue += ':';
        }
        this.elem.value = nvalue;

        // Call input event.
        this.dispatchEvent(new ClockInputEvent(nums[0] * 3600 + (nums[1] * 10 + nums[2]) * 60 + nums[3] * 10 + nums[4]));
    }
    _onclick(e) {
        this.elem.setSelectionRange(this.elem.value.length, this.elem.value.length);
    }

    /**
     * Sets the clock to the number of seconds passed.
     * @param {number} seconds 
     */
    set(seconds) {
        let negative = seconds < 0;
        seconds = Math.abs(seconds);
        seconds = negative ? Math.ceil(seconds) : Math.floor(seconds);
    
        let hours = Math.floor(seconds / 3600);
        seconds = seconds - hours * 3600;
        let minutes = Math.floor(seconds / 60);
        seconds = seconds - minutes * 60;
        
        if (negative) {
            this.elem.classList.add('negative');
        }
        else {
            this.elem.classList.remove('negative');
        }
        this.elem.value = hours + ":" + Clock.pad(minutes, 2) + ":" + Clock.pad(seconds, 2);
    }
    /**
     * Sets whether the input field is readonly.
     */
    setReadonly(readonly) {
        if (readonly) this.elem.setAttribute('readonly', 'true');
        else this.elem.removeAttribute('readonly');
    }


    /**
     * Pads a number until it reaches the length with leading zeros.
     * @param {number} num 
     * @param {number} length 
     */
    static pad(num, length) {
        let str = num + '';
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }
    static isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}
/**
 * An event class which stores the duration from
 * the input event.
 */
class ClockInputEvent extends Event {
    constructor(duration) {
        super('input');
        this.duration = duration;
    }
}