import IBuffer from "../../interface/IBuffer";
import RGBA from "../../data/RGBA";

/**
 * Creates a Canvas element of the given size.
 *
 * @class CanvasBuffer
 * @param width {number} the width for the newly created canvas
 * @param height {number} the height for the newly created canvas
 */
class CanvasBuffer implements IBuffer
{
	/**
	 * The Canvas object that belongs to this CanvasBuffer.
	 *
	 * @member {HTMLCanvasElement}
	 */
	public element:HTMLCanvasElement;
	public context:CanvasRenderingContext2D;

	public transparent:boolean = true;
	public background:RGBA = null;

	protected _width:number;
	protected _height:number;

	constructor(width:number, height:number, element:HTMLCanvasElement = document.createElement('canvas'))
	{
		this.element = element;
		this.context = this.element.getContext('2d');

		this.setSize(width, height);
	}

	set width(value:number)
	{
		this._width = value;
		this.element.width = value;
	}

	get width():number
	{
		return this._width;
	}

	set height(value:number)
	{
		this._height = value;
	}

	get height():number
	{
		return this._height;
	}

	public draw(ctx:CanvasRenderingContext2D):void
	{
		var w = this._width, h = this._height;
		ctx.drawImage(this.element, 0, 0, w, h, 0, 0, w, h);
	}

	public reset():void
	{
		this.context.setTransform(1, 0, 0, 1, 0, 0);
		this.context.clearRect(0, 0, this._width, this._height);
	}

	public clear():void
	{
		//if(this.transparent)
		//{
			this.context.clearRect(0, 0, this._width, this._height);
		//} else {
		//	this.context.fillStyle = this.background.toString();
		//	this.context.fillRect(0, 0, this._width, this._height);
		//}
	}

	/**
	 * Returns the content of the current canvas as an image that you can use as a source for another canvas or an HTML element.
	 * @param type The standard MIME type for the image format to return. If you do not specify this parameter, the default value is a PNG format image.
	 */
	public getDataUrl(type:string, args:any[])
	{
		return this.element.toDataURL(type, args);
	}

	/**
	 *
	 * @param width
	 * @param height
	 */
	public setSize(width:number, height:number):void
	{
		this.element.width = this._width = width;
		this.element.height = this._height = height;
	}

	/**
	 *
	 */
	public destruct():void
	{
		this.context = null;
		this.element = null;
	}
}

export default CanvasBuffer;