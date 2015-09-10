import DisplayObject from "../../display/DisplayObject";
import Flump from "../FlumpLibrary";
import FlumpMovieLayer from "./FlumpMovieLayer";
import FlumpKeyframeData from "./FlumpKeyframeData";
import * as IFlumpLibrary from "../../interface/IFlumpLibrary";
import IHashMap from "../../interface/IHashMap";

class FlumpLayerData {

	public name:string;
	public flipbook:boolean;
	public flumpKeyframeDatas:Array<FlumpKeyframeData> = [];
	private keyframes = {};

	public frames:number;

	constructor(json:IFlumpLibrary.ILayer)
	{
		this.name = json.name;
		this.flipbook = 'flipbook' in json ? !!json.flipbook : false;
		//
		var keyframes = json.keyframes;
		var keyFrameData:FlumpKeyframeData = null;
		for(var i = 0; i < keyframes.length; i++)
		{
			var keyframe = keyframes[i];
			keyFrameData = new FlumpKeyframeData(keyframe);
			for(var j = keyFrameData.index; j <= (keyFrameData.index + keyFrameData.duration); j++)
			{
				if(!this.keyframes[j]){
					this.keyframes[j] = keyFrameData;
				}
			}

			keyFrameData.position = this.flumpKeyframeDatas.length;
			this.flumpKeyframeDatas.push( keyFrameData );
		}

		this.frames = keyFrameData.index + keyFrameData.duration;
	}

	public getKeyframeForFrame(frame:number):FlumpKeyframeData
	{
		return this.keyframes[frame];
	}

	public getKeyframeAfter( flumpKeyframeData:FlumpKeyframeData):FlumpKeyframeData
	{
		return this.flumpKeyframeDatas[flumpKeyframeData.position + 1];
		//for(var i = 0; i < this.flumpKeyframeDatas.length - 1; i++) {
		//	if (this.flumpKeyframeDatas[i] === flumpKeyframeData)
		//	{
		//		return this.flumpKeyframeDatas[i + 1];
		//	}
		//}
		//return null;
	}
}

export default FlumpLayerData;