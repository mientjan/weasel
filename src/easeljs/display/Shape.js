/// <reference path="./DisplayObject.ts" />
/// <reference path="./Graphics.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*
* Shape
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
/**
* @module EaselJS
*/
var createts;
(function (createts) {
    var Shape = (function (_super) {
        __extends(Shape, _super);
        /**
        * Initialization method.
        * @method initialize
        * @param {Graphics} graphics
        * @protected
        **/
        function Shape(graphics) {
            _super.call(this);

            this.graphics = graphics ? graphics : new createts.Graphics();
        }
        /**
        * Returns true or false indicating whether the Shape would be visible if drawn to a canvas.
        * This does not account for whether it would be visible within the boundaries of the stage.
        * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
        * @method isVisible
        * @return {Boolean} Boolean indicating whether the Shape would be visible if drawn to a canvas
        **/
        Shape.prototype.isVisible = function () {
            var hasContent = this.cacheCanvas || (this.graphics && !this.graphics.isEmpty());
            return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
        };

        /**
        * Draws the Shape into the specified context ignoring its visible, alpha, shadow, and transform. Returns true if
        * the draw was handled (useful for overriding functionality).
        *
        * <i>NOTE: This method is mainly for internal use, though it may be useful for advanced uses.</i>
        * @method draw
        * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
        * @param {Boolean} [ignoreCache=false] Indicates whether the draw operation should ignore any current cache. For example,
        * used for drawing the cache (to prevent it from simply drawing an existing cache back into itself).
        * @return {Boolean}
        **/
        Shape.prototype.draw = function (ctx, ignoreCache) {
            if (_super.prototype.draw.call(this, ctx, ignoreCache)) {
                return true;
            }
            this.graphics.draw(ctx, this);
            return true;
        };

        /**
        * Returns a clone of this Shape. Some properties that are specific to this instance's current context are reverted to
        * their defaults (for example .parent).
        * @method clone
        * @param {Boolean} recursive If true, this Shape's {{#crossLink "Graphics"}}{{/crossLink}} instance will also be
        * cloned. If false, the Graphics instance will be shared with the new Shape.
        **/
        Shape.prototype.clone = function (recursive) {
            var o = new Shape((recursive && this.graphics) ? this.graphics.clone() : this.graphics);
            this.cloneProps(o);
            return o;
        };

        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {String} a string representation of the instance.
        **/
        Shape.prototype.toString = function () {
            return "[Shape ()]";
        };
        return Shape;
    })(createts.DisplayObject);
})(createts || (createts = {}));
