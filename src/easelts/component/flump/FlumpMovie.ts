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

		for(var i = 0; i < this.flumpMovieData.length; i++)
		{
			var movieData = this.flumpMovieData[i];
			var flashMovieLayer = new FlumpMovieLayer(flumpLibrary, movieData.flumpLayerData);
			this.flumpMovieLayers.push(flashMovieLayer);

		}

		this.frames = this.flumpMovieData.frames;
		this.duration = this.frames / flumpLibrary.frameRate;
	}

	public onTick(delta:number)
	{
		this.time += delta;

		var frameTime = this.time % this.duration;
		//this.frame = Math.min(this.frames * frameTime ~/ this.duration, this.frames - 1);
		this.frame = Math.min( Math.floor((this.frames * frameTime) / this.duration), this.frames - 1);

		for(var i = 0; i < this.flumpMovieLayers.length; i++)
		{
			var layer = this.flumpMovieLayers[i];
			layer.advanceTime(this.time);
			layer.setFrame(this.frame);

		}

		return true;
	}

	//void render(RenderState renderState) {
	////	for(var flumpMovieLayer in _flumpMovieLayers) {
	////		if (flumpMovieLayer.visible) {
	////			renderState.renderObject(flumpMovieLayer);
	////		}
	////	}
	//}

	public draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean):boolean
	{
		return true;
	}

}

export = FlumpMovie;