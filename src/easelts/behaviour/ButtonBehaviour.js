var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './AbstractBehaviour'], function (require, exports, AbstractBehaviour) {
    var ButtonBehaviour = (function (_super) {
        __extends(ButtonBehaviour, _super);
        function ButtonBehaviour() {
            var _this = this;
            _super.apply(this, arguments);
            this.onMouseOver = function () {
                _this.getStage();
                _this._stage.holder.style.cursor = 'pointer';
            };
            this.onMouseOut = function () {
                _this.getStage();
                _this._stage.holder.style.cursor = 'auto';
            };
        }
        ButtonBehaviour.prototype.initialize = function (displayObject) {
            _super.prototype.initialize.call(this, displayObject);
            this.owner.enableMouseInteraction();
            this.owner.addEventListener('mouseover', this.onMouseOver);
            this.owner.addEventListener('mouseout', this.onMouseOut);
        };
        ButtonBehaviour.prototype.getStage = function () {
            if (!this._stage) {
                this._stage = this.owner.getStage();
            }
            return this._stage;
        };
        ButtonBehaviour.prototype.destruct = function () {
            this._stage = null;
            this.owner.removeEventListener('mouseover', this.onMouseOver);
            this.owner.removeEventListener('mouseout', this.onMouseOut);
            _super.prototype.destruct.call(this);
        };
        return ButtonBehaviour;
    })(AbstractBehaviour);
    return ButtonBehaviour;
});
