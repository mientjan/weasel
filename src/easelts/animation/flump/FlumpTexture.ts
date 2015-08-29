import IFlumpLibrary = require('../../interface/IFlumpLibrary');

class FlumpTexture {

	public time:number = 0.0;
	public bitmap:HTMLImageElement|HTMLCanvasElement;
	public originX:number;
	public originY:number;
	public x:number;
	public y:number;
	public width:number;
	public height:number;

	constructor( bitmap:HTMLImageElement|HTMLCanvasElement, json:IFlumpLibrary.ITexture)
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
		ctx.drawImage( <HTMLImageElement> this.bitmap, this.x, this.y, this.width, this.height, 0, 0, this.width, this.height);
		return true;
	}

	public reset():void
	{
		this.time = 0.0;
	}
}

export = FlumpTexture;