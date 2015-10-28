import IRendererOptions from "./IRendererOptions";

class RendererOptions implements IRendererOptions
{
	public view:HTMLCanvasElement;
	public transparent:boolean;
	public autoResize:boolean;
	public antialias:boolean;
	public resolution:number;
	public clearBeforeRender:boolean;
	public roundPixels:boolean;

	constructor(options:IRendererOptions)
	{
		this.view = options.view || document.createElement('canvas');
		this.transparent = options.transparent || false;
		this.autoResize = options.autoResize || false;
		this.antialias = options.antialias || false;
		this.resolution = options.resolution || 1;
		this.clearBeforeRender = options.clearBeforeRender || true;
		this.roundPixels = options.roundPixels || false;
	}
}

export default RendererOptions;