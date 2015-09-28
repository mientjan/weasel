define(["require", "exports"], function (require, exports) {
    var FlumpTexture = (function () {
        function FlumpTexture(bitmap, json) {
            this.type = 256;
            this.bitmap = bitmap;
            this.originX = json.origin[0];
            this.originY = json.origin[1];
            this.x = json.rect[0];
            this.y = json.rect[1];
            this.width = json.rect[2];
            this.height = json.rect[3];
        }
        FlumpTexture.prototype.draw = function (ctx) {
            var bitmap = this.bitmap, x = this.x, y = this.y, width = this.width, height = this.height;
            ctx.drawImage(bitmap, x, y, width, height, 0, 0, width, height);
            return true;
        };
        FlumpTexture.prototype.reset = function () {
        };
        return FlumpTexture;
    })();
    var Texture = (function () {
        function Texture(bitmap, json) {
            this.type = 256;
            var view = bitmap;
            this.originX = json.origin[0];
            this.originY = json.origin[1];
            var x = json.rect[0];
            var y = json.rect[1];
            var width = json.rect[2];
            var height = json.rect[3];
            this.draw = function (ctx) {
                ctx.drawImage(view, x, y, width, height, 0, 0, width, height);
                return true;
            };
        }
        Texture.prototype.reset = function () { };
        return Texture;
    })();
    exports.default = Texture;
});
