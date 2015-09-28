import * as IFlumpLibrary from "../../interface/IFlumpLibrary";
import DisplayType from "../../enum/DisplayType";

import Rectangle from "../../geom/Rectangle";
import IContext2D from "../../interface/IContext2D";


class FlumpTexture
{
	public type:DisplayType = DisplayType.TEXTURE;
	//public time:number = 0.0;

	private bitmap:HTMLImageElement|HTMLCanvasElement;

	public originX:number;
	public originY:number;
	private x:number;
	private y:number;
	private width:number;
	private height:number;

	constructor(bitmap:HTMLImageElement|HTMLCanvasElement, json:IFlumpLibrary.ITexture)
	{

		//super(bitmap, new Rectangle(json.rect[0], json.rect[1], json.rect[2], json.rect[3]))
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

	}
}

 class Texture
{
	public type:DisplayType = DisplayType.TEXTURE;

	public originX:number;
	public originY:number;

	constructor(bitmap:HTMLCanvasElement|HTMLVideoElement|HTMLImageElement, json:IFlumpLibrary.ITexture)
	{
		const view = bitmap;

		this.originX = json.origin[0];
		this.originY = json.origin[1];

		const x = json.rect[0];
		const y = json.rect[1];
		const width = json.rect[2];
		const height = json.rect[3];

		this.draw = function(ctx:IContext2D):boolean
		{
			ctx.drawImage(<HTMLImageElement> view, x, y, width, height, 0, 0, width, height);
			return true;
		}
	}

	public draw:(ctx:IContext2D) => boolean;

	public reset():void {}
}

 export default Texture;