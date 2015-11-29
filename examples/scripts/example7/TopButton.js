///<reference path="../../assets/scripts/lib/gsap/greensock.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../../src/draw/behavior/ButtonBehavior", "../../../src/draw/component/BitmapNinePatch", "../../../src/draw/geom/Rectangle", "../../../src/draw/component/bitmapninepatch/NinePatch", "../../../src/draw/display/Text", "../../../src/draw/display/Container"], function (require, exports, ButtonBehavior_1, BitmapNinePatch_1, Rectangle_1, NinePatch_1, Text_1, Container_1) {
    var TopButton = (function (_super) {
        __extends(TopButton, _super);
        function TopButton() {
            _super.call(this, 10, 10, '50%', '0%', '50%', '0%');
            this._ninepatch = new NinePatch_1.default('assets/image/ninepatch_blue.png', new Rectangle_1.default(5, 12, 139, 8));
            this._bg = new BitmapNinePatch_1.default(this._ninepatch);
            this._text = new Text_1.default('top');
            this.addBehavior(new ButtonBehavior_1.default);
            this.hitArea = this._bg;
            this.addChild(this._bg);
            this.addChild(this._text);
        }
        return TopButton;
    })(Container_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TopButton;
});
