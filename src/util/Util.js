/*
 * MIT License
 *
 * Copyright (c) 2015 easelts.
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
    var Util = (function () {
        function Util() {
        }
        Util.createCanvas = function () {
            return document.createElement('canvas');
        };
        Util.createImage = function (src, onLoad) {
            if (src === void 0) { src = null; }
            if (onLoad === void 0) { onLoad = null; }
            var img = document.createElement('img');
            if (onLoad) {
                img.onload = onLoad;
            }
            if (src) {
                img.src = src;
            }
            return img;
        };
        Util.tryCatch = function (fn, context, args) {
            try {
                return fn.apply(context, args);
            }
            catch (e) {
                var errorObject = {};
                errorObject.value = e;
                return errorObject;
            }
        };
        Util.prototype.getContextSmoothProperty = function (context) {
            if (context === void 0) { context = Util.createCanvas().getContext('2d'); }
            var smoothProperty = 'imageSmoothingEnabled';
            if (!context['imageSmoothingEnabled']) {
                if (context['webkitImageSmoothingEnabled']) {
                    smoothProperty = 'webkitImageSmoothingEnabled';
                }
                else if (context['mozImageSmoothingEnabled']) {
                    smoothProperty = 'mozImageSmoothingEnabled';
                }
                else if (context['oImageSmoothingEnabled']) {
                    smoothProperty = 'oImageSmoothingEnabled';
                }
                else if (context['msImageSmoothingEnabled']) {
                    smoothProperty = 'msImageSmoothingEnabled';
                }
            }
            return smoothProperty;
        };
        return Util;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Util;
});
