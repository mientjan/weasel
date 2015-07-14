define(["require", "exports", '../../../createts/util/HttpRequest', '../../../createts/util/Promise', './FlumpMovieData', './FlumpTextureGroup', './FlumpMovie'], function (require, exports, HttpRequest, Promise, FlumpMovieData, FlumpTextureGroup, FlumpMovie) {
    var FlumpLibrary = (function () {
        function FlumpLibrary(basePath) {
            this.movieData = [];
            this.textureGroups = [];
            this.fps = 0;
            this.loaded = false;
            this.url = basePath;
        }
        FlumpLibrary.load = function (url) {
            var baseDir = url;
            if (url.indexOf('.json') > -1) {
                baseDir = url.substr(0, url.lastIndexOf('/'));
            }
            else {
                url += (url.substr(url.length - 1) != '/' ? '/' : '') + 'library.json';
            }
            return HttpRequest.getString(url).then(function (response) {
                return JSON.parse(response);
            }).then(function (json) {
                var flumpLibrary = new FlumpLibrary(baseDir);
                flumpLibrary.md5 = json.md5;
                flumpLibrary.frameRate = json.frameRate;
                var textureGroupLoaders = [];
                for (var i = 0; i < json.movies.length; i++) {
                    var flumpMovieData = new FlumpMovieData(flumpLibrary, json.movies[i]);
                    flumpLibrary.movieData.push(flumpMovieData);
                }
                var textureGroups = json.textureGroups;
                for (var i = 0; i < textureGroups.length; i++) {
                    var textureGroup = textureGroups[i];
                    var promise = FlumpTextureGroup.load(flumpLibrary, textureGroup);
                    textureGroupLoaders.push(promise);
                }
                return Promise.all(textureGroupLoaders).then(function (textureGroups) {
                    for (var i = 0; i < textureGroups.length; i++) {
                        var textureGroup = textureGroups[i];
                        flumpLibrary.textureGroups.push(textureGroup);
                    }
                    return flumpLibrary;
                });
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
