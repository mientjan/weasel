define(["require", "exports"], function (require, exports) {
    var BitmapSymbol = (function () {
        function BitmapSymbol(json, atlas) {
            this.name = json.symbol;
            var rect = json.rect;
            this.rect = [rect[0], rect[1], rect[2], rect[3]];
            this.atlas = atlas;
            var origin = json.origin;
            if (origin != null) {
                this.regX = origin[0];
                this.regY = origin[1];
            }
            else {
                this.regX = 0;
                this.regY = 0;
            }
        }
        return BitmapSymbol;
    })();
    return BitmapSymbol;
});
