import EventDispatcher from "../util/event/EventDispatcher";
//import Ticker from "../createts/util/Ticker";
import Ease from "../tweents/Ease";
import Interval from "../util/Interval";
import IHashMap from "../interface/IHashMap";



/*
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

/**
 * The TweenJS Javascript library provides a simple but powerful tweening interface. It supports tweening of both
 * numeric object properties & CSS style properties, and allows you to chain tweens and actions together to create
 * complex sequences.
 *
 * <h4>Simple Tween</h4>
 * This tween will tween the target's alpha property from 0 to 1 for 1s then call the <code>handleComplete</code> function.
 *
 *        target.alpha = 0;
 *        createjs.Tween.get(target).to({alpha:1}, 1000).call(handleComplete);
 *        function handleComplete() {
 *	    	//Tween complete
 *	    }
 *
 * <strong>Arguments and Scope</strong>
 * Tween also supports a `call()` with arguments and/or a scope. If no scope is passed, then the function is called
 * anonymously (normal JavaScript behaviour). The scope is useful for maintaining scope when doing object-oriented
 * style development.
 *
 *      createjs.Tween.get(target).to({alpha:0})
 *          .call(handleComplete, [argument1, argument2], this);
 *
 * <h4>Chainable Tween</h4>
 * This tween will wait 0.5s, tween the target's alpha property to 0 over 1s, set it's visible to false, then call the
 * <code>handleComplete</code> function.
 *
 *        target.alpha = 1;
 *        createjs.Tween.get(target).wait(500).to({alpha:0, visible:false}, 1000).call(handleComplete);
 *        function handleComplete() {
 *	    	//Tween complete
 *	    }
 *
 * <h4>Browser Support</h4>
 * TweenJS will work in all browsers.
 *
 * @module TweenJS
 * @main TweenJS
 */




// constructor
/**
 * A Tween instance tweens properties for a single target. Instance methods can be chained for easy construction and sequencing:
 *
 * <h4>Example</h4>
 *
 *      target.alpha = 1;
 *        createjs.Tween.get(target)
 *             .wait(500)
 *             .to({alpha:0, visible:false}, 1000)
 *             .call(handleComplete);
 *        function handleComplete() {
	 *	    	//Tween complete
	 *	    }
 *
 * Multiple tweens can point to the same instance, however if they affect the same properties there could be unexpected
 * behaviour. To stop all tweens on an object, use {{#crossLink "Tween/removeTweens"}}{{/crossLink}} or pass `override:true`
 * in the props argument.
 *
 *      createjs.Tween.get(target, {override:true}).to({x:100});
 *
 * Subscribe to the {{#crossLink "Tween/change:event"}}{{/crossLink}} event to get notified when a property of the
 * target is changed.
 *
 *      createjs.Tween.get(target, {override:true}).to({x:100}).addEventListener("change", handleChange);
 *      function handleChange(event) {
	 *          // The tween changed.
	 *      }
 *
 * See the Tween {{#crossLink "Tween/get"}}{{/crossLink}} method for additional param documentation.
 * @class Tween
 * @param {Object} target The target object that will have its properties tweened.
 * @param {Object} [props] The configuration properties to apply to this tween instance (ex. `{loop:true, paused:true}`.
 * All properties default to false. Supported props are:<UL>
 *    <LI> loop: sets the loop property on this tween.</LI>
 *    <LI> useTicks: uses ticks for all durations instead of milliseconds.</LI>
 *    <LI> ignoreGlobalPause: sets the {{#crossLink "Tween/ignoreGlobalPause:property"}}{{/crossLink}} property on this tween.</LI>
 *    <LI> override: if true, `Tween.removeTweens(target)` will be called to remove any other tweens with the same target.
 *    <LI> paused: indicates whether to start the tween paused.</LI>
 *    <LI> position: indicates the initial position for this tween.</LI>
 *    <LI> onChange: specifies a listener for the "change" event.</LI>
 * </UL>
 * @param {Object} [pluginData] An object containing data for use by installed plugins. See individual
 * plugins' documentation for details.
 * @extends EventDispatcher
 * @constructor
 */
class Tween extends EventDispatcher
{

	public static _inited = false;
	public static interval:Interval = null;

	// static properties
	/**
	 * Constant defining the none actionsMode for use with setPosition.
	 * @property NONE
	 * @type Number
	 * @default 0
	 * @static
	 */
	public static NONE = 0;

