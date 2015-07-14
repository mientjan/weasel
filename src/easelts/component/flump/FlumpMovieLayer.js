var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../display/DisplayObject', './FlumpKeyframeData', './FlumpTexture', './FlumpLabelData'], function (require, exports, DisplayObject, FlumpKeyframeData, FlumpTexture, FlumpLabelData) {
    var FlumpMovieLayer = (function (_super) {
        __extends(FlumpMovieLayer, _super);
        function FlumpMovieLayer(flumpMove, flumpLayerData) {
            _super.call(this);
            this._symbols = {};
            this._storedMtx = {
                a: 0,
                b: 0,
                c: 0,
                d: 0,
                tx: 0,
                ty: 0
            };
            this.flumpLayerData = flumpLayerData;
            var flumpLibrary = flumpMove.flumpLibrary;
            for (var i = 0; i < flumpLayerData.flumpKeyframeDatas.length; i++) {
                var keyframe = flumpLayerData.flumpKeyframeDatas[i];
                if (keyframe.label) {
                    flumpMove.labels[keyframe.label] = new FlumpLabelData(keyframe.label, keyframe.index, keyframe.duration);
                }
                if (keyframe.ref != null && (keyframe.ref in this._symbols) == false) {
                    this._symbols[keyframe.ref] = flumpMove.flumpLibrary.createSymbol(keyframe.ref);
                }
            }
            this.setFrame(0);
        }
        FlumpMovieLayer.prototype.onTick = function (delta) {
            if (this._symbol != null && !(this._symbol instanceof FlumpTexture)) {
                return this._symbol.onTick(delta);
            }
            else {
                return false;
            }
        };
        FlumpMovieLayer.prototype.setFrame = function (frame) {
            var keyframe = this.flumpLayerData.getKeyframeForFrame(frame);
            if (!(keyframe instanceof FlumpKeyframeData)) {
                this._symbol = null;
                return;
            }
            var x = keyframe.x;
            var y = keyframe.y;
            var scaleX = keyframe.scaleX;
            var scaleY = keyframe.scaleY;
            var skewX = keyframe.skewX;
            var skewY = keyframe.skewY;
            var pivotX = keyframe.pivotX;
            var pivotY = keyframe.pivotY;
            var alpha = keyframe.alpha;
            if (keyframe.index != frame && keyframe.tweened) {
                var nextKeyframe = this.flumpLayerData.getKeyframeAfter(keyframe);
                if (nextKeyframe instanceof FlumpKeyframeData) {
                    var interped = (frame - keyframe.index) / keyframe.duration;
                    var ease = keyframe.ease;
                    if (ease != 0) {
                        var t = 0.0;
                        if (ease < 0) {
                            var inv = 1 - interped;
                            t = 1 - inv * inv;
                            ease = 0 - ease;
                        }
                        else {
                            t = interped * interped;
                        }
                        interped = ease * t + (1 - ease) * interped;
                    }
                    x = x + (nextKeyframe.x - x) * interped;
                    y = y + (nextKeyframe.y - y) * interped;
                    scaleX = scaleX + (nextKeyframe.scaleX - scaleX) * interped;
                    scaleY = scaleY + (nextKeyframe.scaleY - scaleY) * interped;
                    skewX = skewX + (nextKeyframe.skewX - skewX) * interped;
                    skewY = skewY + (nextKeyframe.skewY - skewY) * interped;
                    alpha = alpha + (nextKeyframe.alpha - alpha) * interped;
                }
            }
            this._storedMtx.a = scaleX * Math.cos(skewY);
            this._storedMtx.b = scaleX * Math.sin(skewY);
            this._storedMtx.c = -scaleY * Math.sin(skewX);
            this._storedMtx.d = scaleY * Math.cos(skewX);
            this._storedMtx.tx = x - (pivotX * this._storedMtx.a + pivotY * this._storedMtx.c);
            this._storedMtx.ty = y - (pivotX * this._storedMtx.b + pivotY * this._storedMtx.d);
            this.alpha = alpha;
            this.visible = keyframe.visible;
            this._symbol = (keyframe.ref != null) ? this._symbols[keyframe.ref] : null;
        };
        FlumpMovieLayer.prototype.draw = function (ctx, ignoreCache) {
            if (this._symbol != null) {
                this._symbol.draw(ctx);
            }
            return true;
        };
        return FlumpMovieLayer;
    })(DisplayObject);
    return FlumpMovieLayer;
});
