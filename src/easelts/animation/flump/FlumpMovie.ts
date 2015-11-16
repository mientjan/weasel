import DisplayObject from '../../display/DisplayObject';

import IHashMap from '../../interface/IHashMap';
import * as IFlumpLibrary from '../../interface/IFlumpLibrary';
import IPlayable from '../../interface/IPlayable';

import FlumpLibrary from '../FlumpLibrary';
import FlumpMovieLayer from './FlumpMovieLayer';
import FlumpLabelData from './FlumpLabelData';
import FlumpLabelQueueData from './FlumpLabelQueueData';
import FlumpTexture from "./FlumpTexture";
import AnimationQueue from '../../data/AnimationQueue';
import Queue from '../../data/Queue';

/**
 * @author Mient-jan Stelling
 */
class FlumpMovie extends DisplayObject implements IPlayable
{
	public flumpLibrary:FlumpLibrary;
	public flumpMovieData;
	public flumpMovieLayers:Array<FlumpMovieLayer>;

	private _labels:IHashMap<FlumpLabelData> = {};
	private _labelQueue:Array<FlumpLabelQueueData> = [];
	private _label:FlumpLabelQueueData = null;
	protected _queue:AnimationQueue = null;

	private hasFrameCallbacks:boolean = false;
	private _frameCallback:Array<(delta:number) => any>;

	public paused:boolean = true;

	public name:string;
	public time:number = 0.0;
	public duration = 0.0;
	public frame:number = 0;
	public frames:number = 0;
	public speed:number = 1;

	// ToDo: add features like playOnce, playTo, goTo, loop, stop, isPlaying, label events, ...

	constructor( flumpLibrary:FlumpLibrary, name:string, width:any = 1, height:any = 1, x:any = 0, y:any = 0, regX:any = 0, regY:any = 0)
	{
		super(width, height, x, y, regX, regY);

		//flumpLibrary.frameRate = 2;

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

		this._queue = new AnimationQueue(flumpLibrary.frameRate);
	}

	public play(times:number = 1, label:string = null, complete?:() => any):FlumpMovie
	{
		this.visible = true;

		var labelQueueData:FlumpLabelQueueData;
		var queue:Queue = null;

		if( label == null || label == '*' )
		{
			labelQueueData = new FlumpLabelQueueData(label, 0, this.frames, times, 0)
			queue = new Queue(label, 0, this.frames, times, 0);
		}
		else
		{
			var queueLabel = this._labels[label];

			if(!queueLabel)
			{
				console.warn('unknown label:', queueLabel, 'on',  this.name );
				throw new Error('unknown label:' + queueLabel + ' | ' + this.name );
			}

			labelQueueData = new FlumpLabelQueueData(queueLabel.label, queueLabel.index, queueLabel.duration, times, 0);
			queue = new Queue(queueLabel.label, queueLabel.index, queueLabel.duration, times, 0);

		}

		this._labelQueue.push(labelQueueData);
		this._queue.add(queue);

		if(complete)
		{
			labelQueueData.then(complete);
			queue.then(complete);
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

		if(this._label){
			this._label.times = 1;
		}
		return this;
	}

	public kill():FlumpMovie
	{
		this._labelQueue.length = 0;
		this._label = null;

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
		this.reset();

		return this._label;
	}

	public gotoAndStop(frameOrLabel:number|string):FlumpMovie
	{
		var frame:number;
		if (typeof frameOrLabel === 'string')
		{
			frame = this._labels[frameOrLabel].index;
		}
		else
		{
			frame = frameOrLabel;
		}
		var label = new FlumpLabelQueueData(null, frame, 1, 1, 0);
		this._labelQueue.push(label);

		return this;
	}

	public stop():FlumpMovie
	{
		this.paused = true;

		if(this._label)
		{
			this._label.finish();
			this._label.destruct();
		}

		return this;
	}

	public onTick(delta:number):void
	{
		super.onTick(delta);

		delta *= this.speed;

		if(this.paused == false)
		{
			this._queue.onTick(delta);
			this.time += delta;

			var label = this._label;
			var fromFrame = this.frame;
			var toFrame = 0;

			if( label )
			{
				toFrame = this.frames * this.time / this.duration;

				//console.log('toFrame: ', toFrame, this.frames);

				if( label.times != -1 )
				{
					if (toFrame > label.times * label.duration)
					//if ( label.times - Math.ceil((toFrame+2) / label.duration) < 0 )
					{
						//console.log('>>> label ended');
						if( this._labelQueue.length > 0 )
						{
							//console.log('next');
							this.gotoNextLabel();
							label = this._label;
							toFrame = this.frames * this.time / this.duration;
						} else {
							//console.log('stop');
							this.stop();
							return;
						}
					}
				}

				toFrame = label.index + ( toFrame % label.duration );

				//console.log('onTick label: ', toFrame, this.name);

				if( this.hasFrameCallbacks )
				{
					this.handleFrameCallback(fromFrame, toFrame | 0, delta);
				}

			}
			else
			{
				// inner flumpmovie
				toFrame = (this.frames * (this.time % this.duration)) / this.duration;
				//
				if(toFrame < this.frames)
				{
					toFrame = toFrame % this.duration;
				}

				//console.log('onTick inner: ', toFrame, this.name);
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

	public setFrame(value:number):FlumpMovie
	{
		//console.log('setFrame', value, this.name);

		var layers = this.flumpMovieLayers;
		var length = layers.length;

		//( this.frames / flumpLibrary.frameRate ) * 1000;

		for(var i = 0; i < length; i++)
		{
			var layer = layers[i];
			if (layer.enabled)
			{
				layer.reset();
				layer.onTick( (value / this.frames) * this.duration );
				layer.setFrame(value);
			}
		}

		return this;
	}

	public draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean):boolean
	{

		var layers = this.flumpMovieLayers;
		var length = layers.length;
		var ga = ctx.globalAlpha;

		for(var i = 0; i < length; i++)
		{
			var layer:FlumpMovieLayer = layers[i];

			if(layer.visible && layer.enabled)
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

		return true;
	}

	public reset():void
	{
		this.frame = 0;
		this.time = 0.0;

		for(var i = 0; i < this.flumpMovieLayers.length; i++)
		{
			var layer = this.flumpMovieLayers[i];
			layer.reset();

			for(var symbol in layer._symbols)
			{
				layer._symbols[symbol].reset();
			}

		}
	}
}

export default FlumpMovie;
