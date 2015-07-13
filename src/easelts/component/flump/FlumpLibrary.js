define(["require", "exports", '../../../createts/util/HttpRequest', './FlumpMovieData', './FlumpTextureGroup', './FlumpMovie'], function (require, exports, HttpRequest, FlumpMovieData, FlumpTextureGroup, FlumpMovie) {
    var FlumpLibrary = (function () {
        function FlumpLibrary(library, url) {
            var _this = this;
            this.movieData = [];
            this.textureGroups = [];
            this._maxExtensionLength = 5;
            this._baseDir = '';
            this.fps = 0;
            this.loaded = false;
            this.url = url;
            this.md5 = library.md5;
            this.frameRate = library.frameRate;
            var textureGroupLoaders = [];
            for (var i = 0; i < library.movies.length; i++) {
                var flumpMovieData = new FlumpMovieData(this, library.movies[i]);
                this.movieData.push(flumpMovieData);
            }
            var textureGroups = library.textureGroups;
            for (var i = 0; i < textureGroups.length; i++) {
                var textureGroup = textureGroups[i];
                var promise = FlumpTextureGroup.load(this, textureGroup);
                textureGroupLoaders.push(promise);
            }
            HttpRequest.wait(textureGroupLoaders).then(function (textureGroups) {
                _this.textureGroups.concat(textureGroups);
            });
        }
        FlumpLibrary.load = function (url) {
            return HttpRequest.getString(url).then(function (response) {
                return JSON.parse(response);
            }).then(function (json) {
                var flumpLibrary = new FlumpLibrary(json, url);
                return flumpLibrary;
            });
        };
        FlumpLibrary.prototype.getFlumpMovieData = function (name) {
            for (var i = 0; i < this.movieData.length; i++) {
                var movieData = this.movieData[i];
                if (movieData.id == name) {
                    return movieData;
                }
            }
            throw new Error('movie not found');
        };
        FlumpLibrary.prototype.createSymbol = function (name) {
            for (var i = 0; i < this.textureGroups.length; i++) {
                var flumpTextures = this.textureGroups[i].flumpTextures;
                if (name in flumpTextures) {
                    return flumpTextures[name];
                }
            }
            for (var i = 0; i < this.movieData.length; i++) {
                var movieData = this.movieData[i];
                if (movieData.id == name) {
                    return new FlumpMovie(this, name);
                }
            }
            throw new Error("no symbol found");
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
