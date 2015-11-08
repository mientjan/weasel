define(["require", "exports", "../util/UID", "../util/MathUtil"], function (require, exports, UID_1, MathUtil_1) {
    var BaseTexture = (function () {
        function BaseTexture(source, scaleMode, resolution) {
            if (resolution === void 0) { resolution = 1; }
            this.uid = UID_1.default.get();
            this.width = 100;
            this.height = 100;
            this.realWidth = 100;
            this.realHeight = 100;
            this.scaleMode = 0;
            this._hasLoaded = false;
            this._isLoading = false;
            this.source = null;
            this.premultipliedAlpha = true;
            this.imageUrl = null;
            this.isPowerOfTwo = false;
            this.mipmap = false;
            this._glTextures = [];
            this.scaleMode = scaleMode;
            this.resolution = resolution;
        }
        BaseTexture.prototype.hasLoaded = function () {
            return this._hasLoaded;
        };
        BaseTexture.prototype.update = function () {
            this.realWidth = this.source.naturalWidth || this.source.width;
            this.realHeight = this.source.naturalHeight || this.source.height;
            this.width = this.realWidth / this.resolution;
            this.height = this.realHeight / this.resolution;
            this.isPowerOfTwo = MathUtil_1.default.isPowerOfTwo(this.realWidth) && MathUtil_1.default.isPowerOfTwo(this.realHeight);
        };
        BaseTexture.prototype.loadSource = function (source) {
            var _this = this;
            this._hasLoaded = false;
            if (this.source) {
                this.source.onload = null;
                this.source.onerror = null;
            }
            this.source = source;
            if ((this.source['complete'] || this.source['getContext'])) {
                this._sourceLoaded();
            }
            else if (!source.getContext) {
                var scope = this;
                source.onload = function () {
                    source.onload = null;
                    source.onerror = null;
                    _this._sourceLoaded();
                };
                source.onerror = function () {
                    source.onload = null;
                    source.onerror = null;
                    this._hasLoaded = false;
                };
                if (source.complete && source.src) {
                    this.isLoading = false;
                    source.onload = null;
                    source.onerror = null;
                    if (source.width && source.height) {
                        this._sourceLoaded();
                        if (wasLoading) {
                            this.emit('loaded', this);
                        }
                    }
                    else {
                        if (wasLoading) {
                            this.emit('error', this);
                        }
                    }
                }
            }
             * /;
        };
        ;
        BaseTexture.prototype._sourceLoaded = function () {
            this._hasLoaded = true;
            this.update();
        };
        BaseTexture.prototype.destruct = function () {
            if (this.imageUrl) {
                this.imageUrl = null;
                this.source.src = '';
            }
            else if (this.source && this.source._pixiId) {
            }
            this.source = null;
        };
        BaseTexture.prototype.dispose = function () {
            //this.emit('dispose', this);
            this._glTextures.length = 0;
        };
        ;
        BaseTexture.prototype.updateSourceImage = function (newSrc) {
            this.source.src = newSrc;
            this.loadSource(this.source);
        };
        return BaseTexture;
    })();
});
