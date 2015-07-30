define(["require", "exports", '../../display/Bitmap', '../../geom/Rectangle', './NinePatchCoordinates'], function (require, exports, Bitmap, Rectangle, NinePatchCoordinates) {
    var NinePatch = (function () {
        function NinePatch(imageOrString, rectangle) {
            this.bitmap = new Bitmap(imageOrString);
            if (!(rectangle instanceof Rectangle)) {
                this.rectangle = new Rectangle(rectangle[0], rectangle[1], rectangle[2], rectangle[3]);
            }
            else {
                this.rectangle = rectangle;
            }
        }
        NinePatch.prototype.getCoordinates = function (width, height) {
            var image = this.bitmap.getImageSize();
            var iw = image.width;
            var ih = image.height;
            var rx = this.rectangle.x;
            var ry = this.rectangle.y;
            var rw = this.rectangle.width;
            var rh = this.rectangle.height;
            var sourceRow = [
                0,
                ry,
                ry + rh,
                ih
            ];
            var sourceColumn = [
                0,
                rx,
                rx + rw,
                iw
            ];
            var destRow = [
                0,
                ry,
                height - (sourceRow[3] - sourceRow[2]),
                height
            ];
            var destColumn = [
                0,
                rx,
                width - (sourceColumn[3] - sourceColumn[2]),
                width
            ];
            return new NinePatchCoordinates(sourceRow, sourceColumn, destRow, destColumn);
        };
        return NinePatch;
    })();
    return NinePatch;
});
