define(["require", "exports"], function (require, exports) {
    var Texture = (function () {
        function Texture(bitmap, source) {
            this.bitmap = bitmap;
            this.source = source;
        }
        Texture.prototype.draw = function (ctx) {
            var source = this.source, bitmap = this.bitmap, x = source.x, y = source.y, width = source.width, height = source.height;
            ctx.drawImage(bitmap, x, y, width, height, 0, 0, width, height);
            return true;
        };
        return Texture;
    })();
    exports.default = Texture;
});
