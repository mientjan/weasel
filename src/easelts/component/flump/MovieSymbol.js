define(["require", "exports"], function (require, exports) {
    var MovieSymbol = (function () {
        function MovieSymbol(lib, data) {
            var layers;
            this.name = data.id;
            this.fps = lib.fps;
            this.frames = 0.0;
            this.layers = layers = new Array(data.layers.length);
            for (var i = 0; i < layers.length; i++) {
                var layer = new MovieLayer(data.layers[i]);
                this.frames = Math.max(layer.frames, this.frames);
                this.layers[i] = layer;
            }
            this.duration = this.frames / this.fps;
        }
        return MovieSymbol;
    })();
    exports.MovieSymbol = MovieSymbol;
    var MovieLayer = (function () {
        function MovieLayer(json) {
            this.frames = 0;
            this.isEmpty = true;
            this.name = json.name;
            var prevKf = null;
            this.keyframes = new Array(json.keyframes.length);
            for (var i = 0; i < this.keyframes.length; i++) {
                prevKf = new MovieKeyframe(json.keyframes[i], prevKf);
                this.keyframes[i] = prevKf;
                this.isEmpty = this.isEmpty && prevKf.symbolName == null;
                this.frames = (prevKf != null) ? prevKf.index + prevKf.duration : 0;
            }
        }
        return MovieLayer;
    })();
    exports.MovieLayer = MovieLayer;
    var MovieKeyframe = (function () {
        function MovieKeyframe(json, prevKf) {
            this.index = 0;
            this.symbolName = '';
            this.symbol = null;
            this.label = '';
            this.x = 0;
            this.y = 0;
            this.scaleX = 0;
            this.scaleY = 0;
            this.skewX = 0;
            this.skewY = 0;
            this.regX = 0;
            this.regY = 0;
            this.alpha = 1;
            this.visible = true;
            this.tweened = true;
            this.ease = 0;
            this.index = (prevKf != null) ? prevKf.index + prevKf.duration : 0;
            this.duration = json.duration;
            this.label = json.label;
            this.symbolName = json.ref;
            var loc = json.loc;
            if (loc != null) {
                this.x = loc[0];
                this.y = loc[1];
            }
            var scale = json.scale;
            if (scale != null) {
                this.scaleX = scale[0];
                this.scaleY = scale[1];
            }
            var skew = json.skew;
            if (skew != null) {
                this.skewX = skew[0];
                this.skewY = skew[1];
            }
            var pivot = json.pivot;
            if (pivot != null) {
                this.regX = pivot[0];
                this.regY = pivot[1];
            }
            if (json.alpha != null) {
                this.alpha = json.alpha;
            }
            if (json.visible != null) {
                this.visible = json.visible;
            }
            if (json.tweened != null) {
                this.tweened = json.tweened;
            }
            if (json.ease != null) {
                this.ease = json.ease;
            }
        }
        return MovieKeyframe;
    })();
    exports.MovieKeyframe = MovieKeyframe;
});
