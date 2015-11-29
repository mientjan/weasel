import Bitmap from "../display/Bitmap";
import BitmapNinePatch from "./BitmapNinePatch";

import DisplayObject from "../display/DisplayObject";
import DisplayType from "../enum/DisplayType";
import TimeEvent from "../../util/event/TimeEvent";
import Signal from "../../util/event/Signal";
import SignalConnection from "../../util/event/SignalConnection";
import IImageButtonData from "./imagebutton/IImageButtonData";
import * as Methods from "../../util/Methods";
import ButtonBehavior from "../behavior/ButtonBehavior";

/**
 * @class ImageSequence
 */
class ImageButton extends DisplayObject
{
	public static EVENT_DISABLED = 'disabled';

	public type:DisplayType = DisplayType.TEXTURE;

	private _bitmaps:IImageButtonData<Bitmap|BitmapNinePatch> = {
		idle: null,
		over: null,
		down: null,
		disabled: null
	};

	private _bitmap:BitmapNinePatch|Bitmap = null;

	/**
	 * idle, mouseover, mousedown, disabled
	 * @param {string[]} images
	 * @param {number} fps
	 * @param {string|number} width
	 * @param {string|number} height
	 * @param {string|number} x
	 * @param {string|number} y
	 * @param {string|number} regX
	 * @param {string|number} regY
	 */
	constructor(data:IImageButtonData<Bitmap|BitmapNinePatch>, width:any, height:any, x:any = 0, y:any = 0, regX:any = 0, regY:any = 0)
	{
		super(width, height, x, y, regX, regY);

		this.addBehavior( new ButtonBehavior() );

		this._bitmaps.idle = data.idle;
		if(data.over) this._bitmaps.over = data.over;
		if(data.down) this._bitmaps.down = data.down;
		if(data.disabled) this._bitmaps.disabled = data.disabled;

		this._bitmap = this._bitmaps.idle;

		this.addEventListener(ImageButton.EVENT_MOUSE_CLICK, (e) => {
			this._bitmap = this._bitmaps.idle;
		});

		if(this._bitmaps.over){
			this.addEventListener(ImageButton.EVENT_MOUSE_OVER, (e) => {
				this._bitmap = this._bitmaps.over;
			});
		}

		if(this._bitmaps.down){
			this.addEventListener(ImageButton.EVENT_MOUSE_DOWN, (e) => {
				this._bitmap = this._bitmaps.down;
			});
		}

		if(this._bitmaps.disabled){
			this.addEventListener(ImageButton.EVENT_DISABLED, (e) => {
				this._bitmap = this._bitmaps.disabled;
			});
		}
	}

	public disable():void
	{
		if(this._bitmaps.disabled)
		{
			this._bitmap = this._bitmaps.disabled; 
		}
	}

	public enable():void
	{
		if(this._bitmaps.idle)
		{
			this._bitmap = this._bitmaps.idle;
		}
	}

	public draw(ctx:CanvasRenderingContext2D, ignoreCache:boolean):boolean
	{
		this._bitmap.draw(ctx, ignoreCache);

		return true;
	}
}

export default ImageButton;