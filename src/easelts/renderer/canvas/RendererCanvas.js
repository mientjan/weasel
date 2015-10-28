var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../display/DisplayObject", "../../display/buffer/CanvasBuffer"], function (require, exports, DisplayObject_1, CanvasBuffer_1) {
    var CanvasRenderer = (function (_super) {
        __extends(CanvasRenderer, _super);
        function CanvasRenderer(width, height, options) {
            _super.call(this, width, height, options.view);
            this.type = 1;
            this.smoothProperty = null;
            this.refresh = true;
            this.type = 1;
            this.transparent = options.transparent;
            this.autoResize = options.autoResize;
            this.resolution = options.resolution;
            this.clearBeforeRender = options.clearBeforeRender;
            this.roundPixels = options.roundPixels;
            this.context = this.element.getContext('2d', { alpha: this.transparent });
            this._mapBlendModes();
            this.resize(width, height);
        }
        CanvasRenderer.prototype.render = function (object) {
            var cacheParent = object.parent;
            this.context.setTransform(1, 0, 0, 1, 0, 0);
            this.context.globalAlpha = 1;
            this.context.globalCompositeOperation = DisplayObject_1.default.COMPOSITE_OPERATION_SOURCE_OVER;
            if (this.clearBeforeRender) {
                this.clear();
            }
            this.renderDisplayObject(object, this.context);
        };
        CanvasRenderer.prototype.renderDisplayObject = function (displayObject, context) {
            var tempContext = this.context;
            this.context = context;
            this.context = tempContext;
        };
        CanvasRenderer.prototype.resize = function (width, height) {
            //this.super(width, height);
            if (this.smoothProperty) {
                this.context[this.smoothProperty] = true;
            }
        };
        CanvasRenderer.prototype._mapBlendModes = function () {
            //if(!this.blendModes)
            //{
            //	this.blendModes = {};
        };
        CanvasRenderer.prototype.destruct = function () {
            // this.destroyPlugins();
            this.context = null;
            this.refresh = true;
            this.smoothProperty = null;
        };
        return CanvasRenderer;
    })(CanvasBuffer_1.default);
});
