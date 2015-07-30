var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './AbstractBehavior'], function (require, exports, AbstractBehavior) {
    var AutoAssetBehavior = (function (_super) {
        __extends(AutoAssetBehavior, _super);
        function AutoAssetBehavior() {
            _super.call(this);
            this._elements = [];
        }
        AutoAssetBehavior.prototype.initialize = function (container) {
            _super.prototype.initialize.call(this, container);
        };
        return AutoAssetBehavior;
    })(AbstractBehavior);
    return AutoAssetBehavior;
});
