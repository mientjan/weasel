import DisplayObject = require('../../display/DisplayObject');
import FlumpLibrary = require('./FlumpLibrary');
import FlumpMovieLayer = require('./FlumpMovieLayer');
import FlumpKeyframeData = require('./FlumpKeyframeData');
import IFlumpLibrary = require('./IFlumpLibrary');

class FlumpLayerData {

	public name:string;
	public flipbook:boolean;
	public flumpKeyframeDatas:Array<FlumpKeyframeData>;

	public frames:number;

	constructor(json:IFlumpLibrary.ILayer)
	{
		this.name = json.name;
		this.flipbook = 'flipbook' in json ? !!json.flipbook : false;

		var keyframes = json.keyframes;
		var keyFrameData:FlumpKeyframeData = null;
		for(var i = 0; i < keyframes.length; i++)
		{
			var keyframe = keyframes[i];
			keyFrameData = new FlumpKeyframeData(keyframe);
			this.flumpKeyframeDatas.push(keyFrameData );
		}

		this.frames = keyFrameData.index + keyFrameData.duration;
	}

	public getKeyframeForFrame(frame:number)
	{
		for(var i = 1; i < this.flumpKeyframeDatas.length; i++)
		{
			if (this.flumpKeyframeDatas[i].index > frame) {
				return this.flumpKeyframeDatas[i - 1];
			}
		}
		return this.flumpKeyframeDatas[this.flumpKeyframeDatas.length - 1];
	}

	public getKeyframeAfter( flumpKeyframeData:FlumpKeyframeData)
	{
		for(var i = 0; i < this.flumpKeyframeDatas.length - 1; i++) {
			if (this.flumpKeyframeDatas[i] === flumpKeyframeData)
			{
				return this.flumpKeyframeDatas[i + 1];
			}
		}
		return null;
	}
}

export = FlumpLayerData;