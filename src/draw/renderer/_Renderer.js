define(["require", "exports"], function (require, exports) {
    var Renderer = (function () {
        function Renderer(width, height, options) {
            this.type = 0;
            this.width = 800;
            this.height = 600;
            this.view = null;
            this.resolution = 1;
            this.transparent = false;
            this.autoResize = false;
            this.blendModes = {};
            this.preserveDrawingBuffer = false;
            this.clearBeforeRender = false;
            this.roundPixels = false;
            this._backgroundColor = 0x000000;
            this._backgroundColorRgb = [0, 0, 0];
            this._backgroundColorString = '#000000';
            this.backgroundColor = this._backgroundColor;
            this._tempDisplayObjectParent = { worldTransform: null, worldAlpha: 1, children: [] };
            this._lastObjectRendered = this._tempDisplayObjectParent;
            this.view = options.view;
            this.transparent = options.transparent;
            this.autoResize = options.autoResize;
            this.resolution = options.resolution;
            this.clearBeforeRender = options.clearBeforeRender;
            this.roundPixels = options.roundPixels;
        }
        Renderer.prototype.resize = function (width, height) {
            this.width = width * this.resolution;
            this.height = height * this.resolution;
            this.view.width = this.width;
            this.view.height = this.height;
            if (this.autoResize) {
                this.view.style.width = this.width / this.resolution + 'px';
                this.view.style.height = this.height / this.resolution + 'px';
            }
        };
        Renderer.prototype.destruct = function (removeView) {
            if (removeView && this.view.parentNode) {
                this.view.parentNode.removeChild(this.view);
            }
            this.type = 0;
            this.width = 0;
            this.height = 0;
            this.view = null;
            this.resolution = 0;
            this.transparent = false;
            this.autoResize = false;
            this.blendModes = null;
            this.preserveDrawingBuffer = false;
            this.clearBeforeRender = false;
            this.roundPixels = false;
            this._backgroundColor = 0;
            this._backgroundColorRgb = null;
            this._backgroundColorString = null;
        };
        return Renderer;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Renderer;
});
