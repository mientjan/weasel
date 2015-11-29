///<reference path="../../assets/scripts/lib/gsap/greensock.d.ts" />


import Container from "../../../src/draw/display/Container";
import DisplayObject from "../../../src/draw/display/DisplayObject";
import Text from "../../../src/draw/display/Text";
import NinePatch from "../../../src/draw/component/bitmapninepatch/NinePatch";
import Rectangle from "../../../src/draw/geom/Rectangle";
import BitmapNinePatch from "../../../src/draw/component/BitmapNinePatch";
import ButtonBehavior from "../../../src/draw/behavior/ButtonBehavior";
class BottomButton extends Container<DisplayObject>
{
	private _ninepatch:NinePatch = new NinePatch('assets/image/ninepatch_blue.png', new Rectangle(5, 12, 139, 8) );
	private _bg:BitmapNinePatch = new BitmapNinePatch(this._ninepatch);
	private _text:Text = new Text('bottom');

	constructor()
	{
		super(200, 50, '50%', '100%', '50%', '100%');

		this.addBehavior(new ButtonBehavior);
		this.hitArea = this._bg;
		this.addChild(this._bg);
		this.addChild(this._text);

	}
}

export default BottomButton;