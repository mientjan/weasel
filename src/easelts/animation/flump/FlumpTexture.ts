import * as IFlumpLibrary from "../../interface/IFlumpLibrary";
import DisplayType from "../../enum/DisplayType";

class FlumpTexture
{
	public type:DisplayType = DisplayType.TEXTURE;
	public time:number = 0.0;

	public bitmap:HTMLImageElement|HTMLCanvasElement;

	public originX:number;
	public originY:number;
	private x:number;
	private y:number;
	private width:number;
	private height:number;

	constructor(bitmap:HTMLImageElement|HTMLCanvasElement, json:IFlumpLibrary.ITexture)
	{
		this.bitmap = bitmap;
		this.originX = json.origin[0];
		this.originY = json.origin[1];
		this.x = json.rect[0];
		this.y = json.rect[1];
		this.width = json.rect[2];
		this.height = json.rect[3];
	}

	public draw(ctx:CanvasRenderingContext2D):boolean
	{
		var bitmap = this.bitmap, x = this.x, y = this.y, width = this.width, height = this.height;
		ctx.drawImage(<HTMLImageElement> bitmap, x, y, width, height, 0, 0, width, height);
		return true;
	}

	public reset():void
	{
		this.time = 0.0;
	}
}

export default FlumpTexture;