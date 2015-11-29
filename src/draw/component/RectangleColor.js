var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../display/Shape"], function (require, exports, Shape_1) {
    var RectangleColor = (function (_super) {
        __extends(RectangleColor, _super);
        function RectangleColor(color, width, height, x, y, regX, regY) {
            if (color === void 0) { color = '#000000'; }
            if (width === void 0) { width = '100%'; }
            if (height === void 0) { height = '100%'; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            _super.call(this, void 0, width, height, x, y, regX, regY);
            this._color = color;
            this.setColor();
        }
        Object.defineProperty(RectangleColor.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (value) {
                this._color = value;
                this.setColor();
            },
            enumerable: true,
            configurable: true
        });
        RectangleColor.prototype.setColor = function (color) {
            if (color === void 0) { color = this._color; }
            this._color = color;
            this.graphics.clear().beginFill(this._color).drawRect(0, 0, this.width, this.height);
        };
        RectangleColor.prototype.onResize = function (width, height) {
            _super.prototype.onResize.call(this, width, height);
            this.setColor();
        };
        return RectangleColor;
    })(Shape_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = RectangleColor;
});
