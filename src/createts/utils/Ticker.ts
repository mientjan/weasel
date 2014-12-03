/*
 * Ticker
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

//import EventDispatcher = require('../../createts/events/EventDispatcher');
import Event = require('../../createts/events/Event');
import TimeEvent = require('../../createts/events/TimeEvent');
import Signal1 = require('../../createts/events/Signal1');
import SignalConnection = require('../../createts/events/SignalConnection');

/**
 * The Ticker provides  a centralized tick or heartbeat broadcast at a set interval. Listeners can subscribe to the tick
 * event to be notified when a set time interval has elapsed.
 *
 * Note that the interval that the tick event is called is a target interval, and may be broadcast at a slower interval
 * during times of high CPU load. The Ticker class uses a static interface (ex. <code>Ticker.getPaused()</code>) and
 * should not be instantiated.
 *
 * <h4>Example</h4>
 *
 *      createjs.Ticker.addEventListener("tick", handleTick);
 *      function handleTick(event) {
 *          // Actions carried out each frame
 *          if (!event.paused) {
 *              // Actions carried out when the Ticker is not paused.
 *          }
 *      }
 *
 * To update a stage every tick, the {{#crossLink "Stage"}}{{/crossLink}} instance can also be used as a listener, as
 * it will automatically update when it receives a tick event:
 *
 *      createjs.Ticker.addEventListener("tick", stage);
 *
 * @class Ticker
 * @uses EventDispatcher
 * @static
 **/
class Ticker
{
	/**
	 * 	 * {{#crossLink "Ticker/TIMEOUT"}}{{/crossLink}}, {{#crossLink "Ticker/RAF"}}{{/crossLink}}, and
	 * {{#crossLink "Ticker/RAF_SYNCHED"}}{{/crossLink}} for mode details.
	 */
	public static TIMINGMODE_TIMEOUT = 'timeout';
	public static TIMINGMODE_RAF = 'raf';
	public static TIMINGMODE_RAFSYNCHED = 'raf_synched';

	/**
	 * In this mode, Ticker uses the requestAnimationFrame API, but attempts to synch the ticks to target framerate. It
	 * uses a simple heuristic that compares the time of the RAF return to the target time for the current frame and
	 * dispatches the tick when the time is within a certain threshold.
	 *
	 * This mode has a higher variance for time between frames than TIMEOUT, but does not require that content be time
	 * based as with RAF while gaining the benefits of that API (screen synch, background throttling).
	 *
	 * Variance is usually lowest for framerates that are a divisor of the RAF frequency. This is usually 60, so
	 * framerates of 10, 12, 15, 20, and 30 work well.
	 *
	 * Falls back on TIMEOUT if the requestAnimationFrame API is not supported.
	 * @property RAF_SYNCHED
	 * @static
	 * @type {String}
	 * @default "synched"
	 * @readonly
	 **/
//	public static RAF_SYNCHED = "synched";

	/**
	 * In this mode, Ticker passes through the requestAnimationFrame heartbeat, ignoring the target framerate completely.
	 * Because requestAnimationFrame frequency is not deterministic, any content using this mode should be time based.
	 * You can leverage {{#crossLink "Ticker/getTime"}}{{/crossLink}} and the tick event object's "delta" properties
	 * to make this easier.
	 *
	 * Falls back on TIMEOUT if the requestAnimationFrame API is not supported.
	 * @property RAF
	 * @static
	 * @type {String}
	 * @default "raf"
	 * @readonly
	 **/
//	public static RAF = "raf";

	/**
	 * In this mode, Ticker uses the setTimeout API. This provides predictable, adaptive frame timing, but does not
	 * provide the benefits of requestAnimationFrame (screen synch, background throttling).
	 * @property TIMEOUT
	 * @static
	 * @type {String}
	 * @default "timer"
	 * @readonly
	 **/
//	public static TIMEOUT = "timeout";

