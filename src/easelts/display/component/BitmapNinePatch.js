var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bitmap = require('../Bitmap');
var DisplayObject = require('../DisplayObject');
var DisplayType = require('../../enum/DisplayType');
var BitmapNinePatch = (function (_super) {
    __extends(BitmapNinePatch, _super);
    function BitmapNinePatch(patch, width, height, x, y, regX, regY) {
        if (width === void 0) { width = '100%'; }
        if (height === void 0) { height = '100%'; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (regX === void 0) { regX = 0; }
        if (regY === void 0) { regY = 0; }
        _super.call(this, width, height, x, y, regX, regY);
        this.type = 7 /* BITMAP */;
        this.loaded = false;
        this._patch = patch;
        if (!this._patch.bitmap.loaded) {
            this._patch.bitmap.addEventListener(Bitmap.EVENT_ONLOAD, this.onLoad.bind(this));
        }
        else {
            this.onLoad();
        }
    }
    BitmapNinePatch.prototype.onLoad = function () {
        this.loaded = true;
        var bitmap = this._patch.bitmap;
        var width = bitmap.width;
        var height = bitmap.height;
        var coordinates = this._patch.getCoordinates(this.width, this.height);
        var sourceColumn = coordinates.sourceColumn;
        var sourceRow = coordinates.sourceRow;
        this._bitmapCenterTop = new Bitmap(bitmap.image);
        this._bitmapLeftMiddle = new Bitmap(bitmap.image);
        this._bitmapRightMiddle = new Bitmap(bitmap.image);
        this._bitmapCenterBottom = new Bitmap(bitmap.image);
        this._bitmapCenterTop.cache(sourceColumn[1], sourceRow[0], (sourceColumn[2] - sourceColumn[1]) + 1, (sourceRow[1] - sourceRow[0]) + 1, 1);
        this._bitmapLeftMiddle.cache(sourceColumn[0], sourceRow[1], sourceColumn[1] - sourceColumn[0], sourceRow[2] - sourceRow[1]);
        this._bitmapRightMiddle.cache(sourceColumn[2], sourceRow[1], sourceColumn[3] - sourceColumn[2], sourceRow[2] - sourceRow[1]);
        this._bitmapCenterBottom.cache(sourceColumn[1], sourceRow[2], sourceColumn[2] - sourceColumn[1], sourceRow[3] - sourceRow[2]);
    };
    BitmapNinePatch.prototype.draw = function (ctx, ignoreCache) {
        if (!this.loaded) {
            return false;
        }
        if (_super.prototype.draw.call(this, ctx, ignoreCache)) {
            return true;
        }
        var image = this._patch.bitmap.image;
        var coordinates = this._patch.getCoordinates(this.width, this.height);
        var sourceColumn = coordinates.sourceColumn;
        var sourceRow = coordinates.sourceRow;
        var destColumn = coordinates.destColumn;
        var destRow = coordinates.destRow;
        ctx.save();
        // left top
        ctx.drawImage(image, sourceColumn[0], sourceRow[0], sourceColumn[1], sourceRow[1], destColumn[0], destRow[0], destColumn[1], destRow[1]);
        // center top
        ctx.drawImage(image, sourceColumn[1], sourceRow[0], sourceColumn[2] - sourceColumn[1], sourceRow[1], destColumn[1], destRow[0], destColumn[2] - destColumn[1], destRow[1]);
        // right top
        ctx.drawImage(image, sourceColumn[2], sourceRow[0], sourceColumn[3] - sourceColumn[2], sourceRow[1], destColumn[2], destRow[0], destColumn[3] - destColumn[2], destRow[1]);
        // left middle
        ctx.drawImage(image, sourceColumn[0], sourceRow[1], sourceColumn[1], sourceRow[2] - sourceRow[1], destColumn[0], destRow[1], destColumn[1], destRow[2] - destRow[1]);
        // center middle
        ctx.drawImage(image, sourceColumn[1], sourceRow[1], sourceColumn[2] - sourceColumn[1], sourceRow[2] - sourceRow[1], destColumn[1], destRow[1], destColumn[2] - destColumn[1], destRow[2] - destRow[1]);
        // right middle
        ctx.drawImage(image, sourceColumn[2], sourceRow[1], sourceColumn[3] - sourceColumn[2], sourceRow[2] - sourceRow[1], destColumn[2], destRow[1], destColumn[3] - destColumn[2], destRow[2] - destRow[1]);
        // left bottom
        ctx.drawImage(image, sourceColumn[0], sourceRow[2], sourceColumn[1], sourceRow[3] - sourceRow[2], destColumn[0], destRow[2], destColumn[1], destRow[3] - destRow[2]);
        // center bottom
        ctx.drawImage(image, sourceColumn[1], sourceRow[2], sourceColumn[2] - sourceColumn[1], sourceRow[3] - sourceRow[2], destColumn[1], destRow[2], destColumn[2] - destColumn[1], destRow[3] - destRow[2]);
        // right bottom
        ctx.drawImage(image, sourceColumn[2], sourceRow[2], sourceColumn[3] - sourceColumn[2], sourceRow[3] - sourceRow[2], destColumn[2], destRow[2], destColumn[3] - destColumn[2], destRow[3] - destRow[2]);
        ctx.restore();
        return true;
    };
    return BitmapNinePatch;
})(DisplayObject);
module.exports = BitmapNinePatch;
