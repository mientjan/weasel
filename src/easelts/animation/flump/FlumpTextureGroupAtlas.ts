import IFlumpLibrary from "../../interface/IFlumpLibrary";
import FlumpTexture from "./FlumpTexture";
import FlumpLibrary from "../FlumpLibrary";
import IHashMap from "../../interface/IHashMap";
import Promise from "../../../createts/util/Promise";

class FlumpTextureGroupAtlas
{
	public static load(flumpLibrary:FlumpLibrary, json:IFlumpLibrary.IAtlas):Promise<FlumpTextureGroupAtlas>
	{
		var file = json.file;
		var url = flumpLibrary.url + '/' + file;

		return new Promise(function(resolve, reject){
			var img = <HTMLImageElement> document.createElement('img');
			img.onload = () => {
				resolve(img);
			};

			img.onerror = () => {
				reject();
			};

			img.src = url;
		}).then((data:HTMLImageElement) => {
			return new FlumpTextureGroupAtlas(data, json);
		});
	}

	public useCanvas:boolean = true;

	public renderTexture:HTMLCanvasElement|HTMLImageElement;
	public flumpTextures:IHashMap<FlumpTexture> = {};

	constructor( renderTexture:HTMLImageElement, json:IFlumpLibrary.IAtlas)
	{
		//if( this.useCanvas )
		//{
		//console.log(renderTexture.naturalWidth, renderTexture.naturalHeight);
		
			//var canvasElement = document.createElement('canvas');
			//canvasElement.width = renderTexture.naturalWidth;
			//canvasElement.height = renderTexture.naturalHeight;
			//canvasElement.style['image-rendering'] = '-webkit-optimize-contrast';
			//
			//var ctx = canvasElement.getContext('2d');
			//ctx['imageSmoothingEnabled'] = false;
			//
			//ctx.drawImage(renderTexture, 0, 0, renderTexture.naturalWidth, renderTexture.naturalHeight, 0, 0, renderTexture.naturalWidth, renderTexture.naturalHeight);
			//
			//this.renderTexture = <HTMLCanvasElement> canvasElement;
		//} else {
			this.renderTexture = <HTMLImageElement> renderTexture;
		//}

		var textures = json.textures;
		for(var i = 0; i < textures.length; i++)
		{
			var texture = textures[i];
			this.flumpTextures[texture.symbol] = new FlumpTexture(this.renderTexture, texture);
		}
	}
}

export default FlumpTextureGroupAtlas;