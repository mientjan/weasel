var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../display/DisplayObject', './FlumpMovieLayer', './FlumpLabelQueueData'], function (require, exports, DisplayObject, FlumpMovieLayer, FlumpLabelQueueData) {
    var FlumpMovie = (function (_super) {
        __extends(FlumpMovie, _super);
        function FlumpMovie(flumpLibrary, name) {
            _super.call(this);
            this.flumpMovieLayers = [];
            this._labels = {};
            this._labelQueue = [];
            this._currentLabel = null;
            this.paused = true;
            this.time = 0.0;
            this.duration = 0.0;
            this.frame = 0;
            this.frames = 0;
            this.flumpLibrary = flumpLibrary;
            this.flumpMovieData = flumpLibrary.getFlumpMovieData(name);
            var layers = this.flumpMovieData.flumpLayerDatas;
            for (var i = 0; i < layers.length; i++) {
                var layerData = layers[i];
                var flashMovieLayer = new FlumpMovieLayer(this, layerData);
                this.flumpMovieLayers.push(flashMovieLayer);
            }
            this.frames = this.flumpMovieData.frames;
            flumpLibrary.frameRate = 25;
            this.duration = (this.frames / flumpLibrary.frameRate) * 1000;
        }
        FlumpMovie.prototype.play = function (times, label, addToQeue) {
            if (times === void 0) { times = 1; }
            if (label === void 0) { label = null; }
            if (addToQeue === void 0) { addToQeue = true; }
            this.time = 0;
            this.frame = 0;
            if (label == null || label == '*') {
                this._labelQueue.push(new FlumpLabelQueueData(label, 0, this.frames, times));
            }
            else {
                var queue = this._labels[label];
                this._labelQueue.push(new FlumpLabelQueueData(queue.label, queue.index, queue.duration, times));
            }
            if (!addToQeue) {
                this.gotoNextLabel();
                this._labelQueue.length = 0;
            }
            if (!this._currentLabel) {
                this.gotoNextLabel();
            }
            this.paused = false;
        };
        FlumpMovie.prototype.setCurrentLabelLoop = function (times) {
            if (times === void 0) { times = 1; }
            this._currentLabel.times = times;
        };
        FlumpMovie.prototype.endLoop = function () {
            this._currentLabel;
        };
        FlumpMovie.prototype.gotoNextLabel = function () {
            this._currentLabel = this._labelQueue.shift();
            this.time = 0;
            return this._currentLabel;
        };
        FlumpMovie.prototype.stop = function () {
            this.paused = true;
            this.dispatchEvent(FlumpMovie.EVENT_COMPLETE);
        };
        FlumpMovie.prototype.onTick = function (delta) {
            _super.prototype.onTick.call(this, delta);
            if (!this.paused) {
                var label = this._currentLabel;
                this.time += delta;
                var frame = Math.floor((this.frames * this.time) / this.duration);
                if (label.times != -1) {
                    if (label.times - Math.ceil((frame + 2) / label.duration) == -1) {
                        if (this._labelQueue.length > 0) {
                            this.gotoNextLabel();
                        }
                        else {
                            this.stop();
                            return;
                        }
                    }
                }
                this.frame = label.index + (frame % label.duration);
                for (var i = 0; i < this.flumpMovieLayers.length; i++) {
                    var layer = this.flumpMovieLayers[i];
                    layer.onTick(delta);
                    layer.setFrame(this.frame);
                }
            }
        };
        FlumpMovie.prototype.draw = function (ctx, ignoreCache) {
            var layers = this.flumpMovieLayers;
            for (var i = 0; i < layers.length; i++) {
                var layer = layers[i];
                if (layer.visible) {
                    ctx.save();
                    ctx.globalAlpha *= layer.alpha;
                    ctx.transform(layer._storedMtx.a, layer._storedMtx.b, layer._storedMtx.c, layer._storedMtx.d, layer._storedMtx.tx, layer._storedMtx.ty);
                    layer.draw(ctx);
                    ctx.restore();
                }
            }
            return true;
        };
        FlumpMovie.EVENT_COMPLETE = 'FlumpMovie.Complete';
        return FlumpMovie;
    })(DisplayObject);
    return FlumpMovie;
});
