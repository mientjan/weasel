import Rectangle from "../geom/Rectangle";
import BitmapType from "../enum/BitmapType";
import IDisplayObject from "../interface/IDisplayObject";
import Signal from "../../createts/event/Signal";
import Promise from "../../createts/util/Promise";
import ILoadable from "../interface/ILoadable";

/**
 * Base class For all bitmap type drawing.
 *
 * @class Texture
 */
class Texture implements ILoadable<Texture>
{
	public bitmapType:BitmapType = BitmapType.UNKNOWN;

	public bitmap:HTMLImageElement;
	public webGLTexture:WebGLTexture = null;

	public width:number = 0;
	public height:number = 0;

	protected _loadPromise:Promise<Texture> = null;
	protected _isLoaded:boolean = false;

	constructor(bitmap:string|HTMLImageElement, autoLoad:boolean = false)
	{
		if(typeof bitmap == 'string')
		{
			var img = <HTMLImageElement> document.createElement('img');
			img.src = <string> bitmap;
			this.bitmap = img;
		} else {
			this.bitmap = <HTMLImageElement> bitmap;
		}

		if(autoLoad)
		{
			this.load();
		}
	}

	public isLoaded():boolean
	{
		return this._isLoaded
	}

	public load( onProgress?:(progress:number) => any):Promise<Texture>
	{
		if( this._isLoaded )
		{
			if(onProgress) onProgress(1);

			return new Promise<Texture>((resolve:Function, reject:Function) => {
				resolve(this);
			});
		}

		return new Promise<Texture>((resolve:(result:Texture) => any, reject:Function) => this._load(resolve) );
	}

	protected _load(onComplete:(result:Texture) => any)
	{
		var bitmap:any = this.bitmap;
		var tagName:string = '';

		if( bitmap ){
			tagName = bitmap.tagName.toLowerCase();
		}

		switch(tagName)
		{
			case 'img':
			{
				if( (bitmap['complete'] || bitmap['getContext'] || bitmap['readyState'] >= 2) ){
					this.initImage(bitmap);
				} else {
					( <HTMLImageElement> bitmap).addEventListener('load', () => {
						this.initImage(bitmap);
						onComplete(this);
					} );
				}
				break;
			}

			case 'video':
			{
				// image = <HTMLVideoElement> image;
				this.bitmapType = BitmapType.VIDEO;

				if( this.width == 0 || this.height == 0 ){
					throw new Error('width and height must be set when using canvas / video');
				}

				if( ( <HTMLVideoElement> bitmap ).readyState == 1 )
				{
					this.initVideo(bitmap);
				} else {
					( <HTMLImageElement> bitmap).addEventListener('loadedmetadata', () => {
						this.initVideo(bitmap);
						onComplete(this);
					} );
				}
				break;
			}

			case 'canvas':
			{
				// image = <HTMLCanvasElement> image;
				this.bitmapType = BitmapType.CANVAS;

				if( this.width == 0 || this.height == 0 ){
					throw new Error('width and height must be set when using canvas / video');
				}

				this.initCanvas(bitmap);
				onComplete(this);
				break;
			}
		}
	}

	protected initImage(image:HTMLImageElement):void
	{
		this.width = image.naturalWidth;
		this.height = image.naturalHeight;

		this._isLoaded = true;
	}


	protected initCanvas(canvas:HTMLCanvasElement):void
	{
		this.width = canvas.width;
		this.height = canvas.height;

		this._isLoaded = true;
	}

	protected initVideo(video:HTMLVideoElement):void
	{
		this.width = video.width;
		this.height = video.height;

		this._isLoaded = true;
	}

	public getWidth():number
	{
		return this.width;
	}

	public getHeight():number
	{
		return this.height;
	}


	public draw(ctx:CanvasRenderingContext2D, sx:number, sy:number, sw:number, sh:number, dx:number, dy:number, dw:number, dh:number):boolean
	{
		ctx.drawImage( <HTMLImageElement> this.bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
		return true;
	}

	public drawWebGL(ctx:WebGLRenderingContext, sx:number, sy:number, sw:number, sh:number, dx:number, dy:number, dw:number, dh:number):boolean
	{
		//ctx.drawImage( <HTMLImageElement> this.bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
		return true;
	}

	public bindTexture(ctx:WebGLRenderingContext)
	{
		var bitmap = this.bitmap;

		if(this.isLoaded())
		{
			// Create and use a new texture for this image if it doesn't already have one:
			if(!this.webGLTexture)
			{
				var texture:WebGLTexture = this.webGLTexture = ctx.createTexture();
				ctx.bindTexture(ctx.TEXTURE_2D, texture);
				ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, bitmap);
				ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
				ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.LINEAR);
				ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
				ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
			}
			return texture;
		}
	};
}

export default Texture;