import * as IFlumpLibrary from "../../interface/IFlumpLibrary";

import Flump from "../FlumpLibrary";
import FlumpLayerData from "./FlumpLayerData";
import FlumpLabelData from "./FlumpLabelData";

class FlumpMovieData
{

	public id:string;
	public flumpLibrary;
	public flumpLayerDatas:Array<FlumpLayerData>;

	public frames:number = 0;

	constructor(flumpLibrary:Flump, json:IFlumpLibrary.IMovie)
	{
		var layers = json.layers;
		var frames = 0;

		this.flumpLibrary = flumpLibrary;
		this.id = json.id;
		this.flumpLayerDatas = new Array(layers.length);

		for(var i = 0; i < layers.length; i++)
		{
			var layer = new FlumpLayerData(layers[i]);
			this.flumpLayerDatas[i] = layer;

			frames = Math.max(frames, layer.frames)
		}
		this.frames = frames;
	}
}

export default FlumpMovieData;