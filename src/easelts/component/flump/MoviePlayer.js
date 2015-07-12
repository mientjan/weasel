define(["require", "exports"], function (require, exports) {
    var MoviePlayer = (function () {
        function MoviePlayer(lib) {
            this._oneshotSprite = null;
            this._loopingSprite = null;
            this._lib = lib;
            movie = new Value(null);
            this.setCache(true);
        }
        MoviePlayer.prototype.play = function (name, restart) {
            if (restart === void 0) { restart = true; }
            Assert.that(_loopingSprite != null, "A loop must be started before the first call to play()");
            if (restart || _oneshotSprite == null || _oneshotSprite.symbol.name != name) {
                _oneshotSprite = playFromCache(name);
            }
            return this;
        };
        MoviePlayer.prototype.loop = function (name, restart) {
            if (restart === void 0) { restart = true; }
            if (restart || _loopingSprite == null || _loopingSprite.symbol.name != name) {
                _oneshotSprite = null;
                _loopingSprite = playFromCache(name);
            }
            return this;
        };
        MoviePlayer.prototype.onAdded = function () {
        };
        MoviePlayer.prototype.onRemoved = function () {
            _root.dispose();
            _oneshotSprite = _loopingSprite = null;
            movie._ = null;
        };
        MoviePlayer.prototype.onTick = function (delta) {
            if (this._oneshotSprite != null && this._oneshotSprite.position + dt > this._oneshotSprite.symbol.duration) {
                this._oneshotSprite = null;
                this.setCurrent(_loopingSprite);
            }
        };
        MoviePlayer.prototype.playFromCache = function (name) {
            var sprite;
            if (_cache != null) {
                sprite = _cache.get(name);
                if (sprite != null) {
                    sprite.position = 0;
                }
                else {
                    sprite = createMovie(name);
                    _cache.set(name, sprite);
                }
            }
            else {
                sprite = createMovie(name);
            }
            return setCurrent(sprite);
        };
        MoviePlayer.prototype.createMovie = function (name) {
        };
        MoviePlayer.prototype.setCurrent = function (current) {
            _root.add(current);
            return movie._ = current;
        };
        return MoviePlayer;
    })();
});
