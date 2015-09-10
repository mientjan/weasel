define(["require", "exports", "./FlumpLayerData"], function (require, exports, FlumpLayerData_1) {
    var FlumpMovieData = (function () {
        function FlumpMovieData(flumpLibrary, json) {
            this.frames = 0;
            var layers = json.layers;
            var frames = 0;
            this.flumpLibrary = flumpLibrary;
            this.id = json.id;
            this.flumpLayerDatas = new Array(layers.length);
            for (var i = 0; i < layers.length; i++) {
                var layer = new FlumpLayerData_1.default(layers[i]);
                this.flumpLayerDatas[i] = layer;
                frames = Math.max(frames, layer.frames);
            }
            this.frames = frames;
        }
        return FlumpMovieData;
    })();
    exports.default = FlumpMovieData;
});
