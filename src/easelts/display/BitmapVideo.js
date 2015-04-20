/*
 * Bitmap
 *
 * Copyright (c) 2015 Mient-jan Stelling
 * Copyright (c) 2015 MediaMonksB.V
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './DisplayObject', '../enum/DisplayType'], function (require, exports, DisplayObject, DisplayType) {
    var BitmapVideo = (function (_super) {
        __extends(BitmapVideo, _super);
        /**
         * Initialization method.
         * @method initialize
         * @param {Image | HTMLCanvasElement | HTMLVideoElement | String} imageOrUri The source object or URI to an image to
         * display. This can be either an Image, Canvas, or Video object, or a string URI to an image file to load and use.
         * If it is a URI, a new Image object will be constructed and assigned to the `.image` property.
         * @protected
         **/
        /**
         * @class Bitmap
         * @constructor
         * @param {string|HTMLImageElement} imageOrUri
         * @param {string|number} width
         * @param {string|number} height
         * @param {string|number} x
         * @param {string|number} y
         * @param {string|number} regX
         * @param {string|number} regY
         */
        function BitmapVideo(videoElement, width, height, x, y, regX, regY) {
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            _super.call(this, width, height, x, y, regX, regY);
            this.type = DisplayType.BITMAP;
            this.loaded = true;
            /**
             * The image to render. This can be an Image, a Canvas, or a Video.
             * @property image
             * @type Image | HTMLCanvasElement | HTMLVideoElement
             **/
            this.video = null;
            /**
             * Specifies an area of the source image to draw. If omitted, the whole image will be drawn.
             * @property sourceRect
             * @type Rectangle
             * @default null
             */
            this.sourceRect = null;
            this.video = videoElement;
        }
        /**
         * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
         * This does not account for whether it would be visible within the boundaries of the stage.
         *
         * @method isVisible
         * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
         **/
        BitmapVideo.prototype.isVisible = function () {
            var hasContent = this.cacheCanvas || this.loaded;
            return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
        };
        /**
         * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
         * Returns true if the draw was handled (useful for overriding functionality).
         *
         * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
         * @method draw
         * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
         * @param {Boolean} [ignoreCache=false] Indicates whether the draw operation should ignore any current cache.
         * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
         * into itself).
         * @return {Boolean}
         **/
        BitmapVideo.prototype.draw = function (ctx, ignoreCache) {
            if (_super.prototype.draw.call(this, ctx, ignoreCache)) {
                return true;
            }
            if (this.loaded) {
                var rect = this.sourceRect;
                if (rect) {
                    ctx.drawImage(this.video, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
                }
                else {
                    ctx.drawImage(this.video, 0, 0);
                }
            }
            return true;
        };
        BitmapVideo.prototype.getBounds = function () {
            var rect = _super.prototype.getBounds.call(this);
            if (rect) {
                return rect;
            }
            var o = this.sourceRect || this.video;
            return this.loaded ? this._rectangle.setProperies(0, 0, o.width, o.height) : null;
        };
        BitmapVideo.prototype.clone = function () {
            var o = new BitmapVideo(this.video);
            if (this.sourceRect) {
                o.sourceRect = this.sourceRect.clone();
            }
            this.cloneProps(o);
            return o;
        };
        BitmapVideo.prototype.toString = function () {
            return "[Bitmap (name=" + this.name + ")]";
        };
        BitmapVideo.EVENT_ONLOAD = 'onload';
        return BitmapVideo;
    })(DisplayObject);
    return BitmapVideo;
});
