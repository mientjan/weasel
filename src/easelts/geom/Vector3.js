/*
 * Point
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
define(["require", "exports"], function (require, exports) {
    /**
     * @module easelts
     */
    var Vector3 = (function () {
        /**
         * X position.
         * @property x
         * @type Number
         **/
        /**
         * Y position.
         * @property y
         * @type Number
         **/
        /**
         * Initialization method. Can also be used to reinitialize the instance.
         * @method initialize
         * @param {Number} [x=0] X position.
         * @param {Number} [y=0] Y position.
         * @return {Point} This instance. Useful for chaining method calls.
         */
        function Vector3(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        /**
         * Returns a string representation of this object.
         * @method toString
         * @return {String} a string representation of the instance.
         **/
        Vector3.prototype.toString = function () {
            return "[Vector3 (x=" + this.x + " y=" + this.y + "  z=" + this.z + ")]";
        };
        return Vector3;
    })();
    return Vector3;
});
