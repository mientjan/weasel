define(["require", "exports", '../enum/TimingMode', '../../createts/events/TimeEvent', '../../createts/events/Signal1'], function (require, exports, TimingMode, TimeEvent, Signal1) {
    var Ticker = (function () {
        function Ticker() {
            /**
             * @property _startTime
             * @type {Number}
             * @protected
             **/
            this._startTime = Ticker._getTime();
            /**
             * @property _pausedTime
             * @type {Number}
             * @protected
             * @static
             **/
            this._pausedTime = 0;
            /**
             * @property _lastTime
             * @type {Number}
             * @protected
             **/
            this._lastTime = 0;
            /**
             * @property timingMode
             * @type TimingMode
             */
            this.timingMode = 0 /* TIMEOUT */;
            /**
             * Specifies a maximum value for the delta property in the tick event object. This is useful when building time
             * based animations and systems to prevent issues caused by large time gaps caused by background tabs, system sleep,
             * alert dialogs, or other blocking routines. Double the expected frame duration is often an effective value
             * (ex. maxDelta=50 when running at 40fps).
             *
             * This does not impact any other values (ex. time, runTime, etc), so you may experience issues if you enable maxDelta
             * when using both delta and other values.
             *
             * If 0, there is no maximum.
             * @property maxDelta
             * @static
             * @type {number}
             * @default 0
             */
            this.maxDelta = 0;
            /**
             * @public
             * @static
             * @property ticker
             * @type {Signal1<TimeEvent>}
             */
            this.ticker = new Signal1(null);
            this._timerId = null;
            this._ticks = 0;
            /**
             * @property _interval
             * @type {Number}
             * @protected
             **/
            this._interval = 50;
            /**
             * @property _paused
             * @type {Boolean}
             * @protected
             **/
            this._paused = false;
            //		if (Ticker._inited) { return; }
            //		this._inited = true;
            //		this._times = [];
            //		this._tickTimes = [];
            //		this._startTime = Ticker._getTime();
            //		this._times.push(Ticker._lastTime = 0);
            //		this.setInterval(Ticker._interval);
        }
        /**
         * @method getInstance
         * @returns {Ticker}
         */
        Ticker.getInstance = function () {
            if (!Ticker._instance) {
                Ticker._instance = new Ticker();
            }
            return Ticker._instance;
        };
        /**
         * @method getRequestAnimationFrame
         * @returns {(callback: FrameRequestCallback, canvas ?: HTMLCanvasElement) => number}
         */
        Ticker.getRequestAnimationFrame = function () {
            return window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'] || window['oRequestAnimationFrame'] || window['msRequestAnimationFrame'];
        };
        /**
         * @method _getTime
         * @returns {number}
         * @protected
         * @static
         */
        Ticker._getTime = function () {
            return (Ticker.now && Ticker.now.call(window.performance)) || (new Date().getTime());
        };
        /**
         * Returns the number of milliseconds that have elapsed since Ticker was initialized via {{#crossLink "Ticker/init"}}.
         * Returns -1 if Ticker has not been initialized. For example, you could use
         * this in a time synchronized animation to determine the exact amount of time that has elapsed.
         * @method getTime
         * @param {Boolean} [runTime=false] If true only time elapsed while Ticker was not paused will be returned.
         * If false, the value returned will be total time elapsed since the first tick event listener was added.
         * @return {Number} Number of milliseconds that have elapsed since Ticker was initialized or -1.
         **/
        Ticker.prototype.getTime = function (runTime) {
            return this._startTime ? Ticker._getTime() - this._startTime - (runTime ? this._pausedTime : 0) : -1;
        };
        /**
         * Sets the target frame rate in frames per second (FPS). For example, with an interval of 40, <code>getFPS()</code>
         * will return 25 (1000ms per second divided by 40 ms per tick = 25fps).
         * @method setFPS
         * @static
         * @param {Number} value Target number of ticks broadcast per second.
         **/
        Ticker.prototype.setFPS = function (value) {
            this._interval = 1000 / value;
            this._setupTick();
        };
        /**
         * @method _setupTick
         * @protected
         **/
        Ticker.prototype._setupTick = function () {
            if (this._timerId != null) {
                return;
            } // avoid duplicates
            var mode = this.timingMode;
            if (mode == 2 /* RAF_SYNCHED */ || mode == 1 /* RAF */) {
                var requestAnimationFrame = Ticker.getRequestAnimationFrame();
                if (requestAnimationFrame) {
                    this._timerId = requestAnimationFrame(mode == 1 /* RAF */ ? this._handleRAF : this._handleSynch);
                    //				Ticker._raf = true;
                    return;
                }
            }
            //		Ticker._raf = false;
            this._timerId = setTimeout(this._handleTimeout, this._interval);
        };
        /**
         * @method _tick
         * @static
         * @protected
         **/
        Ticker.prototype._tick = function () {
            var time = Ticker._getTime() - this._startTime, elapsedTime = time - this._lastTime, paused = this._paused;
            this._ticks++;
            //		if (paused) {
            //			Ticker._pausedTicks++;
            //			Ticker._pausedTime += elapsedTime;
            //		}
            this._lastTime = time;
            var event = new TimeEvent("tick");
            var maxDelta = this.maxDelta;
            // heavy performance problems, should be defined by event.
            // @todo refactor
            event.delta = (maxDelta && elapsedTime > maxDelta) ? maxDelta : elapsedTime;
            event.paused = paused;
            event.time = time;
            event.runTime = time - this._pausedTime;
            this.ticker.emit(event);
            //		Ticker._tickTimes.unshift( Ticker._getTime() - time );
            //		while (Ticker._tickTimes.length > 100) { Ticker._tickTimes.pop(); }
            //
            //		Ticker._times.unshift(time);
            //		while (Ticker._times.length > 100) { Ticker._times.pop(); }
        };
        /**
         * @method _handleSynch
         * @static
         * @protected
         **/
        Ticker.prototype._handleSynch = function () {
            var time = Ticker._getTime() - this._startTime;
            this._timerId = null;
            this._setupTick();
            // run if enough time has elapsed, with a little bit of flexibility to be early:
            if (time - this._lastTime >= (this._interval - 1) * 0.97) {
                this._tick();
            }
        };
        /**
         * @method _handleRAF
         * @static
         * @protected
         **/
        Ticker.prototype._handleRAF = function () {
            this._timerId = null;
            this._setupTick();
            this._tick();
        };
        /**
         * @method _handleTimeout
         * @static
         * @protected
         **/
        Ticker.prototype._handleTimeout = function () {
            this._timerId = null;
            this._setupTick();
            this._tick();
        };
        Ticker._instance = null;
        /**
         * @public
         * @static
         * @method now
         */
        Ticker.now = window.performance && (window.performance.now || window.performance['mozNow'] || window.performance['msNow'] || window.performance['oNow'] || window.performance['webkitNow']);
        return Ticker;
    })();
    return Ticker;
});
