define(["require", "exports", '../../../createts/event/Signal', './MovieSymbol', './BitmapSymbol'], function (require, exports, Signal, MovieSymbol, BitmapSymbol) {
    var FlumpLibrary = (function () {
        function FlumpLibrary(libraryFilepathOrLibraryJsonObject, baseDir, autoload) {
            if (baseDir === void 0) { baseDir = ''; }
            if (autoload === void 0) { autoload = true; }
            this._rawLibrary = null;
            this._atlas = [];
            this._groups = [];
            this._maxExtensionLength = 5;
            this._baseDir = '';
            this._map = {};
            this.fps = 0;
            this.loaded = false;
            this.signalLoad = new Signal();
            this._baseDir = baseDir;
            if (typeof libraryFilepathOrLibraryJsonObject == 'string') {
                var filepath = libraryFilepathOrLibraryJsonObject;
                var dir = libraryFilepathOrLibraryJsonObject;
                if (this.isDir(filepath)) {
                    filepath += (filepath.substr(filepath.length - 1) != '/' ? '/' : '') + 'library.json';
                }
                if (!this.isDir(dir)) {
                    dir = dir.substr(0, dir.lastIndexOf('/'));
                }
                if (this._baseDir.length == 0) {
                    this._baseDir = dir;
                }
                if (autoload) {
                    this.loadJSON(filepath);
                }
            }
            else {
                if (this._baseDir.length == 0) {
                    throw new Error('argument baseDir can not be empty when providing a object dump');
                }
                this._rawLibrary = libraryFilepathOrLibraryJsonObject;
                this.parse();
            }
        }
        FlumpLibrary.prototype.isDir = function (path) {
            return !(path.length - path.indexOf('.') <= this._maxExtensionLength);
        };
        FlumpLibrary.prototype.hasJSONLoaded = function () {
            return !!this._rawLibrary;
        };
        FlumpLibrary.prototype.hasAssetsLoaded = function () {
            return this.loaded;
        };
        FlumpLibrary.prototype.loadJSON = function (path, onComplete) {
            var _this = this;
            this.xhrLoad(path, function (response) {
                var data = JSON.parse(response);
                _this._rawLibrary = data;
                _this.parse(onComplete);
            });
        };
        FlumpLibrary.prototype.parse = function (onComplete) {
            var data = this._rawLibrary;
            this.fps = data.frameRate;
            this._groups = data.textureGroups;
            var map = this._map;
            var movies = [];
            for (var i = 0; i < data.movies.length; i++) {
                var m = new MovieSymbol.MovieSymbol(this, data.movies[i]);
                movies.push(m);
                map[m.name] = m;
            }
            var groups = data.textureGroups;
            if (groups[0].scaleFactor != 1 || groups.length > 1) {
            }
            var atlases = groups[0].atlases;
            for (var i = 0; i < atlases.length; i++) {
                var atlasObj = atlases[i];
                var atlas = this._loadAtlas(this._baseDir + "/" + atlasObj.file);
                for (var j = 0; j < atlasObj.textures.length; j++) {
                    var textureObject = atlasObj.textures[j];
                    var bitmap = new BitmapSymbol(textureObject, atlas);
                    map[bitmap.name] = bitmap;
                }
            }
            for (var i = 0; i < movies.length; i++) {
                var movie = movies[i];
                for (var j = 0; j < movie.layers.length; j++) {
                    var layer = movie.layers[j];
                    var keyframes = layer.keyframes;
                    var ll = keyframes.length;
                    for (var k = 0; k < ll; k++) {
                        console.log(kf);
                        var kf = keyframes[k];
                        if (kf.symbolName != null) {
                            var symbol = map[kf.symbolName];
                            if (symbol != void 0) {
                                kf.symbol = symbol;
                            }
                        }
                        if (kf.tweened && kf.duration == 1 && k + 1 < ll.length) {
                            var nextKf = keyframes[k + 1];
                            if (!nextKf.visible || nextKf.symbolName == null) {
                                kf.visible = false;
                            }
                        }
                    }
                }
            }
            console.log(map);
        };
        FlumpLibrary.prototype.xhrLoad = function (path, complete) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                complete(this.responseText);
            };
            xhr.open("get", path, true);
            xhr.send();
        };
        FlumpLibrary.prototype._loadAtlas = function (path) {
            var img = document.createElement('img');
            img.src = path;
            return img;
        };
        return FlumpLibrary;
    })();
    return FlumpLibrary;
});
