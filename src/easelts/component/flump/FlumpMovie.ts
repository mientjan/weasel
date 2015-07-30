import DisplayObject = require('../../display/DisplayObject');

import IHashMap = require('../../interface/IHashMap');
import IFlumpLibrary = require('../../interface/IFlumpLibrary');
import IPlayable = require('../../interface/IPlayable');

import FlumpLibrary = require('../FlumpLibrary');
import FlumpMovieLayer = require('./FlumpMovieLayer');
import FlumpLabelData = require('./FlumpLabelData');
import FlumpLabelQueueData = require('./FlumpLabelQueueData');


class FlumpMovie extends DisplayObject implements IPlayable
{
	public static EVENT_COMPLETE = 'FlumpMovie.Complete';

	public flumpLibrary:FlumpLibrary;
	public flumpMovieData;
	public flumpMovieLayers:Array<FlumpMovieLayer>;

	private _labels:IHashMap<FlumpLabelData> = {};
	private _labelQueue:Array<FlumpLabelQueueData> = [];
	private _label:FlumpLabelQueueData = null;

	private hasFrameCallbacks:boolean = false;
	private _frameCallback:Array<(delta:number) => any>;

	public paused:boolean = true;

	public name:string;
	public time:number = 0.0;
	public duration = 0.0;
	public frame:number = 0;
	public frames:number = 0;

	// ToDo: add features like playOnce, playTo, goTo, loop, stop, isPlaying, label events, ...

	constructor( flumpLibrary:FlumpLibrary, name:string, width:any = 1, height:any = 1, x:any = 0, y:any = 0, regX:any = 0, regY:any = 0)
	{
		super(width, height, x, y, regX, regY);

		this.name = name;
		this.flumpLibrary = flumpLibrary;
		this.flumpMovieData = flumpLibrary.getFlumpMovieData(name);

		var layers = this.flumpMovieData.flumpLayerDatas;
		var length = layers.length;
		var movieLayers = new Array(length);

		for(var i = 0; i < length; i++)
		{
			var layerData = layers[i];
			movieLayers[i] = new FlumpMovieLayer(this, layerData);
		}

		this.flumpMovieLayers = movieLayers;
		this.frames = this.flumpMovieData.frames;
		this._frameCallback = new Array(this.frames);
		for(var i = 0; i < this.frames; i++)
		{
			this._frameCallback[i] = null;
		}

		// convert to milliseconds
		this.duration = ( this.frames / flumpLibrary.frameRate ) * 1000;
	}

	public play(times:number = 1, label:string = null, complete?:() => any):FlumpMovie
	{
		this.visible = true;

		var labelQueueData:FlumpLabelQueueData;

		if( label == null || label == '*' )
		{
			labelQueueData = new FlumpLabelQueueData(label, 0, this.frames, times, 0)
			this._labelQueue.push(labelQueueData);
		}
		else
		{
			var queue = this._labels[label];

			if(!queue)
			{
				console.warn('unknown label:', label, 'on',  this.name );
				throw new Error('unknown label:' + label + ' | ' + this.name );
			}

			labelQueueData = new FlumpLabelQueueData(queue.label, queue.index, queue.duration, times, 0);

			this._labelQueue.push(labelQueueData);
		}

		if(complete)
		{
			labelQueueData.then(complete);
		}

		if(!this._label){
			this.gotoNextLabel();
		}

		this.paused = false;

		return this;
	}

	public resume():FlumpMovie
	{
		this.paused = false;
		return this;
	}

	public pause():FlumpMovie
	{
		this.paused = true;
		return this;
	}

	public end(all:boolean = false):FlumpMovie
	{
		if(all)
		{
			this._labelQueue.length = 0;
		}

		this._label.times = 1;
		return this;
	}

	public setFrameCallback(frameNumber:number, callback:() => any, triggerOnce:boolean = false):FlumpMovie
	{
		this.hasFrameCallbacks = true;

		if(triggerOnce)
		{
			this._frameCallback[frameNumber] = (delta:number) => {
				callback.call(this, delta);
				this.setFrameCallback(frameNumber, null);
			};
		}
		else
		{
			this._frameCallback[frameNumber] = callback;
		}
		return this;
	}

	private gotoNextLabel():FlumpLabelQueueData
	{
		if(this._label)
		{
			this._label.finish();
			this._label.destruct();
		}

		this._label = this._labelQueue.shift();
		this.time = 0;

		return this._label;
	}

	public stop():FlumpMovie
	{
		this.paused = true;

		if(this._label)
		{
			this._label.finish();
			this._label.destruct();
		}


		this.dispatchEvent(FlumpMovie.EVENT_COMPLETE);
		return this;
	}

	public onTick(delta:number):void
	{
		super.onTick(delta);

		if(this.paused == false)
		{
			this.time += delta;

			var label = this._label;
			var fromFrame = this.frame;
			var toFrame = Math.floor((this.frames * this.time) / this.duration);

			if( label )
			{

				if( label.times != -1 )
				{
					if( label.times - Math.ceil((toFrame+2) / label.duration) < 0 )
					{
						if( this._labelQueue.length > 0 )
						{
							this.gotoNextLabel();
						} else {
							this.stop();
							return;
						}
					}
				}

				toFrame = label.index + ( toFrame % label.duration );

				if( this.hasFrameCallbacks )
				{
					this.handleFrameCallback(fromFrame, toFrame, delta);
				}

			}
			else
			{
				// inner flumpmovie
				toFrame = Math.min(
					Math.floor((this.frames * (this.time % this.duration)) / this.duration),
					this.frames - 1
				);
			}

			for(var i = 0; i < this.flumpMovieLayers.length; i++)
			{
				var layer = this.flumpMovieLayers[i];
				layer.onTick(delta);
				layer.setFrame(toFrame);
			}

			this.frame = toFrame;
		}
	}

	public handleFrameCallback(fromFrame:number, toFrame:number, delta:number):FlumpMovie
	{
		if( toFrame > fromFrame )
		{
			for(var index = fromFrame; index < toFrame; index++)
			{
				if(this._frameCallback[index])
				{
					this._frameCallback[index].call(this, delta)
				}
			}
		}
		else if( toFrame < fromFrame)
		{
			for(var index = fromFrame; index < this.frames; index++)
			{
				if(this._frameCallback[index])
				{
					this._frameCallback[index].call(this, delta)
				}
			}

			for(var index = 0; index < toFrame; index++)
			{
				if(this._frameCallback[index])
				{
					this._frameCallback[index].call(this, delta)
				}
			}
		}

		return this;
	}

	public draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean):boolean
	{
		if(this.visible)
		{
			var layers = this.flumpMovieLayers;
			var length = layers.length;
			var ga = ctx.globalAlpha;

			for(var i = 0; i < length; i++)
			{
				var layer:FlumpMovieLayer = layers[i];

				if(layer.visible)
				{
					ctx.save();
					//layer.updateContext(ctx)
					ctx.globalAlpha = ga * layer.alpha;

					ctx.transform(
						layer._storedMtx.a,
						layer._storedMtx.b,
						layer._storedMtx.c,
						layer._storedMtx.d,
						layer._storedMtx.tx,// + (this.x),
						layer._storedMtx.ty// + (this.y)
					);

					layer.draw(ctx);
					ctx.restore();
				}
			}

		}


		
		//console.timeEnd('draw');

		return true;
	}

}

export = FlumpMovie;