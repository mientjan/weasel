import DisplayObject = require('../../display/DisplayObject');
import IHashMap = require('../../interface/IHashMap');
import FlumpLibrary = require('./FlumpLibrary');
import FlumpMovieLayer = require('./FlumpMovieLayer');
import FlumpLabelData = require('./FlumpLabelData');
import FlumpLabelQueueData = require('./FlumpLabelQueueData');
import IFlumpLibrary = require('./IFlumpLibrary');


class FlumpMovie extends DisplayObject {

	public static EVENT_COMPLETE = 'FlumpMovie.Complete';

	public flumpLibrary:FlumpLibrary;
	public flumpMovieData;
	public flumpMovieLayers:Array<FlumpMovieLayer> = [];

	public labels:IHashMap<FlumpLabelData> = {};
	public labelQueue:Array<FlumpLabelQueueData> = [];
	public currentLabel:FlumpLabelQueueData = null;

	public paused:boolean = true;

	public time:number = 0.0;
	public duration = 0.0;
	public frame:number = 0;
	public frames:number = 0;



	// ToDo: add features like playOnce, playTo, goTo, loop, stop, isPlaying, label events, ...

	constructor( flumpLibrary:FlumpLibrary, name:string)
	{
		super();

		this.flumpLibrary = flumpLibrary;
		this.flumpMovieData = flumpLibrary.getFlumpMovieData(name);
		

		var layers = this.flumpMovieData.flumpLayerDatas;
		for(var i = 0; i < layers.length; i++)
		{
			var layerData = layers[i];
			var flashMovieLayer = new FlumpMovieLayer(this, layerData);
			this.flumpMovieLayers.push(flashMovieLayer);
		}

		this.frames = this.flumpMovieData.frames;

		flumpLibrary.frameRate = 25;

		// convert to milliseconds
		this.duration = ( this.frames / flumpLibrary.frameRate ) * 1000;
	}

	public play(times:number = 1, label:string = null, addToQeue:boolean = true):void
	{
		this.time = 0;
		this.frame = 0;

		if( label == null )
		{
			this.labelQueue.push(new FlumpLabelQueueData(label, 0, this.frames, times))
		}
		else
		{
			var queue = this.labels[label];
			this.labelQueue.push(new FlumpLabelQueueData(queue.label, queue.index, queue.duration, times))

		}

		if(!addToQeue){
			this.gotoNextLabel();
			this.labelQueue.length = 0;
		}

		if(!this.currentLabel){
			this.gotoNextLabel();
		}


		this.paused = false;
	}

	private gotoNextLabel():FlumpLabelQueueData
	{

		this.currentLabel = this.labelQueue.shift();
		this.time = 0;

		return this.currentLabel;
	}

	public stop():void
	{
		this.paused = true;

		this.dispatchEvent(FlumpMovie.EVENT_COMPLETE);
	}

	public onTick(delta:number):void
	{
		super.onTick(delta);

		if(!this.paused)
		{
			var label = this.currentLabel;
			this.time += delta;
			var frame = Math.floor((this.frames * this.time) / this.duration);

			if( label.times != -1 )
			{
				if( label.times - Math.ceil((frame+2) / label.duration) == -1 )
				{
					if( this.labelQueue.length > 0 )
					{
						this.gotoNextLabel();
					} else {
						this.stop();
						return;
					}
				}
			}

			this.frame = label.index + ( frame % label.duration );

			for(var i = 0; i < this.flumpMovieLayers.length; i++)
			{
				var layer = this.flumpMovieLayers[i];
				layer.onTick(delta);
				layer.setFrame(this.frame);
			}

		}
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
				ctx.globalAlpha *= layer.alpha;
				ctx.transform(layer._storedMtx.a,layer._storedMtx.b,layer._storedMtx.c,layer._storedMtx.d,layer._storedMtx.tx,layer._storedMtx.ty);

				layer.draw(ctx);
				ctx.restore();
			}
		}
		//console.timeEnd('draw');

		return true;
	}

}

export = FlumpMovie;