	/**
	 * @method _getTime
	 * @static
	 * @protected
	 **/
	public static now = window.performance && (performance.now || performance['mozNow'] || performance['msNow'] || performance['oNow'] || performance['webkitNow']);

	public static _getTime()
	{
		return (Ticker.now && Ticker.now.call(performance)) || (new Date().getTime());
	}

	private static _instance:Ticker = null;

	public getInstance():Ticker
	{
		if(!Ticker._instance)
		{
			Ticker._instance = new Ticker();
		}

		return Ticker._instance;
	}

	// events:

	/**
	 * Dispatched each tick. The event will be dispatched to each listener even when the Ticker has been paused using
	 * {{#crossLink "Ticker/setPaused"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      function handleTick(event) {
	 *          console.log("Paused:", event.paused, event.delta);
	 *      }
	 *
	 * @event tick
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {Boolean} paused Indicates whether the ticker is currently paused.
	 * @param {Number} delta The time elapsed in ms since the last tick.
	 * @param {Number} time The total time in ms since Ticker was initialized.
	 * @param {Number} runTime The total time in ms that Ticker was not paused since it was initialized. For example,
	 *    you could determine the amount of time that the Ticker has been paused since initialization with time-runTime.
	 * @since 0.6.0
	 */

	// public static properties:
	/**
	 * Deprecated in favour of {{#crossLink "Ticker/timingMode"}}{{/crossLink}}, and will be removed in a future version. If true, timingMode will
	 * use {{#crossLink "Ticker/RAF_SYNCHED"}}{{/crossLink}} by default.
	 * @deprecated Deprecated in favour of {{#crossLink "Ticker/timingMode"}}{{/crossLink}}.
	 * @property useRAF
	 * @static
	 * @type {Boolean}
	 * @default false
	 **/
//	public useRAF:boolean = false;

	/**
	 * Specifies the timing api (setTimeout or requestAnimationFrame) and mode to use. See
	 * {{#crossLink "Ticker/TIMEOUT"}}{{/crossLink}}, {{#crossLink "Ticker/RAF"}}{{/crossLink}}, and
	 * {{#crossLink "Ticker/RAF_SYNCHED"}}{{/crossLink}} for mode details.
	 * @property timingMode
	 * @static
	 * @type {String}
	 * @default Ticker.TIMEOUT
	 **/
	public timingMode = Ticker.TIMINGMODE_TIMEOUT;

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
	public static maxDelta = 0;

	// mix-ins:
	// EventDispatcher methods:
	//	public static removeEventListener = null;
	//	public static removeAllEventListeners = null;
	//	public static dispatchEvent = null;
	//	public static hasEventListener = null;
	//	public static _listeners = null;

	//	public static _addEventListener = Ticker.addEventListener;
	//	public static addEventListener() {
	//		!Ticker._inited && Ticker.init();
	//		return Ticker._addEventListener.apply(Ticker, arguments);
	//	};

	// private static properties:

	/**
	 * @property _paused
	 * @type {Boolean}
	 * @protected
	 **/
	public _paused:boolean = false;

	/**
	 * @property _inited
	 * @type {Boolean}
	 * @protected
	 **/
	public _inited:boolean = false;

	/**
	 * @property _startTime
	 * @type {Number}
	 * @protected
	 **/
	public _startTime:number = 0;

	/**
	 * @property _pausedTime
	 * @type {Number}
	 * @protected
	 **/
	public _pausedTime:number = 0;

	/**
	 * The number of ticks that have passed
	 * @property _ticks
	 * @type {Number}
	 * @protected
	 **/
	public _ticks:number = 0;

	/**
	 * The number of ticks that have passed while Ticker has been paused
	 * @property _pausedTicks
	 * @type {Number}
	 * @protected
	 **/
	public _pausedTicks:number = 0;

	/**
	 * @property _interval
	 * @type {Number}
	 * @protected
	 **/
	public _interval:number = 50;

	/**
	 * @property _lastTime
	 * @type {Number}
	 * @protected
	 **/
	public _lastTime:number = 0;

