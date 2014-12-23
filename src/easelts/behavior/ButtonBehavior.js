var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './AbstractBehavior', '../display/DisplayObject'], function (require, exports, AbstractBehavior, DisplayObject) {
    var ButtonBehaviour = (function (_super) {
        __extends(ButtonBehaviour, _super);
        function ButtonBehaviour() {
            _super.apply(this, arguments);
        }
        ButtonBehaviour.prototype.initialize = function (displayObject) {
            _super.prototype.initialize.call(this, displayObject);
            this.owner.enableMouseInteraction();
            this.owner.cursor = 'pointer';
            if (typeof (this.owner['onClick']) == 'function') {
                this.owner.addEventListener(DisplayObject.EVENT_MOUSE_CLICK, this.owner['onClick'].bind(this.owner));
            }
            if (typeof (this.owner['onPointerOver']) == 'function') {
                this.owner.addEventListener(DisplayObject.EVENT_MOUSE_MOUSEOVER, this.owner['onPointerOver'].bind(this.owner));
            }
            if (typeof (this.owner['onPointerOut']) == 'function') {
                this.owner.addEventListener(DisplayObject.EVENT_MOUSE_MOUSEOUT, this.owner['onPointerOut'].bind(this.owner));
            }
        };
        ButtonBehaviour.prototype.destruct = function () {
            this._stage = null;
            _super.prototype.destruct.call(this);
        };
        return ButtonBehaviour;
    })(AbstractBehavior);
    return ButtonBehaviour;
});