	/**
	 * Constant defining the loop actionsMode for use with setPosition.
	 * @property LOOP
	 * @type Number
	 * @default 1
	 * @static
	 */
	public static LOOP = 1;

	/**
	 * Constant defining the reverse actionsMode for use with setPosition.
	 * @property REVERSE
	 * @type Number
	 * @default 2
	 * @static
	 */
	public static REVERSE = 2;

	/**
	 * Constant returned by plugins to tell the tween not to use default assignment.
	 * @property IGNORE
	 * @type Object
	 * @static
	 */
	public static IGNORE:IHashMap<any> = {};

	/**
	 * @property _listeners
	 * @type Array[Tween]
	 * @static
	 * @protected
	 */
	public static _tweens:Array<Tween> = [];

	/**
	 * @property _plugins
	 * @type Object
	 * @static
	 * @protected
	 */
	public static _plugins:IHashMap<any> = {};

	public static start():void
	{
		if(!Tween.interval ){
			Tween.interval = new Interval(60);
		}

		Tween.interval.attach(this.onTick)
	}

	public static stop():void
	{
		if(Tween.interval){
			Tween.interval.destruct();
			Tween.interval = null;
		}
	}

	// static methods
	/**
	 * Returns a new tween instance. This is functionally identical to using "new Tween(...)", but looks cleaner
	 * with the chained syntax of TweenJS.
	 * <h4>Example</h4>
	 *
	 *        var tween = createjs.Tween.get(target);
	 *
	 * @method get
	 * @param {Object} target The target object that will have its properties tweened.
	 * @param {Object} [props] The configuration properties to apply to this tween instance (ex. `{loop:true, paused:true}`).
	 * All properties default to `false`. Supported props are:
	 * <UL>
	 *    <LI> loop: sets the loop property on this tween.</LI>
	 *    <LI> useTicks: uses ticks for all durations instead of milliseconds.</LI>
	 *    <LI> ignoreGlobalPause: sets the {{#crossLink "Tween/ignoreGlobalPause:property"}}{{/crossLink}} property on
	 *    this tween.</LI>
	 *    <LI> override: if true, `createjs.Tween.removeTweens(target)` will be called to remove any other tweens with
	 *    the same target.
	 *    <LI> paused: indicates whether to start the tween paused.</LI>
	 *    <LI> position: indicates the initial position for this tween.</LI>
	 *    <LI> onChange: specifies a listener for the {{#crossLink "Tween/change:event"}}{{/crossLink}} event.</LI>
	 * </UL>
	 * @param {Object} [pluginData] An object containing data for use by installed plugins. See individual plugins'
	 * documentation for details.
	 * @param {Boolean} [override=false] If true, any previous tweens on the same target will be removed. This is the
	 * same as calling `Tween.removeTweens(target)`.
	 * @return {Tween} A reference to the created tween. Additional chained tweens, method calls, or callbacks can be
	 * applied to the returned tween instance.
	 * @static
	 */
	public static get(target, props?, pluginData?, override?):Tween
	{
		if(override)
		{
			Tween.removeTweens(target);
		}
		return new Tween(target, props, pluginData);
	}

	/**
	 * Advances all tweens. This typically uses the {{#crossLink "Ticker"}}{{/crossLink}} class, but you can call it
	 * manually if you prefer to use your own "heartbeat" implementation.
	 * @method tick
	 * @param {Number} delta The change in time in milliseconds since the last tick. Required unless all tweens have
	 * `useTicks` set to true.
	 * @param {Boolean} paused Indicates whether a global pause is in effect. Tweens with {{#crossLink "Tween/ignoreGlobalPause:property"}}{{/crossLink}}
	 * will ignore this, but all others will pause if this is `true`.
	 * @static
	 */
	public static onTick = (delta:number) =>
	{
		var tweens = Tween._tweens.slice(); // to avoid race conditions.
		for(var i = tweens.length - 1; i >= 0; i--)
		{
			var tween = tweens[i];
			if(tween._paused)
			{
				continue;
			}

			tween.onTick(tween._useTicks ? 1 : delta);
		}
	}

