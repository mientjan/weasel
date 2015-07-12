import IFlumpLibrary  = require('./IFlumpLibrary');
import FlumpLibrary  = require('./FlumpLibrary');

export class MovieSymbol
{
	public name:string;

	public layers:Array<MovieLayer>;

	/**
	 * The total number of frames in this movie.
	 */
	public frames:number;

	/**
	 * The rate that this movie is played, in frames per second.
	 */
	public fps:number;

	/**
	 * The duration of this animation in seconds.
	 */
	public duration:number;

	constructor(lib:FlumpLibrary, data:IFlumpLibrary.IMovie)
	{
		var layers;

		this.name = data.id;
		this.fps = lib.fps;
		this.frames = 0.0;

		this.layers = layers = new Array(data.layers.length);

		for(var i = 0; i < layers.length; i++)
		{
			var layer = new MovieLayer(data.layers[i]);
			this.frames = Math.max(layer.frames, this.frames);
			this.layers[i] = layer;

		}

		this.duration = this.frames / this.fps;
	}

	//public createSprite():MovieSprite
	//{
	//	return new MovieSprite(this);
	//}
}

export class MovieLayer
{
	public name:string
	public keyframes:Array<MovieKeyframe>;
	public frames:number = 0;

	/** Whether this layer has no symbol instances. */
	public isEmpty:boolean = true;

	constructor(json:IFlumpLibrary.ILayer)
	{
		this.name = json.name;

		var prevKf = null;
		this.keyframes = new Array(json.keyframes.length);
		for(var i = 0; i < this.keyframes.length; i++)
		{
			prevKf = new MovieKeyframe(json.keyframes[i], prevKf);
			this.keyframes[i] = prevKf;

			this.isEmpty = this.isEmpty && prevKf.symbolName == null;
			this.frames = (prevKf != null) ? prevKf.index + prevKf.duration : 0;
		}
	}
}

export class MovieKeyframe
{
	public index:number = 0;

	/** The length of this keyframe in frames. */
	public duration:number;

	symbolName:string = '';
	public symbol:any = null;

	public label:string = '';

	public x:number = 0;
	public y:number = 0;
	public scaleX:number = 0;
	public scaleY:number = 0;
	public skewX:number = 0;
	public skewY:number = 0;

	public regX:number = 0;
	public regY:number = 0;

	public alpha:number = 1;

	public visible:boolean = true;

	/** Whether this keyframe should be tweened to the next. */
	public tweened:boolean = true;

	/** Easing amount, if tweened is true. */
	public ease:number = 0;

	constructor(json:IFlumpLibrary.IKeyframe, prevKf:MovieKeyframe)
	{
		this.index = (prevKf != null) ? prevKf.index + prevKf.duration : 0;

		this.duration = json.duration;
		this.label = json.label;
		this.symbolName = json.ref;

		var loc = json.loc;
		if (loc != null) {
			this.x = loc[0];
			this.y = loc[1];
		}

		var scale = json.scale;
		if (scale != null) {
			this.scaleX = scale[0];
			this.scaleY = scale[1];
		}

		var skew = json.skew;
		if (skew != null) {
			this.skewX = skew[0];
			this.skewY = skew[1];
		}

		var pivot = json.pivot;
		if (pivot != null) {
			this.regX = pivot[0];
			this.regY = pivot[1];
		}

		if (json.alpha != null) {
			this.alpha = json.alpha;
		}

		if (json.visible != null) {
			this.visible = json.visible;
		}

		if (json.tweened != null) {
			this.tweened = json.tweened;
		}

		if (json.ease != null) {
			this.ease = json.ease;
		}
	}
	//
	//public setVisible (visible :Bool)
	//{
	//	this.visible = visible;
	//}
	//
	//@:allow(flambe) inline function setSymbol (symbol :Symbol)
	//{
	//	this.symbol = symbol;
	//}
}