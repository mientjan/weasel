define(["require", "exports"], function (require, exports) {
    var FlumpTexture = (function () {
        function FlumpTexture(bitmap, json) {
            this.time = 0.0;
            this.bitmap = bitmap;
            this.originX = json.origin[0];
            this.originY = json.origin[1];
            this.x = json.rect[0];
            this.y = json.rect[1];
            this.width = json.rect[2];
            this.height = json.rect[3];
        }
        FlumpTexture.prototype.draw = function (ctx) {
            ctx.drawImage(this.bitmap, this.x, this.y, this.width, this.height, 0, 0, this.width, this.height);
            return true;
        };
        FlumpTexture.prototype.reset = function () {
            this.time = 0.0;
        };
        return FlumpTexture;
    })();
    return FlumpTexture;
});
