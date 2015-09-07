var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../display/DisplayObject', './FlumpKeyframeData', './FlumpLabelData', "./FlumpMtx"], function (require, exports, DisplayObject, FlumpKeyframeData, FlumpLabelData, FlumpMtx) {
    var FlumpMovieLayer = (function (_super) {
        __extends(FlumpMovieLayer, _super);
        function FlumpMovieLayer(flumpMove, flumpLayerData) {
            _super.call(this);
            this.name = '';
            this._symbolType = 1;
            this._symbols = {};
            this._symbolName = null;
            this._storedMtx = new FlumpMtx(1, 0, 0, 1, 0, 0);
            this.disableMouseInteraction();
            this.flumpLayerData = flumpLayerData;
            this.name = flumpLayerData.name;
            for (var i = 0; i < flumpLayerData.flumpKeyframeDatas.length; i++) {
                var keyframe = flumpLayerData.flumpKeyframeDatas[i];
                if (keyframe.label) {
                    flumpMove.labels[keyframe.label] = new FlumpLabelData(keyframe.label, keyframe.index, keyframe.duration);
                }
                if ((keyframe.ref != -1 && keyframe.ref != null) && (keyframe.ref in this._symbols) == false) {
                    this._symbols[keyframe.ref] = flumpMove.flumpLibrary.createSymbol(keyframe.ref, false);
                }
            }
            this.setFrame(0);
        }
        FlumpMovieLayer.prototype.onTick = function (delta) {
            if (this._symbolType == 8) {
                this._symbolMovie.onTick(delta);
            }
        };
        FlumpMovieLayer.prototype.setFrame = function (frame) {
            var keyframe = this.flumpLayerData.getKeyframeForFrame(frame | 0);
            if (!(keyframe instanceof FlumpKeyframeData)) {
                this._symbolType = 1;
            }
            else {
                var nextKeyframe = this.flumpLayerData.getKeyframeAfter(keyframe);
                var x = keyframe.x;
                var y = keyframe.y;
                var scaleX = keyframe.scaleX;
                var scaleY = keyframe.scaleY;
                var skewX = keyframe.skewX;
                var skewY = keyframe.skewY;
                var pivotX = keyframe.pivotX;
                var pivotY = keyframe.pivotY;
                var alpha = keyframe.alpha;
                var sinX = 0.0;
                var cosX = 1.0;
                var sinY = 0.0;
                var cosY = 1.0;
                if (keyframe.index != (frame | 0) && keyframe.tweened) {
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
                if (skewX != 0) {
                    sinX = Math.sin(skewX);
                    cosX = Math.cos(skewX);
                }
                if (skewY != 0) {
                    sinY = Math.sin(skewY);
                    cosY = Math.cos(skewY);
                }
                this._storedMtx.a = scaleX * cosY;
                this._storedMtx.b = scaleX * sinY;
                this._storedMtx.c = -scaleY * sinX;
                this._storedMtx.d = scaleY * cosX;
                this._storedMtx.tx = x - (pivotX * this._storedMtx.a + pivotY * this._storedMtx.c);
                this._storedMtx.ty = y - (pivotX * this._storedMtx.b + pivotY * this._storedMtx.d);
                this.alpha = alpha;
                this.visible = keyframe.visible;
                if (keyframe.ref != -1 && keyframe.ref != null) {
                    if (this._keyframeRef != keyframe.ref) {
                        var symbol = this._symbols[keyframe.ref];
                        this._keyframeRef = keyframe.ref;
                        this._symbolType = symbol.type;
                        if (symbol.type == 8) {
                            this._symbolMovie = symbol;
                            this._symbolMovie.reset();
                        }
                        else if (symbol.type == 256) {
                            this._symbolTexture = symbol;
                            this._symbolTexture.reset();
                        }
                    }
                }
                else {
                    this._keyframeRef = null;
                    this._symbolType = 1;
                }
            }
        };
        FlumpMovieLayer.prototype.reset = function () {
            if (this._symbolType == 8)
                this._symbolMovie.reset();
        };
        FlumpMovieLayer.prototype.draw = function (ctx, ignoreCache) {
            if (this._symbolType == 8) {
                this._symbolMovie.draw(ctx);
            }
            else if (this._symbolType == 256) {
                this._symbolTexture.draw(ctx);
            }
            return true;
        };
        return FlumpMovieLayer;
    })(DisplayObject);
    return FlumpMovieLayer;
});
