import Rectangle from "../geom/Rectangle";
import IDisplayObject from "../interface/IDisplayObject";

/**
 * Base class For all bitmap type drawing.
 *
 * @class Texture
 */
export default class Texture
{
	public bitmap:HTMLCanvasElement|HTMLVideoElement|HTMLImageElement;

	public x:number;
	public y:number;

	public w:number;
	public h:number;

	public dx:number;
	public dy:number;

	public dw:number;
	public dh:number;

	constructor(bitmap:HTMLCanvasElement|HTMLVideoElement|HTMLImageElement, source:Rectangle, dest?:Rectangle)
	{
		var view = bitmap, x = source.x, y = source.y, width = source.width, height = source.height;

		this.bitmap = view;
		this.x = x;
		this.y = y;
		this.w = width;
		this.h = height;

		if(!dest)
		{
			this.dx = x;
			this.dy = y;
			this.dw = width;
			this.dh = height;
		} else {
			this.dx = dest.x;
			this.dy = dest.y;
			this.dw = dest.width;
			this.dh = dest.height;
		}
	}

	public draw(ctx:CanvasRenderingContext2D):boolean
	{
		ctx.drawImage(<HTMLImageElement> this.bitmap, this.x, this.y, this.w, this.h, this.dx, this.dy, this.dw, this.dh);
		return true;
	}

	public drawWebGL(ctx:WebGLRenderingContext):boolean
	{
		// ctx.drawImage(<HTMLImageElement> this.bitmap, this.x, this.y, this.width, this.height, 0, 0, this.width, this.height);
		return true;
	}
}