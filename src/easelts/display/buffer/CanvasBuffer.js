define(["require", "exports", "../../geom/Rectangle"], function (require, exports, Rectangle_1) {
    var CanvasBuffer = (function () {
        function CanvasBuffer(width, height, element) {
            if (element === void 0) { element = document.createElement('canvas'); }
            this.transparent = true;
            this.background = null;
            this.element = element;
            this.context = this.element.getContext('2d');
            this.setSize(width, height);
        }
        Object.defineProperty(CanvasBuffer.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                this.element.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasBuffer.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        CanvasBuffer.prototype.draw = function (ctx) {
            var w = this._width, h = this._height;
            ctx.drawImage(this.element, 0, 0, w, h, 0, 0, w, h);
        };
        CanvasBuffer.prototype.reset = function () {
            this.context.setTransform(1, 0, 0, 1, 0, 0);
            this.context.clearRect(0, 0, this._width, this._height);
        };
        CanvasBuffer.prototype.clear = function () {
            this.context.clearRect(0, 0, this._width, this._height);
        };
        CanvasBuffer.prototype.getDataUrl = function (type, args) {
            return this.element.toDataURL(type, args);
        };
        CanvasBuffer.prototype.getImageData = function (x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = this._width; }
            if (height === void 0) { height = this._height; }
            return this.context.getImageData(x, y, width, height);
        };
        CanvasBuffer.prototype.getDrawBounds = function () {
            var width = Math.ceil(this.width);
            var height = Math.ceil(this.height);
            var pixels = this.getImageData();
            var data = pixels.data, x0 = width, y0 = height, x1 = 0, y1 = 0;
            for (var i = 3, l = data.length, p = 0; i < l; i += 4, ++p) {
                var px = p % width;
                var py = Math.floor(p / width);
                if (data[i - 3] > 0 ||
                    data[i - 2] > 0 ||
                    data[i - 1] > 0 ||
                    data[i] > 0) {
                    x0 = Math.min(x0, px);
                    y0 = Math.min(y0, py);
                    x1 = Math.max(x1, px);
                    y1 = Math.max(y1, py);
                }
            }
            return new Rectangle_1.default(x0, y0, x1 - x0, y1 - y0);
        };
        CanvasBuffer.prototype.setSize = function (width, height) {
            this.element.width = this._width = width;
            this.element.height = this._height = height;
        };
        CanvasBuffer.prototype.destruct = function () {
            this.context = null;
            this.element = null;
        };
        return CanvasBuffer;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CanvasBuffer;
});