	/**
	 * @property _times
	 * @type {Array}
	 * @protected
	 **/
	public _times:any[] = [];

	/**
	 * @property _tickTimes
	 * @type {Array}
	 * @protected
	 **/
	public _tickTimes:number[] = [];

	/**
	 * Stores the timeout or requestAnimationFrame id.
	 *
	 * @property _timerId
	 * @type {Number}
	 * @protected
	 **/
	public _timerId:number = -1;

	public tickSignal:Signal1<TimeEvent> = new Signal1<TimeEvent>(null);

	/**
	 * True if currently using requestAnimationFrame, false if using setTimeout.
	 *
	 * @property _raf
	 * @type {Boolean}
	 * @protected
	 **/
	public _raf:boolean = true;

	/**
	 * Starts the tick. This is called automatically when the first listener is added.
	 * @method init
	 * @static
	 **/
		constructor()
	{
		//		if (Ticker._inited) { return; }
		//		Ticker._inited = true;
		//		Ticker._tickTimes = [];
		this._startTime = Ticker._getTime();
		this._times.push(this._lastTime = 0);
		//		Ticker.setInterval(Ticker._interval);
	}

	/**
	 * Stops the Ticker and removes all listeners. Use init() to restart the Ticker.
	 *
	 * @method reset
	 **/
	public reset():void
	{
		if(this._raf)
		{
			var fn = window.cancelAnimationFrame
				|| window['webkitCancelAnimationFrame']
				|| window['mozCancelAnimationFrame']
				|| window['oCancelAnimationFrame']
				|| window['msCancelAnimationFrame'];

			fn && fn(this._timerId);
		}
		else
		{
			clearTimeout(this._timerId);
		}

		this._timerId = null;
		this._inited = false;
	}

	/**
	 *
	 * @returns {SignalConnection}
	 */
	//	public static addTickListener(fn:Function):SignalConnection {
	//		!Ticker._inited && Ticker.init();
	//		return Ticker.ticker.connectImpl(fn, false);
	//	}

	/**
	 * Sets the target time (in milliseconds) between ticks. Default is 50 (20 FPS).
	 *
	 * Note actual time between ticks may be more than requested depending on CPU load.
	 * @method setInterval
	 * @static
	 * @param {Number} interval Time in milliseconds between ticks. Default value is 50.
	 **/
	public setInterval(interval):void
	{
		this._interval = interval;
		this._setupTick();
	}

	/**
	 * Returns the current target time between ticks, as set with {{#crossLink "Ticker/setInterval"}}{{/crossLink}}.
	 * @method getInterval
	 * @static
	 * @return {Number} The current target interval in milliseconds between tick events.
	 **/
	public getInterval():number
	{
		return this._interval;
	}

	/**
	 * Sets the target frame rate in frames per second (FPS). For example, with an interval of 40, <code>getFPS()</code>
	 * will return 25 (1000ms per second divided by 40 ms per tick = 25fps).
	 * @method setFPS
	 * @static
	 * @param {Number} value Target number of ticks broadcast per second.
	 **/
	public setFPS(value):void
	{
		this.setInterval(1000 / value);
	}

	/**
	 * Returns the target frame rate in frames per second (FPS). For example, with an interval of 40, <code>getFPS()</code>
	 * will return 25 (1000ms per second divided by 40 ms per tick = 25fps).
	 * @method getFPS
	 * @static
	 * @return {Number} The current target number of frames / ticks broadcast per second.
	 **/
	public getFPS()
	{
		return 1000 / this._interval;
	}

