var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Methods = require('../../util/Methods');
var ButtonBehavior = require('../../behavior/ButtonBehavior');
/**
 * @class ImageSequence
 */
var ImageButton = (function (_super) {
    __extends(ImageButton, _super);
    /**
     * idle, mouseover, mousedown, disabled
     * @param {string[]} images
     * @param {number} fps
     * @param {string|number} width
     * @param {string|number} height
     * @param {string|number} x
     * @param {string|number} y
     * @param {string|number} regX
     * @param {string|number} regY
     */
    function ImageButton(data, width, height, x, y, regX, regY) {
        var _this = this;
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (regX === void 0) { regX = 0; }
        if (regY === void 0) { regY = 0; }
        _super.call(this, data.idle, width, height, x, y, regX, regY);
        this._images = {
            idle: null,
            over: null,
            down: null,
            disabled: null
        };
        this.addBehavior(new ButtonBehavior());
        if (typeof data.idle == 'string') {
            this._images.idle = this.image;
            if (data.over)
                this._images.over = Methods.createImage(data.over);
            if (data.down)
                this._images.down = Methods.createImage(data.down);
            if (data.disabled)
                this._images.disabled = Methods.createImage(data.disabled);
        }
        else {
            this._images.idle = this.image;
            if (data.over)
                this._images.over = data.over;
            if (data.down)
                this._images.down = data.down;
            if (data.disabled)
                this._images.disabled = data.disabled;
        }
        this.addEventListener(ImageButton.EVENT_MOUSE_CLICK, function (e) {
            _this.image = _this._images.idle;
        });
        if (this._images.over) {
            this.addEventListener(ImageButton.EVENT_MOUSE_OVER, function (e) {
                _this.image = _this._images.over;
            });
        }
        if (this._images.down) {
            this.addEventListener(ImageButton.EVENT_DISABLED, function (e) {
                _this.image = _this._images.down;
            });
        }
        if (this._images.disabled) {
            this.addEventListener(ImageButton.EVENT_DISABLED, function (e) {
                _this.image = _this._images.disabled;
            });
        }
    }
    ImageButton.prototype.disable = function () {
        if (this._images.disabled) {
            this.image = this._images.disabled;
        }
    };
    ImageButton.prototype.enable = function () {
        if (this._images.idle) {
            this.image = this._images.idle;
        }
    };
    ImageButton.prototype.draw = function (ctx, ignoreCache) {
        ctx.drawImage(this.image, 0, 0);
        return true;
    };
    ImageButton.EVENT_DISABLED = 'disabled';
    return ImageButton;
})(Bitmap);
module.exports = ImageButton;
