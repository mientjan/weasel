define(["require", "exports"], function (require, exports) {
    var CanvasBuffer = (function () {
        function CanvasBuffer(width, height, element) {
            if (element === void 0) { element = document.createElement('canvas'); }
            this.transparent = true;
            this.background = null;
            this.element = element;
            this.context = this.element.getContext('2d');
            this.element.width = width;
            this.element.height = height;
        }
        Object.defineProperty(CanvasBuffer.prototype, "width", {
            get: function () {
                return this.element.width;
            },
            set: function (value) {
                this.element.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CanvasBuffer.prototype, "height", {
            get: function () {
                return this.element.height;
            },
            set: function (value) {
                this.element.height = value;
            },
            enumerable: true,
            configurable: true
        });
        CanvasBuffer.prototype.draw = function (ctx) {
            ctx.drawImage(this.element, 0, 0, this.element.width, this.element.height, 0, 0, this.element.width, this.element.height);
        };
        CanvasBuffer.prototype.reset = function () {
            this.context.setTransform(1, 0, 0, 1, 0, 0);
            this.context.clearRect(0, 0, this.element.width, this.element.height);
        };
        CanvasBuffer.prototype.clear = function () {
            if (this.transparent) {
                this.context.clearRect(0, 0, this.element.width, this.element.height);
            }
            else {
                this.context.fillStyle = this.background.toString();
                this.context.fillRect(0, 0, this.width, this.height);
            }
        };
        CanvasBuffer.prototype.setSize = function (width, height) {
            this.element.width = width;
            this.element.height = height;
        };
        CanvasBuffer.prototype.destruct = function () {
            this.context = null;
            this.element = null;
        };
        return CanvasBuffer;
    })();
    exports.default = CanvasBuffer;
});
