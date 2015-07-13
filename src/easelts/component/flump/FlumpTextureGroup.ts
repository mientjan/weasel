import IFlumpLibrary = require('./IFlumpLibrary');
import FlumpLibrary = require('./FlumpLibrary');
import FlumpTextureGroupAtlas = require('./FlumpTextureGroupAtlas');
import HttpRequest = require('../../../createts/util/HttpRequest');

class FlumpTextureGroup
{

	public flumpTextureGroupAtlases;
	public flumpTextures;

	constructor(flumpTextureGroupAtlases, flumpTextures)
	{

	}

	public static load(flumpLibrary:FlumpLibrary, json:IFlumpLibrary.ITextureGroup)
	{
		var atlases = json.atlases;
		var loaders = [];
		for(var i = 0; i < atlases.length; i++)
		{
			var atlas = atlases[i];
			loaders.push(FlumpTextureGroupAtlas.load(flumpLibrary, atlas));
		}

		return HttpRequest.wait(loaders).then((atlases) =>
		{
			var flumpTextures = [];

			//var flumpTextures = new Map<String, _FlumpTexture>();
			//atlases.forEach((atlas) => flumpTextures.addAll(atlas.flumpTextures));
			//return new FlumpTextureGroup(atlases, flumpTextures);
		});
	}
}

export = FlumpTextureGroup;