	/**
	 * Handle events that result from Tween being used as an event handler. This is included to allow Tween to handle
	 * {{#crossLink "Ticker/tick:event"}}{{/crossLink}} events from the createjs {{#crossLink "Ticker"}}{{/crossLink}}.
	 * No other events are handled in Tween.
	 * @method handleEvent
	 * @param {Object} event An event object passed in by the {{#crossLink "EventDispatcher"}}{{/crossLink}}. Will
	 * usually be of type "tick".
	 * @private
	 * @static
	 * @since 0.4.2
	 */
	//public static handleEvent(event)
	//{
	//	if(event.type == "tick")
	//	{
	//		this.tick(event.delta, event.paused);
	//	}
	//}

	/**
	 * Removes all existing tweens for a target. This is called automatically by new tweens if the `override`
	 * property is `true`.
	 * @method removeTweens
	 * @param {Object} target The target object to remove existing tweens from.
	 * @static
	 */
	public static removeTweens(target)
	{
		if(!target.tweenjs_count)
		{
			return;
		}
		var tweens = Tween._tweens;
		for(var i = tweens.length - 1; i >= 0; i--)
		{
			var tween = tweens[i];
			if(tween._target == target)
			{
				tween._paused = true;
				tweens.splice(i, 1);
			}
		}
		target.tweenjs_count = 0;
	}

	/**
	 * Stop and remove all existing tweens.
	 * @method removeAllTweens
	 * @static
	 * @since 0.4.1
	 */
	public static removeAllTweens()
	{
		var tweens = Tween._tweens;
		for(var i = 0, l = tweens.length; i < l; i++)
		{
			var tween = tweens[i];
			tween._paused = true;
			tween.target && (tween.target.tweenjs_count = 0);
		}
		tweens.length = 0;
	}

	/**
	 * Indicates whether there are any active tweens (and how many) on the target object (if specified) or in general.
	 * @method hasActiveTweens
	 * @param {Object} [target] The target to check for active tweens. If not specified, the return value will indicate
	 * if there are any active tweens on any target.
	 * @return {Boolean} If there are active tweens.
	 * @static
	 */
	public static hasActiveTweens(target)
	{
		if(target)
		{
			return target.tweenjs_count != null && !!target.tweenjs_count;
		}
		return Tween._tweens && !!Tween._tweens.length;
	}

	/**
	 * Installs a plugin, which can modify how certain properties are handled when tweened. See the {{#crossLink "CSSPlugin"}}{{/crossLink}}
	 * for an example of how to write TweenJS plugins.
	 * @method installPlugin
	 * @static
	 * @param {Object} plugin The plugin class to install
	 * @param {Array} properties An array of properties that the plugin will handle.
	 */
	public static installPlugin(plugin, properties)
	{
		var priority = plugin.priority;
		if(priority == null)
		{
			plugin.priority = priority = 0;
		}
		for(var i = 0, l = properties.length, p = Tween._plugins; i < l; i++)
		{
			var n = properties[i];
			if(!p[n])
			{
				p[n] = [plugin];
			}
			else
			{
				var arr = p[n];
				for(var j = 0, jl = arr.length; j < jl; j++)
				{
					if(priority < arr[j].priority)
					{
						break;
					}
				}
				p[n].splice(j, 0, plugin);
			}
		}
	}

	/**
	 * Registers or unregisters a tween with the ticking system.
	 * @method _register
	 * @param {Tween} tween The tween instance to register or unregister.
	 * @param {Boolean} value If `true`, the tween is registered. If `false` the tween is unregistered.
	 * @static
	 * @protected
	 */
	public static _register(tween, value)
	{
		var target = tween._target;
		var tweens = Tween._tweens;
		if(value && !tween._registered)
		{
			// TODO: this approach might fail if a dev is using sealed objects in ES5
			if(target)
			{
				target.tweenjs_count = target.tweenjs_count ? target.tweenjs_count + 1 : 1;
			}
			tweens.push(tween);
			if(!Tween._inited)
			{
				Tween.start();
				Tween._inited = true;
			}
		}
		else if(!value && tween._registered)
		{
			if(target)
			{
				target.tweenjs_count--;
			}
			var i = tweens.length;
			while(i--)
			{
				if(tweens[i] == tween)
				{
					tweens.splice(i, 1);
					break;
				}
			}
		}
		tween._registered = value;
	}

	// public properties:
	/**
	 * Causes this tween to continue playing when a global pause is active. For example, if TweenJS is using {{#crossLink "Ticker"}}{{/crossLink}},
	 * then setting this to true (the default) will cause this tween to be paused when <code>Ticker.setPaused(true)</code>
	 * is called. See the Tween {{#crossLink "Tween/tick"}}{{/crossLink}} method for more info. Can be set via the props
	 * parameter.
	 * @property ignoreGlobalPause
	 * @type Boolean
	 * @default false
	 */
	ignoreGlobalPause = false;

