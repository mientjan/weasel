import DisplayObject = require('../../display/DisplayObject');
import FlumpLibrary = require('./FlumpLibrary');
import FlumpMovieLayer = require('./FlumpMovieLayer');
import IFlumpLibrary = require('./IFlumpLibrary');


class FlumpMovie extends DisplayObject {

	private _flumpLibrary:FlumpLibrary;
	public flumpMovieData;
	public flumpMovieLayers:Array<FlumpMovieLayer> = [];

	time:number = 0.0;
	duration = 0.0;
	frame:number = 0;
	frames:number = 0;

	// ToDo: add features like playOnce, playTo, goTo, loop, stop, isPlaying, label events, ...

	constructor( flumpLibrary:FlumpLibrary, name:string)
	{
		super();

		this._flumpLibrary = flumpLibrary;
		this.flumpMovieData = flumpLibrary.getFlumpMovieData(name);

		

		var layers = this.flumpMovieData.flumpLayerDatas;
		for(var i = 0; i < layers.length; i++)
		{
			var layerData = layers[i];
			var flashMovieLayer = new FlumpMovieLayer(flumpLibrary, layerData);
			this.flumpMovieLayers.push(flashMovieLayer);

		}

		this.frames = this.flumpMovieData.frames;
		this.duration = this.frames / flumpLibrary.frameRate;
	}

	public onTick(delta:number)
	{
		super.onTick(delta);

		var nDelta = delta / 1000;

		this.time += nDelta;

		var frameTime = this.time % this.duration;
		//this.frame = Math.min(this.frames * frameTime ~/ this.duration, this.frames - 1);
		this.frame = Math.min( Math.floor((this.frames * frameTime) / this.duration), this.frames - 1);

		for(var i = 0; i < this.flumpMovieLayers.length; i++)
		{
			var layer = this.flumpMovieLayers[i];
			layer.onTick(nDelta);
			layer.setFrame(this.frame);

		}

		return true;
	}

	public draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean):boolean
	{
		//console.time('draw');
		var layers = this.flumpMovieLayers;
		for(var i = 0; i < layers.length; i++)
		{
			var layer:FlumpMovieLayer = layers[i];

			if(layer.visible)
			{
				ctx.save();
				//layer.updateContext(ctx);
				ctx.transform(layer._storedMtx.a,layer._storedMtx.b,layer._storedMtx.c,layer._storedMtx.d,layer._storedMtx.tx,layer._storedMtx.ty)
				layer.draw(ctx);
				ctx.restore();
			}
		}
		//console.timeEnd('draw');

		return true;
	}

}

export = FlumpMovie;