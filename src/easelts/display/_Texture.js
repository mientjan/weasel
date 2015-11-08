define(["require", "exports"], function (require, exports) {
    var Texture = (function () {
        function Texture(bitmap, source, dest) {
            var view = bitmap, x = source.x, y = source.y, width = source.width, height = source.height;
            this.bitmap = view;
            this.x = x;
            this.y = y;
            this.w = width;
            this.h = height;
            if (!dest) {
                this.dx = x;
                this.dy = y;
                this.dw = width;
                this.dh = height;
            }
            else {
                this.dx = dest.x;
                this.dy = dest.y;
                this.dw = dest.width;
                this.dh = dest.height;
            }
        }
        Texture.prototype.draw = function (ctx) {
            ctx.drawImage(this.bitmap, this.x, this.y, this.w, this.h, this.dx, this.dy, this.dw, this.dh);
            return true;
        };
        Texture.prototype.drawWebGL = function (ctx) {
            return true;
        };
        return Texture;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Texture;
});
