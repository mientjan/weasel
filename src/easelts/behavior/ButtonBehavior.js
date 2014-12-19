var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './AbstractBehavior'], function (require, exports, AbstractBehaviour) {
    var ButtonBehaviour = (function (_super) {
        __extends(ButtonBehaviour, _super);
        function ButtonBehaviour() {
            _super.apply(this, arguments);
        }
        ButtonBehaviour.prototype.initialize = function (displayObject) {
            _super.prototype.initialize.call(this, displayObject);
            this.owner.enableMouseInteraction();
            this.owner.cursor = 'pointer';
        };
        ButtonBehaviour.prototype.getStage = function () {
            if (!this._stage) {
                this._stage = this.owner.getStage();
            }
            return this._stage;
        };
        ButtonBehaviour.prototype.destruct = function () {
            this._stage = null;
            _super.prototype.destruct.call(this);
        };
        return ButtonBehaviour;
    })(AbstractBehaviour);
    return ButtonBehaviour;
});
