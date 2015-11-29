/*
 * Event
 *
 * Copyright (c) 2010 gskinner.com, inc.
 * Copyright (c) 2015 Mient-jan Stelling.
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
define(["require", "exports"], function (require, exports) {
    var Event = (function () {
        function Event(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            this.type = null;
            this.target = null;
            this.currentTarget = null;
            this.eventPhase = 0;
            this.bubbles = false;
            this.cancelable = false;
            this.timeStamp = 0;
            this.defaultPrevented = false;
            this.propagationStopped = false;
            this.immediatePropagationStopped = false;
            this.removed = false;
            this.type = type;
            this.bubbles = bubbles;
            this.cancelable = cancelable;
            this.timeStamp = (new Date()).getTime();
        }
        Event.prototype.preventDefault = function () {
            this.defaultPrevented = true;
        };
        Event.prototype.stopPropagation = function () {
            this.propagationStopped = true;
        };
        Event.prototype.stopImmediatePropagation = function () {
            this.immediatePropagationStopped = this.propagationStopped = true;
        };
        Event.prototype.remove = function () {
            this.removed = true;
        };
        Event.prototype.clone = function () {
            return new Event(this.type, this.bubbles, this.cancelable);
        };
        Event.prototype.set = function (props) {
            for (var n in props) {
                if (props.hasOwnProperty(n)) {
                    this[n] = props[n];
                }
            }
            return this;
        };
        Event.prototype.toString = function () {
            return "[Event (type=" + this.type + ")]";
        };
        return Event;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Event;
});
