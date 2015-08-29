/*
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 *
 * requestAnimationFrame polyfill
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Erik Möller
 * Copyright (c) 2015 Paul Irish
 * Copyright (c) 2015 Tino Zijdel
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
 * The above * copyright notice and this permission notice shall be
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
define(["require", "exports", '../../createts/event/Signal1'], function (require, exports, Signal1) {
    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }());
    var FpsCollection = (function () {
        function FpsCollection(fps) {
            this.signal = new Signal1();
            this.frame = 0;
            this.time = 0;
            this.ptime = 0;
            this.accum = 0;
            this.fps = fps;
            this.mspf = 1000 / fps;
        }
        return FpsCollection;
    })();
    var Interval = (function () {
        function Interval(fps) {
            if (fps === void 0) { fps = 60; }
            this.fps = 0;
            this._connections = [];
            this._delay = -1;
            this.fps = fps;
        }
        Interval.attach = function (fps_, callback) {
            var fps = fps_ | 0;
            var list = Interval._list;
            var fc = null;
            for (var i = 0; i < list.length; i++) {
                if (list[i].fps == fps) {
                    fc = list[i];
                }
            }
            if (!fc) {
                fc = new FpsCollection(fps);
                list.push(fc);
            }
            return fc.signal.connect(callback);
        };
        Interval.start = function () {
            if (!Interval.isRunning) {
                Interval.isRunning = true;
                Interval.requestAnimationFrame(0);
            }
        };
        Interval.stop = function () {
            Interval.isRunning = false;
            cancelAnimationFrame(Interval._rafInt);
        };
        Interval.prototype.attach = function (callback) {
            this._connections.push(Interval.attach(this.fps, callback));
            Interval.start();
            return this;
        };
        Interval.prototype.getDelay = function () {
            var time = (Interval._time - this._delay);
            this._delay = Interval._time;
            return time;
        };
        Interval.prototype.destruct = function () {
            var connections = this._connections;
            while (connections.length) {
                connections.pop().dispose();
            }
        };
        Interval.isRunning = false;
        Interval._list = [];
        Interval._rafInt = -1;
        Interval._time = -1;
        Interval.requestAnimationFrame = function (timeUpdate) {
            Interval._rafInt = window.requestAnimationFrame(Interval.requestAnimationFrame);
            var prevTime = Interval._time;
            Interval._time = timeUpdate;
            var delta = timeUpdate - prevTime;
            var list = Interval._list;
            for (var i = 0; i < list.length; i++) {
                var fc = list[i];
                fc.time += delta;
                fc.accum += delta;
                if (fc.accum > fc.mspf) {
                    fc.accum -= fc.mspf;
                    fc.signal.emit(fc.time - fc.ptime);
                    fc.ptime = fc.time;
                }
            }
        };
        return Interval;
    })();
    return Interval;
});
