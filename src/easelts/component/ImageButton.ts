import Bitmap = require('../display/Bitmap');
import TimeEvent = require('../../createts/event/TimeEvent');
import Signal = require('../../createts/event/Signal');
import SignalConnection = require('../../createts/event/SignalConnection');
import IImageButtonData = require('./imagebutton/IImageButtonData');
import Methods = require('../util/Methods');
import ButtonBehavior = require('../behavior/ButtonBehavior');

/**
 * @class ImageSequence
 */
class ImageButton extends Bitmap
{
	public static EVENT_DISABLED = 'disabled';
	public _images:IImageButtonData<HTMLImageElement> = {
		idle: null,
		over: null,
		down: null,
		disabled: null
	};

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
	constructor(data:IImageButtonData<HTMLImageElement>|IImageButtonData<string>, width:any, height:any, x:any = 0, y:any = 0, regX:any = 0, regY:any = 0)
	{
		super(data.idle, width, height, x, y, regX, regY);

		this.addBehavior( new ButtonBehavior() );


		if( typeof data.idle == 'string' ){
			this._images.idle = this.image;
			if(data.over) this._images.over = Methods.createImage(<string> data.over);
			if(data.down) this._images.down = Methods.createImage(<string> data.down);
			if(data.disabled) this._images.disabled = Methods.createImage(<string> data.disabled);
		} else {
			this._images.idle = this.image;
			if(data.over) this._images.over = <HTMLImageElement> data.over;
			if(data.down) this._images.down = <HTMLImageElement> data.down;
			if(data.disabled) this._images.disabled = <HTMLImageElement> data.disabled;
		}

		this.addEventListener(ImageButton.EVENT_MOUSE_CLICK, (e) => {
			this.image = this._images.idle;
		});

		if(this._images.over){
			this.addEventListener(ImageButton.EVENT_MOUSE_OVER, (e) => {
				this.image = this._images.over;
			});
		}

		if(this._images.down){
			this.addEventListener(ImageButton.EVENT_DISABLED, (e) => {
				this.image = this._images.down;
			});
		}

		if(this._images.disabled){
			this.addEventListener(ImageButton.EVENT_DISABLED, (e) => {
				this.image = this._images.disabled;
			});
		}
	}

	public disable(){
		if(this._images.disabled){
			this.image = this._images.disabled;
		}
	}

	public enable(){
		if(this._images.idle){
			this.image = this._images.idle;
		}
	}

	public draw(ctx:CanvasRenderingContext2D, ignoreCache:boolean)
	{
		ctx.drawImage(this.image, 0, 0);

		return true;
	}
}

export = ImageButton;