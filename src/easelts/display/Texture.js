define(["require", "exports"], function (require, exports) {
    var Texture = (function () {
        function Texture(bitmap, source) {
            this.bitmap = bitmap;
            this.source = source;
        }
        Texture.prototype.draw = function (ctx) {
            var source = this.source;
            ctx.drawImage(this.bitmap, source.x, source.y, source.width, source.height, 0, 0, source.width, source.height);
            return true;
        };
        return Texture;
    })();
});
