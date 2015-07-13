import IFlumpLibrary = require('./IFlumpLibrary');
import FlumpTexture = require('./FlumpTexture');
import FlumpLibrary = require('./FlumpLibrary');

class FlumpTextureGroupAtlas {

	public renderTexture;
	public flumpTextures = {};

	constructor( renderTexture, json:IFlumpLibrary.IAtlas)
	{
		this.renderTexture = renderTexture;

		var textures = json.textures;
		for(var i = 0; i < textures.length; i++)
		{
			var texture = textures[i];
			this.flumpTextures[texture.symbol] = new FlumpTexture(texture);
		}
	}

//	this.renderTexture = renderTexture,
//	this.flumpTextures = new Map.fromIterable(json["textures"],
//	key: (jsonTexture) => _ensureString(jsonTexture["symbol"]),
//	value: (jsonTexture) => new _FlumpTexture(renderTexture, jsonTexture));
//
	public static load(flumpLibrary:FlumpLibrary, json:IFlumpLibrary.IAtlas):Promise<FlumpTextureGroupAtlas>
	{
		//var file = json.file;
		//var regex = new RegExp(r"^(.*/)?(?:$|(.+?)(?:(\.[^.]*$)|$))");
		//var match = regex.firstMatch(flumpLibrary.url);
		//var path = match.group(1);
		//var url = (path == null) ? file : "$path$file";
		//
		//return BitmapData.load(url).then((bitmapData) => {
		//	var renderTexture = bitmapData.renderTexture;
		//	return new FlumpTextureGroupAtlas(renderTexture, json);
		//});
	}

}