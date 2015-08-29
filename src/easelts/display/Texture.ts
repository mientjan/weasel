import Rectangle = require("../geom/Rectangle");
import IDisplayObject = require("../interface/IDisplayObject");

/**
 * Base class For all bitmap type drawing.
 *
 * @class Texture
 */
class Texture
{
	public bitmap:HTMLCanvasElement|HTMLVideoElement|HTMLImageElement;
	public source:Rectangle;

	constructor(bitmap:HTMLCanvasElement|HTMLVideoElement|HTMLImageElement, source:Rectangle)
	{
		this.bitmap = bitmap;
		this.source = source;
	}

	public draw(ctx:CanvasRenderingContext2D):boolean
	{
		var source = this.source;
		ctx.drawImage(this.bitmap, source.x, source.y, source.width, source.height, 0, 0, source.width, source.height);
		return true;
	}
}