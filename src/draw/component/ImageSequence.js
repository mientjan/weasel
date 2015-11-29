var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../display/DisplayObject", "../display/SpriteSheet", "../../util/Promise"], function (require, exports, DisplayObject_1, SpriteSheet_1, Promise_1) {
    var ImageSequence = (function (_super) {
        __extends(ImageSequence, _super);
        function ImageSequence(spriteSheet, fps, width, height, x, y, regX, regY) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            _super.call(this, width, height, x, y, regX, regY);
            this.type = 128;
            this._playing = false;
            this._timeIndex = -1;
            this._frame = 0;
            this._frameTime = 0;
            this._length = 0;
            this._times = 1;
            this._loopInfinite = false;
            this._onComplete = null;
            this.paused = true;
            this.spriteSheet = null;
            this._hasLoaded = false;
            this.spriteSheet = spriteSheet;
            this.fps = fps;
            if (this.hasLoaded()) {
                this.parseLoad();
            }
        }
        ImageSequence.createFromString = function (images, fps, width, height) {
            var sequenceStructure = {
                "images": images.map(function (src) { return src; }),
                "frames": images.map(function (src, index) { return [0, 0, width, height, index, 0, 0]; }),
                "animations": {
                    "animation": [0, images.length - 1]
                }
            };
            return new ImageSequence(new SpriteSheet_1.default(sequenceStructure), fps, width, height);
        };
        ImageSequence.prototype.parseLoad = function () {
            var animations = this.spriteSheet.getAnimations();
            if (animations.length > 1) {
                throw new Error('SpriteSheet not compatible with ImageSequence, has multiple animations. Only supports one');
            }
            this._length = this.spriteSheet.getNumFrames(animations[0]);
            this._frameTime = 1000 / this.fps;
        };
        ImageSequence.prototype.hasLoaded = function () {
            return this._hasLoaded;
        };
        ImageSequence.prototype.load = function (onProgress) {
            var _this = this;
            if (this.hasLoaded()) {
                if (onProgress)
                    onProgress(1);
                return new Promise_1.default(function (resolve, reject) {
                    resolve(_this);
                });
            }
            return this.spriteSheet.load(onProgress).then(function (spriteSheet) {
                _this._hasLoaded = true;
                _this.parseLoad();
                return _this;
            }).catch(function () {
                throw new Error('could not load library');
            });
        };
        ImageSequence.prototype.draw = function (ctx, ignoreCache) {
            var frame = this._frame;
            var width = this.width;
            var height = this.height;
            if (this._frame > -1 && this._hasLoaded) {
                var frameObject = this.spriteSheet.getFrame(frame);
                if (!frameObject) {
                    return false;
                }
                var rect = frameObject.rect;
                if (rect.width && rect.height) {
                    ctx.drawImage(frameObject.image, rect.x, rect.y, rect.width, rect.height, 0, 0, width, height);
                }
            }
            return true;
        };
        ImageSequence.prototype.play = function (times, onComplete) {
            if (times === void 0) { times = 1; }
            if (onComplete === void 0) { onComplete = null; }
            this._frame = 0;
            this._times = times;
            this._loopInfinite = times == -1 ? true : false;
            this._onComplete = onComplete;
            this._playing = true;
            return this;
        };
        ImageSequence.prototype.gotoAndStop = function (frame) {
            if (frame === void 0) { frame = 1; }
            this._frame = frame;
            this._times = 1;
            this._loopInfinite = false;
            this._playing = false;
            return this;
        };
        ImageSequence.prototype.stop = function (triggerOnComplete) {
            if (triggerOnComplete === void 0) { triggerOnComplete = true; }
            this._playing = false;
            this._loopInfinite = false;
            this._timeIndex = -1;
            if (this._onComplete && triggerOnComplete) {
                this._onComplete.call(null);
            }
            this._onComplete = null;
            return this;
        };
        ImageSequence.prototype.onTick = function (delta) {
            var playing = this._playing;
            if (playing) {
                if (this._timeIndex < 0) {
                    this._timeIndex = 0;
                }
                var time = this._timeIndex += delta;
                var frameTime = this._frameTime;
                var length = this._length;
                var times = this._times;
                var frame = Math.floor(time / frameTime);
                var currentFrame = this._frame;
                var playedLeft = times - Math.floor(frame / length);
                if (!this._loopInfinite && playedLeft <= 0) {
                    this.stop();
                }
                else {
                    frame %= length;
                    if (currentFrame != frame) {
                        this._frame = frame;
                    }
                }
            }
        };
        return ImageSequence;
    })(DisplayObject_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ImageSequence;
});