	/**
	 * Returns the average time spent within a tick. This can vary significantly from the value provided by getMeasuredFPS
	 * because it only measures the time spent within the tick execution stack.
	 *
	 * Example 1: With a target FPS of 20, getMeasuredFPS() returns 20fps, which indicates an average of 50ms between
	 * the end of one tick and the end of the next. However, getMeasuredTickTime() returns 15ms. This indicates that
	 * there may be up to 35ms of "idle" time between the end of one tick and the start of the next.
	 *
	 * Example 2: With a target FPS of 30, getFPS() returns 10fps, which indicates an average of 100ms between the end of
	 * one tick and the end of the next. However, getMeasuredTickTime() returns 20ms. This would indicate that something
	 * other than the tick is using ~80ms (another script, DOM rendering, etc).
	 * @method getMeasuredTickTime
	 * @static
	 * @param {Number} [ticks] The number of previous ticks over which to measure the average time spent in a tick.
	 * Defaults to the number of ticks per second. To get only the last tick's time, pass in 1.
	 * @return {Number} The average time spent in a tick in milliseconds.
	 **/
	public getMeasuredTickTime(ticks):number
	{
		var ttl = 0, times = this._tickTimes;
		if(times.length < 1)
		{
			return -1;
		}

		// by default, calculate average for the past ~1 second:
		ticks = Math.min(times.length, ticks || (this.getFPS() | 0));
		for(var i = 0; i < ticks; i++)
		{
			ttl += times[i];
		}
		return ttl / ticks;
	}

	/**
	 * Returns the actual frames / ticks per second.
	 * @method getMeasuredFPS
	 * @static
	 * @param {Number} [ticks] The number of previous ticks over which to measure the actual frames / ticks per second.
	 * Defaults to the number of ticks per second.
	 * @return {Number} The actual frames / ticks per second. Depending on performance, this may differ
	 * from the target frames per second.
	 **/
	public getMeasuredFPS(ticks:number)
	{
		var times = this._times;
		if(times.length < 2)
		{
			return -1;
		}

		// by default, calculate fps for the past ~1 second:
		ticks = Math.min(times.length - 1, ticks || (this.getFPS() | 0));
		return 1000 / ((times[0] - times[ticks]) / ticks);
	}

	/**
	 * Changes the "paused" state of the Ticker, which can be retrieved by the {{#crossLink "Ticker/getPaused"}}{{/crossLink}}
	 * method, and is passed as the "paused" property of the <code>tick</code> event. When the ticker is paused, all
	 * listeners will still receive a tick event, but the <code>paused</code> property will be false.
	 *
	 * Note that in EaselJS v0.5.0 and earlier, "pauseable" listeners would <strong>not</strong> receive the tick
	 * callback when Ticker was paused. This is no longer the case.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      createjs.Ticker.setPaused(true);
	 *      function handleTick(event) {
	 *          console.log("Paused:", event.paused, createjs.Ticker.getPaused());
	 *      }
	 *
	 * @method setPaused
	 * @static
	 * @param {Boolean} value Indicates whether to pause (true) or unpause (false) Ticker.
	 **/
	public setPaused(value:boolean)
	{
		this._paused = value;
	}

	/**
	 * Returns a boolean indicating whether Ticker is currently paused, as set with {{#crossLink "Ticker/setPaused"}}{{/crossLink}}.
	 * When the ticker is paused, all listeners will still receive a tick event, but this value will be false.
	 *
	 * Note that in EaselJS v0.5.0 and earlier, "pauseable" listeners would <strong>not</strong> receive the tick
	 * callback when Ticker was paused. This is no longer the case.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      createjs.Ticker.setPaused(true);
	 *      function handleTick(event) {
	 *          console.log("Paused:", createjs.Ticker.getPaused());
	 *      }
	 *
	 * @method getPaused
	 * @static
	 * @return {Boolean} Whether the Ticker is currently paused.
	 **/
	public getPaused()
	{
		return this._paused;
	}

	/**
	 * Returns the number of milliseconds that have elapsed since Ticker was initialized via {{#crossLink "Ticker/init"}}.
	 * Returns -1 if Ticker has not been initialized. For example, you could use
	 * this in a time synchronized animation to determine the exact amount of time that has elapsed.
	 * @method getTime
	 * @static
	 * @param {Boolean} [runTime=false] If true only time elapsed while Ticker was not paused will be returned.
	 * If false, the value returned will be total time elapsed since the first tick event listener was added.
	 * @return {Number} Number of milliseconds that have elapsed since Ticker was initialized or -1.
	 **/
	public getTime(runTime:boolean = false)
	{
		return this._startTime ? Ticker._getTime() - this._startTime - (runTime ? this._pausedTime : 0) : -1;
	}

