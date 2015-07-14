

// Use polyfill for setImmediate for performance gains
var asap = (typeof setImmediate === 'function' && setImmediate) ||
	function(fn) { setTimeout(fn, 1); };

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
	return function() {
		fn.apply(thisArg, arguments);
	}
}

var isArray = Array.isArray || function(value) { return Object.prototype.toString.call(value) === "[object Array]" };

function handle(deferred) {
	var me = this;
	if (this._state === null) {
		this._deferreds.push(deferred);
		return
	}
	asap(function() {
		var cb = me._state ? deferred.onFulfilled : deferred.onRejected
		if (cb === null) {
			(me._state ? deferred.resolve : deferred.reject)(me._value);
			return;
		}
		var ret;
		try {
			ret = cb(me._value);
		}
		catch (e) {
			deferred.reject(e);
			return;
		}
		deferred.resolve(ret);
	})
}

function resolve(newValue) {
	try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
		if (newValue === this) throw new TypeError('A promise cannot be resolved with itself.');
		if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
			var then = newValue.then;
			if (typeof then === 'function') {
				doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
				return;
			}
		}
		this._state = true;
		this._value = newValue;
		finale.call(this);
	} catch (e) { reject.call(this, e); }
}

function reject(newValue) {
	this._state = false;
	this._value = newValue;
	finale.call(this);
}

function finale() {
	for (var i = 0, len = this._deferreds.length; i < len; i++) {
		handle.call(this, this._deferreds[i]);
	}
	this._deferreds = null;
}

function Handler(onFulfilled, onRejected, resolve, reject){
	this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	this.resolve = resolve;
	this.reject = reject;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, onFulfilled, onRejected) {
	var done = false;
	try {
		fn(function (value) {
			if (done) return;
			done = true;
			onFulfilled(value);
		}, function (reason) {
			if (done) return;
			done = true;
			onRejected(reason);
		})
	} catch (ex) {
		if (done) return;
		done = true;
		onRejected(ex);
	}
}

class Promise<T>
{
	public static all(
		...args:Array<
				Array<Promise<any>>|Promise<any>
			>)
	{
		//var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);
		var args = (args.length === 1 && isArray(args[0]) ? args[0] : args );

		return new Promise(function (resolve, reject)
		{
			if(args.length === 0) return resolve([]);
			var remaining = args.length;

			function res(i, val)
			{
				try
				{
					if(val && (typeof val === 'object' || typeof val === 'function'))
					{
						var then = val.then;
						if(typeof then === 'function')
						{
							then.call(val, function (val)
							{
								res(i, val)
							}, reject);
							return;
						}
					}
					args[i] = val;
					if(--remaining === 0)
					{
						resolve(args);
					}
				} catch(ex)
				{
					reject(ex);
				}
			}

			for(var i = 0; i < args.length; i++)
			{
				res(i, args[i]);
			}
		});
	}

	public static resolve(value)
	{
		if(value && typeof value === 'object' && value.constructor === Promise)
		{
			return value;
		}

		return new Promise(function (resolve)
		{
			resolve(value);
		});
	}

	public static reject(value)
	{
		return new Promise(function (resolve, reject)
		{
			reject(value);
		});
	}

	public static race(values)
	{
		return new Promise(function (resolve, reject)
		{
			for(var i = 0, len = values.length; i < len; i++)
			{
				values[i].then(resolve, reject);
			}
		});
	}

	/**
	 * Set the immediate function to execute callbacks
	 * @param fn {function} Function to execute
	 * @private
	 */
	public static _setImmediateFn(fn)
	{
		asap = fn;
	}

	private _state = null;
	private _value = null;
	private _deferreds = [];

	constructor(init: (resolve: (value?: T | Promise<T>) => void, reject: (reason?: any) => void) => void)
	{
		if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
		if (typeof init !== 'function') throw new TypeError('not a function');

		doResolve(init, bind(resolve, this), bind(reject, this))
	}

	public catch(onRejected)
	{
		return this.then(null, onRejected);
	}

	public then(onFulfilled:any, onRejected?:any)
	{
		var me = this;
		return new Promise(function (resolve, reject)
		{
			handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
		})
	}
}

export = Promise;