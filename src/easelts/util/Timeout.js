define(["require", "exports"], function (require, exports) {
    var Timeout = (function () {
        function Timeout(duration) {
            this._timeout = -1;
            this._duration = duration;
        }
        Timeout.prototype.call = function (callback, params, scope) {
            if (params === void 0) { params = []; }
            if (scope === void 0) { scope = window; }
            clearTimeout(this._timeout);
            this._timeout = setTimeout(function () {
                callback.apply(scope, params);
            }, this._duration);
            return this;
        };
        return Timeout;
    })();
    exports.default = Timeout;
});
