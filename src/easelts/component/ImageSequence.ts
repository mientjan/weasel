import Bitmap = require('../display/Bitmap');
import TimeEvent = require('../../createts/event/TimeEvent');
import Signal = require('../../createts/event/Signal');
import SignalConnection = require('../../createts/event/SignalConnection');

/**
 * @class ImageSequence
 */
class ImageSequence extends Bitmap
{
	public _playing = false;
	public _timeIndex:number = -1;
	public _frame:number = -1;
	public _fps:number = 0;
	public _length:number = 0;
	public _images:HTMLImageElement[] = [];

	private _onComplete:Function = null;
	private _times:number = 1;

	/**
	 *
	 * @param {string[]} images
	 * @param {number} fps
	 * @param {string|number} width
	 * @param {string|number} height
	 * @param {string|number} x
	 * @param {string|number} y
	 * @param {string|number} regX
	 * @param {string|number} regY
	 */
	constructor(images:HTMLImageElement[], fps:number, width:any, height:any, x:any = 0, y:any = 0, regX:any = 0, regY:any = 0)
	{
		super(images[0], width, height, x, y, regX, regY);

		for(var i = 0; i < images.length; i++)
		{
			this._images.push( images[i] );
		}

		this._fps = 1000 / fps;
		this._length = images.length;
	}

	public draw(ctx:CanvasRenderingContext2D, ignoreCache:boolean):boolean
	{
		ctx.drawImage(this.image, 0, 0);

		return true;
	}

	public play(times = 1, onComplete:Function = null):void
	{
		this._frame = 0;
		this._times = times;
		this._onComplete = onComplete;
		this._playing = true;
	}

	public stop():void
	{
		this._playing = false;
		this._timeIndex = -1;
		this._frame = -1;

		if(this._onComplete)
		{
			this._onComplete.call(null);
			//			this._onComplete = null;
		}
	}

	public onTick(delta:number):void
	{
		var playing = this._playing;

		if(playing)
		{
			if(this._timeIndex < 0)
			{
				this._timeIndex = 0;
			}

			var time = this._timeIndex += delta;
			var fps = this._fps;
			var length = this._length;
			var times = this._times;
			var frame = Math.floor(time / fps);
			var currentFrame = this._frame;

			if(times > -1 && !(times - Math.floor(frame / length)))
			{
				this.stop();
			}
			else
			{
				frame %= length;

				if(currentFrame != frame)
				{
					this._frame = frame;
					this.image = this._images[frame];
				}
			}

		}
	}

}

export = ImageSequence;