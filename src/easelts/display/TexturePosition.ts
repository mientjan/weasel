import Rectangle from "../geom/Rectangle";
import IDisplayObject from "../interface/IDisplayObject";
import Texture from "./Texture";

/**
 * Base class For all bitmap type drawing.
 *
 * @class Texture
 */
class TexturePosition
{
	public texture:Texture;

	public x:number;
	public y:number;
	public width:number;
	public height:number;

	public destX:number;
	public destY:number;
	public destWidth:number;
	public destHeight:number;

	constructor(texture:Texture, x:number, y:number, width:number, height:number, destX:number = 0, destY:number = 0, destWidth?:number, destHeight?:number)
	{
		this.texture = texture;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.destX = destX;
		this.destY = destY;
		this.destWidth = destWidth || width;
		this.destHeight = destHeight || height;
	}

	public setPosition(x:number, y:number, w:number, h:number, dx:number, dy:number, dw:number, dh:number ):void
	{
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;

		this.destX = dx;
		this.destY = dy;
		this.destWidth = dw;
		this.destHeight = dh;
	}

	public getSourceRectangle():Rectangle
	{
		return new Rectangle(this.x, this.y, this.width, this.height );
	}

	public getDestinationRectangle():Rectangle
	{
		return new Rectangle(this.destX, this.destY, this.destWidth, this.destHeight );
	}

	public draw(ctx:CanvasRenderingContext2D):boolean
	{
		this.texture.draw(ctx, this.x, this.y, this.width, this.height, this.destX, this.destY, this.destWidth, this.destHeight);
		return true;
	}

	public drawWebGL(ctx:WebGLRenderingContext):boolean
	{
		this.texture.drawWebGL(ctx, this.x, this.y, this.width, this.height, this.destX, this.destY, this.destWidth, this.destHeight);
		return true;
	}
	//
	//public drawWebGL(ctx:WebGLRenderingContext):boolean
	//{
	//	// ctx.drawImage(<HTMLImageElement> this.bitmap, this.x, this.y, this.width, this.height, 0, 0, this.width, this.height);
	//	return true;
	//}
}

export default TexturePosition;