	/**
	 * If true, the tween will loop when it reaches the end. Can be set via the props param.
	 * @property loop
	 * @type {Boolean}
	 * @default false
	 */
	loop = false;

	/**
	 * Specifies the total duration of this tween in milliseconds (or ticks if useTicks is true).
	 * This value is automatically updated as you modify the tween. Changing it directly could result in unexpected
	 * behaviour.
	 * @property duration
	 * @type {Number}
	 * @default 0
	 * @readonly
	 */
	duration = 0;

	/**
	 * Allows you to specify data that will be used by installed plugins. Each plugin uses this differently, but in general
	 * you specify data by setting it to a property of pluginData with the same name as the plugin class.
	 * @example
	 *    myTween.pluginData.PluginClassName = data;
	 * <br/>
	 * Also, most plugins support a property to enable or disable them. This is typically the plugin class name followed by "_enabled".<br/>
	 * @example
	 *    myTween.pluginData.PluginClassName_enabled = false;<br/>
	 * <br/>
	 * Some plugins also store instance data in this object, usually in a property named _PluginClassName.
	 * See the documentation for individual plugins for more details.
	 * @property pluginData
	 * @type {Object}
	 */
	pluginData;

	/**
	 * The target of this tween. This is the object on which the tweened properties will be changed. Changing
	 * this property after the tween is created will not have any effect.
	 * @property target
	 * @type {Object}
	 * @readonly
	 */
	target = null;

	/**
	 * The current normalized position of the tween. This will always be a value between 0 and duration.
	 * Changing this property directly will have no effect.
	 * @property position
	 * @type {Object}
	 * @readonly
	 */
	position = null;

	/**
	 * Indicates the tween's current position is within a passive wait.
	 * @property passive
	 * @type {Boolean}
	 * @default false
	 * @readonly
	 **/
	passive = false;

	// private properties:
	/**
	 * @property _paused
	 * @type {Boolean}
	 * @default false
	 * @protected
	 */
	_paused = false;

	/**
	 * @property _curQueueProps
	 * @type {Object}
	 * @protected
	 */
	_curQueueProps:any = {};

	/**
	 * @property _initQueueProps
	 * @type {Object}
	 * @protected
	 */
	_initQueueProps = {};

	/**
	 * @property _steps
	 * @type {Array}
	 * @protected
	 */
	_steps = [];

	/**
	 * @property _actions
	 * @type {Array}
	 * @protected
	 */
	_actions = [];

	/**
	 * Raw position.
	 * @property _prevPosition
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	_prevPosition = 0;

	/**
	 * The position within the current step.
	 * @property _stepPosition
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	_stepPosition = 0; // this is needed by MovieClip.

	/**
	 * Normalized position.
	 * @property _prevPos
	 * @type {Number}
	 * @default -1
	 * @protected
	 */
	_prevPos = -1;

	/**
	 * @property _target
	 * @type {Object}
	 * @protected
	 */
	_target = null;

	/**
	 * @property _useTicks
	 * @type {Boolean}
	 * @default false
	 * @protected
	 */
	_useTicks = false;

	/**
	 * @property _inited
	 * @type {boolean}
	 * @default false
	 * @protected
	 */
	_inited = false;

	/**
	 * Indicates whether the tween is currently registered with Tween.
	 * @property _registered
	 * @type {boolean}
	 * @default false
	 * @protected
	 */
	_registered = false;

	constructor(target, props?, pluginData = {})
	{
		super();

		this._target = target;
		this.target = target;
		this.pluginData = pluginData;

		if(props)
		{
			this._useTicks = props.useTicks;
			this.ignoreGlobalPause = props.ignoreGlobalPause;
			this.loop = props.loop;
			props.onChange && this.addEventListener("change", props.onChange);
			if(props.override)
			{
				Tween.removeTweens(target);
			}
		}
		if(props && props.paused)
		{
			this._paused = true;
		}
		else
		{
			Tween._register(this, true);
		}

		if(props && props.position != null)
		{
			this.setPosition(props.position, Tween.NONE);
		}

	}


