define(["require", "exports"], function (require, exports) {
    var Texture = (function () {
        function Texture(src) {
            this.image = null;
            this.texture = null;
            this.image = document.createElement('img');
            this.image.onload = this.onload.bind(this);
            this.image.src = src;
        }
        Texture.prototype.onload = function () {
            this;
        };
        return Texture;
    })();
    return Texture;
});
