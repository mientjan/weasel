define(["require", "exports", "../../createts/util/Promise"], function (require, exports, Promise_1) {
    var Texture = (function () {
        function Texture(bitmap, autoLoad) {
            if (autoLoad === void 0) { autoLoad = false; }
            this.bitmapType = 0;
            this.webGLTexture = null;
            this.width = 0;
            this.height = 0;
            this._loadPromise = null;
            this._isLoaded = false;
            if (typeof bitmap == 'string') {
                var img = document.createElement('img');
                img.src = bitmap;
                this.bitmap = img;
            }
            else {
                this.bitmap = bitmap;
            }
            if (autoLoad) {
                this.load();
            }
        }
        Texture.prototype.isLoaded = function () {
            return this._isLoaded;
        };
        Texture.prototype.load = function (onProgress) {
            var _this = this;
            if (this._isLoaded) {
                if (onProgress)
                    onProgress(1);
                return new Promise_1.default(function (resolve, reject) {
                    resolve(_this);
                });
            }
            return new Promise_1.default(function (resolve, reject) { return _this._load(resolve); });
        };
        Texture.prototype._load = function (onComplete) {
            var _this = this;
            var bitmap = this.bitmap;
            var tagName = '';
            if (bitmap) {
                tagName = bitmap.tagName.toLowerCase();
            }
            switch (tagName) {
                case 'img':
                    {
                        if ((bitmap['complete'] || bitmap['getContext'] || bitmap['readyState'] >= 2)) {
                            this.initImage(bitmap);
                        }
                        else {
                            bitmap.addEventListener('load', function () {
                                _this.initImage(bitmap);
                                onComplete(_this);
                            });
                        }
                        break;
                    }
                case 'video':
                    {
                        this.bitmapType = 2;
                        if (this.width == 0 || this.height == 0) {
                            throw new Error('width and height must be set when using canvas / video');
                        }
                        if (bitmap.readyState == 1) {
                            this.initVideo(bitmap);
                        }
                        else {
                            bitmap.addEventListener('loadedmetadata', function () {
                                _this.initVideo(bitmap);
                                onComplete(_this);
                            });
                        }
                        break;
                    }
                case 'canvas':
                    {
                        this.bitmapType = 3;
                        if (this.width == 0 || this.height == 0) {
                            throw new Error('width and height must be set when using canvas / video');
                        }
                        this.initCanvas(bitmap);
                        onComplete(this);
                        break;
                    }
            }
        };
        Texture.prototype.initImage = function (image) {
            this.width = image.naturalWidth;
            this.height = image.naturalHeight;
            this._isLoaded = true;
        };
        Texture.prototype.initCanvas = function (canvas) {
            this.width = canvas.width;
            this.height = canvas.height;
            this._isLoaded = true;
        };
        Texture.prototype.initVideo = function (video) {
            this.width = video.width;
            this.height = video.height;
            this._isLoaded = true;
        };
        Texture.prototype.getWidth = function () {
            return this.width;
        };
        Texture.prototype.getHeight = function () {
            return this.height;
        };
        Texture.prototype.draw = function (ctx, sx, sy, sw, sh, dx, dy, dw, dh) {
            ctx.drawImage(this.bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
            return true;
        };
        Texture.prototype.drawWebGL = function (ctx, sx, sy, sw, sh, dx, dy, dw, dh) {
            return true;
        };
        Texture.prototype.bindTexture = function (ctx) {
            var bitmap = this.bitmap;
            if (this.isLoaded()) {
                if (!this.webGLTexture) {
                    var texture = this.webGLTexture = ctx.createTexture();
                    ctx.bindTexture(ctx.TEXTURE_2D, texture);
                    ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, bitmap);
                    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
                    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.LINEAR);
                    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
                    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
                }
                return texture;
            }
        };
        ;
        return Texture;
    })();
    exports.default = Texture;
});