	/**
	 * Queues a wait (essentially an empty tween).
	 * <h4>Example</h4>
	 *
	 *        //This tween will wait 1s before alpha is faded to 0.
	 *        createjs.Tween.get(target).wait(1000).to({alpha:0}, 1000);
	 *
	 * @method wait
	 * @param {Number} duration The duration of the wait in milliseconds (or in ticks if `useTicks` is true).
	 * @param {Boolean} [passive] Tween properties will not be updated during a passive wait. This
	 * is mostly useful for use with {{#crossLink "Timeline"}}{{/crossLink}} instances that contain multiple tweens
	 * affecting the same target at different times.
	 * @return {Tween} This tween instance (for chaining calls).
	 **/
	wait(duration, passive = false)
	{
		if(duration == null || duration <= 0)
		{
			return this;
		}


		var o = this._cloneProps(this._curQueueProps);

		return this._addStep({d: duration, p0: o, e: Ease.linear, p1: o, v: passive});
	}

	/**
	 * Queues a tween from the current values to the target properties. Set duration to 0 to jump to these value.
	 * Numeric properties will be tweened from their current value in the tween to the target value. Non-numeric
	 * properties will be set at the end of the specified duration.
	 * <h4>Example</h4>
	 *
	 *        createjs.Tween.get(target).to({alpha:0}, 1000);
	 *
	 * @method to
	 * @param {Object} props An object specifying property target values for this tween (Ex. `{x:300}` would tween the x
	 * property of the target to 300).
	 * @param {Number} [duration=0] The duration of the wait in milliseconds (or in ticks if `useTicks` is true).
	 * @param {Function} [ease="linear"] The easing function to use for this tween. See the {{#crossLink "Ease"}}{{/crossLink}}
	 * class for a list of built-in ease functions.
	 * @return {Tween} This tween instance (for chaining calls).
	 */
	to(props:any, duration?, ease?)
	{
		if(isNaN(duration) || duration < 0)
		{
			duration = 0;
		}

		return this._addStep({
			d: duration || 0,
			p0: this._cloneProps(this._curQueueProps),
			e: ease,
			p1: this._cloneProps(this._appendQueueProps(props))
		});
	}

	/**
	 * Queues an action to call the specified function.
	 * <h4>Example</h4>
	 *
	 *    //would call myFunction() after 1 second.
	 *    myTween.wait(1000).call(myFunction);
	 *
	 * @method call
	 * @param {Function} callback The function to call.
	 * @param {Array} [params]. The parameters to call the function with. If this is omitted, then the function
	 *      will be called with a single param pointing to this tween.
	 * @param {Object} [scope]. The scope to call the function in. If omitted, it will be called in the target's
	 *      scope.
	 * @return {Tween} This tween instance (for chaining calls).
	 */
	call(callback, params?, scope?)
	{
		return this._addAction({f: callback, p: params ? params : [this], o: scope ? scope : this._target});
	}

	// TODO: add clarification between this and a 0 duration .to:
	/**
	 * Queues an action to set the specified props on the specified target. If target is null, it will use this tween's
	 * target.
	 * <h4>Example</h4>
	 *
	 *        myTween.wait(1000).set({visible:false},foo);
	 *
	 * @method set
	 * @param {Object} props The properties to set (ex. `{visible:false}`).
	 * @param {Object} [target] The target to set the properties on. If omitted, they will be set on the tween's target.
	 * @return {Tween} This tween instance (for chaining calls).
	 */
	set(props, target)
	{
		return this._addAction({f: this._set, o: this, p: [props, target ? target : this._target]});
	}

	/**
	 * Queues an action to play (unpause) the specified tween. This enables you to sequence multiple tweens.
	 * <h4>Example</h4>
	 *
	 *        myTween.to({x:100},500).play(otherTween);
	 *
	 * @method play
	 * @param {Tween} tween The tween to play.
	 * @return {Tween} This tween instance (for chaining calls).
	 */
	play(tween)
	{
		if(!tween)
		{
			tween = this;
		}
		return this.call(tween.setPaused, [false], tween);
	}

	/**
	 * Queues an action to pause the specified tween.
	 * @method pause
	 * @param {Tween} tween The tween to pause. If null, it pauses this tween.
	 * @return {Tween} This tween instance (for chaining calls)
	 */
	pause(tween)
	{
		if(!tween)
		{
			tween = this;
		}
		return this.call(tween.setPaused, [true], tween);
	}

