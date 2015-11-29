///<reference path="../../assets/scripts/lib/gsap/greensock.d.ts" />

import ButtonBehavior from "../../../src/draw/behavior/ButtonBehavior";
import BitmapNinePatch from "../../../src/draw/component/BitmapNinePatch";
import Rectangle from "../../../src/draw/geom/Rectangle";
import NinePatch from "../../../src/draw/component/bitmapninepatch/NinePatch";
import DisplayObject from "../../../src/draw/display/DisplayObject";
import Text from "../../../src/draw/display/Text";
import Container from "../../../src/draw/display/Container";

class TopButton extends Container<DisplayObject>
{
	private _ninepatch:NinePatch = new NinePatch('assets/image/ninepatch_blue.png', new Rectangle(5, 12, 139, 8) );
	private _bg:BitmapNinePatch = new BitmapNinePatch(this._ninepatch);
	private _text:Text = new Text('top');

	constructor()
	{
		super(10, 10, '50%', '0%', '50%', '0%');

		this.addBehavior(new ButtonBehavior);
		this.hitArea = this._bg;

		this.addChild(this._bg);
		this.addChild(this._text);

	}
}

export default TopButton;