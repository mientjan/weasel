var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../display/DisplayObject', './FlumpMovieLayer'], function (require, exports, DisplayObject, FlumpMovieLayer) {
    var FlumpMovie = (function (_super) {
        __extends(FlumpMovie, _super);
        function FlumpMovie(flumpLibrary, name) {
            _super.call(this);
            this.flumpMovieLayers = [];
            this.time = 0.0;
            this.duration = 0.0;
            this.frame = 0;
            this.frames = 0;
            this._flumpLibrary = flumpLibrary;
            this.flumpMovieData = flumpLibrary.getFlumpMovieData(name);
            var layers = this.flumpMovieData.flumpLayerDatas;
            for (var i = 0; i < layers.length; i++) {
                var layerData = layers[i];
                var flashMovieLayer = new FlumpMovieLayer(flumpLibrary, layerData);
                this.flumpMovieLayers.push(flashMovieLayer);
            }
            this.frames = this.flumpMovieData.frames;
            this.duration = this.frames / flumpLibrary.frameRate;
        }
        FlumpMovie.prototype.onTick = function (delta) {
            _super.prototype.onTick.call(this, delta);
            var nDelta = delta / 1000;
            this.time += nDelta;
            var frameTime = this.time % this.duration;
            this.frame = Math.min(Math.floor((this.frames * frameTime) / this.duration), this.frames - 1);
            for (var i = 0; i < this.flumpMovieLayers.length; i++) {
                var layer = this.flumpMovieLayers[i];
                layer.onTick(nDelta);
                layer.setFrame(this.frame);
            }
            return true;
        };
        FlumpMovie.prototype.draw = function (ctx, ignoreCache) {
            var layers = this.flumpMovieLayers;
            for (var i = 0; i < layers.length; i++) {
                var layer = layers[i];
                if (layer.visible) {
                    ctx.save();
                    ctx.transform(layer._storedMtx.a, layer._storedMtx.b, layer._storedMtx.c, layer._storedMtx.d, layer._storedMtx.tx, layer._storedMtx.ty);
                    layer.draw(ctx);
                    ctx.restore();
                }
            }
            return true;
        };
        return FlumpMovie;
    })(DisplayObject);
    return FlumpMovie;
});