	/**
	 * Advances the tween to a specified position.
	 * @method setPosition
	 * @param {Number} value The position to seek to in milliseconds (or ticks if useTicks is true).
	 * @param {Number} [actionsMode=1] Specifies how actions are handled (ie. call, set, play, pause):
	 * <ul>
	 *      <li>{{#crossLink "Tween/NONE:property"}}{{/crossLink}} (0) - run no actions.</li>
	 *      <li>{{#crossLink "Tween/LOOP:property"}}{{/crossLink}} (1) - if new position is less than old, then run all
	 *      actions between old and duration, then all actions between 0 and new.</li>
	 *      <li>{{#crossLink "Tween/REVERSE:property"}}{{/crossLink}} (2) - if new position is less than old, run all
	 *      actions between them in reverse.</li>
	 * </ul>
	 * @return {Boolean} Returns `true` if the tween is complete (ie. the full tween has run & {{#crossLink "Tween/loop:property"}}{{/crossLink}}
	 * is `false`).
	 */
	setPosition(value, actionsMode?)
	{
		if(value < 0)
		{
			value = 0;
		}
		if(actionsMode == null)
		{
			actionsMode = 1;
		}

		// normalize position:
		var t = value;
		var end = false;
		if(t >= this.duration)
		{
			if(this.loop)
			{
				t = t % this.duration;
			}
			else
			{
				t = this.duration;
				end = true;
			}
		}
		if(t == this._prevPos)
		{
			return end;
		}


		var prevPos = this._prevPos;
		this.position = this._prevPos = t; // set this in advance in case an action modifies position.
		this._prevPosition = value;

		// handle tweens:
		if(this._target)
		{
			if(end)
			{
				// addresses problems with an ending zero length step.
				this._updateTargetProps(null, 1);
			}
			else if(this._steps.length > 0)
			{
				// find our new tween index:
				for(var i = 0, l = this._steps.length; i < l; i++)
				{
					if(this._steps[i].t > t)
					{
						break;
					}
				}
				var step = this._steps[i - 1];
				this._updateTargetProps(step, (this._stepPosition = t - step.t) / step.d);
			}
		}

		// run actions:
		if(actionsMode != 0 && this._actions.length > 0)
		{
			if(this._useTicks)
			{
				// only run the actions we landed on.
				this._runActions(t, t);
			}
			else if(actionsMode == 1 && t < prevPos)
			{
				if(prevPos != this.duration)
				{
					this._runActions(prevPos, this.duration);
				}
				this._runActions(0, t, true);
			}
			else
			{
				this._runActions(prevPos, t);
			}
		}

		if(end)
		{
			this.setPaused(true);
		}

		this.dispatchEvent("change");
		return end;
	}

	/**
	 * Advances this tween by the specified amount of time in milliseconds (or ticks if`useTicks` is `true`).
	 * This is normally called automatically by the Tween engine (via {{#crossLink "Tween/tick"}}{{/crossLink}}), but is
	 * exposed for advanced uses.
	 * @method tick
	 * @param {Number} delta The time to advance in milliseconds (or ticks if `useTicks` is `true`).
	 */
	public onTick(delta)
	{
		if(this._paused)
		{
			return;
		}

		this.setPosition(this._prevPosition + delta);
	}

	/**
	 * Pauses or plays this tween.
	 * @method setPaused
	 * @param {Boolean} [value=true] Indicates whether the tween should be paused (`true`) or played (`false`).
	 * @return {Tween} This tween instance (for chaining calls)
	 */
	public setPaused(value:boolean):Tween
	{
		if(this._paused === !!value)
		{
			return this;
		}
		this._paused = !!value;
		Tween._register(this, !value);
		return this;
	}

	// tiny api (primarily for tool output):
	public w = this.wait;
	public t = this.to;
	public c = this.call;
	public s = this.set;

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 */
	public toString():string
	{
		return "[Tween]";
	}

	/**
	 * @method clone
	 * @protected
	 */
	public clone()
	{
		throw("Tween can not be cloned.")
	}

