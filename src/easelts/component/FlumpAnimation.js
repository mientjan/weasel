var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../display/Container', './flump/FlumpLibrary'], function (require, exports, Container, FlumpLibrary) {
    var FlumpAnimation = (function (_super) {
        __extends(FlumpAnimation, _super);
        function FlumpAnimation(libraryFilepathOrLibraryJsonObject, autoload) {
            if (autoload === void 0) { autoload = false; }
            _super.call(this);
            this.loaded = false;
            this._paused = false;
            this._animationQueu = [];
            this._library = null;
            this._time = 0;
            if (typeof libraryFilepathOrLibraryJsonObject === 'object' && libraryFilepathOrLibraryJsonObject instanceof FlumpLibrary) {
                this._library = libraryFilepathOrLibraryJsonObject;
            }
            else {
                this._library = new FlumpLibrary(libraryFilepathOrLibraryJsonObject);
            }
        }
        FlumpAnimation.prototype.onTick = function (delta) {
            _super.prototype.onTick.call(this, delta);
            if (!this._paused) {
                this._time += delta;
            }
        };
        FlumpAnimation.prototype.preloadAssets = function (assets, complete) {
        };
        FlumpAnimation.prototype.play = function (label, repeat, queu) {
            if (label === void 0) { label = '*'; }
            if (repeat === void 0) { repeat = 1; }
            if (queu === void 0) { queu = false; }
        };
        FlumpAnimation.prototype.pause = function () {
            this._paused = true;
        };
        FlumpAnimation.prototype.resume = function () {
            this._paused = false;
        };
        FlumpAnimation.EVENT_ONLOAD = 'flumpAnimation.load';
        return FlumpAnimation;
    })(Container);
    return FlumpAnimation;
});
