import Rectangle from "../geom/Rectangle";
import IDisplayObject from "../interface/IDisplayObject";
import IContext2D from "../interface/IContext2D";

/**
 * Base class For all bitmap type drawing.
 *
 * @class Texture
 */
export default class Texture
{
	private bitmap:HTMLCanvasElement|HTMLVideoElement|HTMLImageElement;
	private source:Rectangle;

	constructor(bitmap:HTMLCanvasElement|HTMLVideoElement|HTMLImageElement, source:Rectangle)
	{
		this.bitmap = bitmap;
		this.source = source;
	}

	public draw(ctx:IContext2D):boolean
	{
		var source = this.source, bitmap = <HTMLImageElement> this.bitmap, x = source.x, y = source.y, width = source.width, height = source.height;
		ctx.drawImage(bitmap, x, y, width, height, 0, 0, width, height);
		return true;
	}
}