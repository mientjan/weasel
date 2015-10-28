define(["require", "exports"], function (require, exports) {
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
