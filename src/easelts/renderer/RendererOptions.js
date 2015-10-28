define(["require", "exports"], function (require, exports) {
    var RendererOptions = (function () {
        function RendererOptions(options) {
            this.view = options.view || document.createElement('canvas');
            this.transparent = options.transparent || false;
            this.autoResize = options.autoResize || false;
            this.antialias = options.antialias || false;
            this.resolution = options.resolution || 1;
            this.clearBeforeRender = options.clearBeforeRender || true;
            this.roundPixels = options.roundPixels || false;
        }
        return RendererOptions;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = RendererOptions;
});