	/**
	 * Similar to getTime(), but returns the time included with the current (or most recent) tick event object.
	 * @method getEventTime
	 * @param runTime {Boolean} [runTime=false] If true, the runTime property will be returned instead of time.
	 * @returns {number} The time or runTime property from the most recent tick event or -1.
	 */
	public getEventTime(runTime:boolean = false)
	{
		return this._startTime ? (this._lastTime || this._startTime) - (runTime ? this._pausedTime : 0) : -1;
	}

	/**
	 * Returns the number of ticks that have been broadcast by Ticker.
	 * @method getTicks
	 * @static
	 * @param {Boolean} pauseable Indicates whether to include ticks that would have been broadcast
	 * while Ticker was paused. If true only tick events broadcast while Ticker is not paused will be returned.
	 * If false, tick events that would have been broadcast while Ticker was paused will be included in the return
	 * value. The default value is false.
	 * @return {Number} of ticks that have been broadcast.
	 **/
	public getTicks(pauseable:boolean)
	{
		return this._ticks - (pauseable ? this._pausedTicks : 0);
	}

	// private static methods:
	/**
	 * @method _handleSynch
	 * @static
	 * @protected
	 **/
	public _handleSynch()
	{
		var time = Ticker._getTime() - this._startTime;
		this._timerId = null;
		this._setupTick();

		// run if enough time has elapsed, with a little bit of flexibility to be early:
		if(time - this._lastTime >= (this._interval - 1) * 0.97)
		{
			this._tick();
		}
	}

	/**
	 * @method _handleRAF
	 * @static
	 * @protected
	 **/
	public _handleRAF()
	{
		this._timerId = null;
		this._setupTick();
		this._tick();
	}

	/**
	 * @method _handleTimeout
	 * @static
	 * @protected
	 **/
	public _handleTimeout()
	{
		this._timerId = null;
		this._setupTick();
		this._tick();
	}

	/**
	 * @method _setupTick
	 * @static
	 * @protected
	 **/
	public _setupTick()
	{
		if(this._timerId < 0)
		{
			return;
		} // avoid duplicates

		var mode = this.timingMode;
		if(mode == Ticker.TIMINGMODE_RAFSYNCHED || mode == Ticker.TIMINGMODE_RAF)
		{
			var fn = window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'] || window['oRequestAnimationFrame'] || window['msRequestAnimationFrame'];
			if(fn)
			{
				this._timerId = fn(mode == Ticker.TIMINGMODE_RAF ? this._handleRAF : this._handleSynch);
				this._raf = true;
				return;
			}
		}

		this._raf = false;
		this._timerId = setTimeout(this._handleTimeout, this._interval);
	}

	/**
	 * @method _tick
	 * @static
	 * @protected
	 **/
	public _tick()
	{
		var time = Ticker._getTime() - this._startTime;
		var elapsedTime = time - this._lastTime;
		var paused = this._paused;

		this._ticks++;
		if(paused)
		{
			this._pausedTicks++;
			this._pausedTime += elapsedTime;
		}
		this._lastTime = time;

		if(this.tickSignal.hasListeners())
		{
			var maxDelta = Ticker.maxDelta;
			var event = new TimeEvent(
				"tick",
				(maxDelta && elapsedTime > maxDelta) ? maxDelta : elapsedTime,
				paused,
				time,
				time - this._pausedTime
			);

			this.tickSignal.emit(event);
		}

		this._tickTimes.unshift(Ticker._getTime() - time);
		while(this._tickTimes.length > 100)
		{
			this._tickTimes.pop();
		}

		this._times.unshift(time);
		while(this._times.length > 100)
		{
			this._times.pop();
		}
	}
}

export = Ticker;