	// private methods:
	/**
	 * @method _updateTargetProps
	 * @param {Object} step
	 * @param {Number} ratio
	 * @protected
	 */
	_updateTargetProps(step, ratio)
	{
		var p0, p1, v, v0, v1, arr;
		if(!step && ratio == 1)
		{
			// GDS: when does this run? Just at the very end? Shouldn't.
			this.passive = false;
			p0 = p1 = this._curQueueProps;
		}
		else
		{
			this.passive = !!step.v;
			if(this.passive)
			{
				return;
			} // don't update props.
			// apply ease to ratio.
			if(step.e)
			{
				ratio = step.e(ratio, 0, 1, 1);
			}
			p0 = step.p0;
			p1 = step.p1;
		}

		for(var n in this._initQueueProps)
		{
			if((v0 = p0[n]) == null)
			{
				p0[n] = v0 = this._initQueueProps[n];
			}
			if((v1 = p1[n]) == null)
			{
				p1[n] = v1 = v0;
			}
			if(v0 == v1 || ratio == 0 || ratio == 1 || (typeof(v0) != "number"))
			{
				// no interpolation - either at start, end, values don't change, or the value is non-numeric.
				v = ratio == 1 ? v1 : v0;
			}
			else
			{
				v = v0 + (v1 - v0) * ratio;
			}

			var ignore = false;
			if(arr = Tween._plugins[n])
			{
				for(var i = 0, l = arr.length; i < l; i++)
				{
					var v2 = arr[i].tween(this, n, v, p0, p1, ratio, !!step && p0 == p1, !step);
					if(v2 == Tween.IGNORE)
					{
						ignore = true;
					}
					else
					{
						v = v2;
					}
				}
			}
			if(!ignore)
			{
				this._target[n] = v;
			}
		}

	}

	/**
	 * @method _runActions
	 * @param {Number} startPos
	 * @param {Number} endPos
	 * @param {Boolean} includeStart
	 * @protected
	 */
	_runActions(startPos, endPos, includeStart?)
	{
		var sPos = startPos;
		var ePos = endPos;
		var i = -1;
		var j = this._actions.length;
		var k = 1;
		if(startPos > endPos)
		{
			// running backwards, flip everything:
			sPos = endPos;
			ePos = startPos;
			i = j;
			j = k = -1;
		}
		while((i += k) != j)
		{
			var action = this._actions[i];
			var pos = action.t;
			if(pos == ePos || (pos > sPos && pos < ePos) || (includeStart && pos == startPos))
			{
				action.f.apply(action.o, action.p);
			}
		}
	}

	/**
	 * @method _appendQueueProps
	 * @param {Object} o
	 * @protected
	 */
	_appendQueueProps(o)
	{
		var arr, oldValue, i, l, injectProps;
		for(var n in o)
		{
			if(this._initQueueProps[n] === undefined)
			{
				oldValue = this._target[n];

				// init plugins:
				if(arr = Tween._plugins[n])
				{
					for(i = 0, l = arr.length; i < l; i++)
					{
						oldValue = arr[i].init(this, n, oldValue);
					}
				}
				this._initQueueProps[n] = this._curQueueProps[n] = (oldValue === undefined) ? null : oldValue;
			}
			else
			{
				oldValue = this._curQueueProps[n];
			}
		}

		for(var n in o)
		{
			oldValue = this._curQueueProps[n];
			if(arr = Tween._plugins[n])
			{
				injectProps = injectProps || {};
				for(i = 0, l = arr.length; i < l; i++)
				{
					// TODO: remove the check for .step in the next version. It's here for backwards compatibility.
					if(arr[i].step)
					{
						arr[i].step(this, n, oldValue, o[n], injectProps);
					}
				}
			}
			this._curQueueProps[n] = o[n];
		}
		if(injectProps)
		{
			this._appendQueueProps(injectProps);
		}
		return this._curQueueProps;
	}

	/**
	 * @method _cloneProps
	 * @param {Object} props
	 * @protected
	 */
	_cloneProps(props)
	{
		var o = {};
		for(var n in props)
		{
			o[n] = props[n];
		}
		return o;
	}

	/**
	 * @method _addStep
	 * @param {Object} o
	 * @protected
	 */
	_addStep(o)
	{
		if(o.d > 0)
		{
			this._steps.push(o);
			o.t = this.duration;
			this.duration += o.d;
		}
		return this;
	}

	/**
	 * @method _addAction
	 * @param {Object} o
	 * @protected
	 */
	_addAction(o)
	{
		o.t = this.duration;
		this._actions.push(o);
		return this;
	}

	/**
	 * @method _set
	 * @param {Object} props
	 * @param {Object} o
	 * @protected
	 */
	_set(props, o)
	{
		for(var n in props)
		{
			o[n] = props[n];
		}
	}

}

export default Tween;