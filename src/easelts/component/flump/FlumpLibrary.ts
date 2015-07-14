import IFlumpLibrary = require('./IFlumpLibrary');
import Signal = require('../../../createts/event/Signal');
import HttpRequest = require('../../../createts/util/HttpRequest');
import Promise = require('../../../createts/util/Promise');
import SignalConnection = require('../../../createts/event/SignalConnection');
import FlumpMovieData = require('./FlumpMovieData');
import FlumpTexture = require('./FlumpTexture');
import FlumpTextureGroup = require('./FlumpTextureGroup');
import FlumpMovie = require('./FlumpMovie');
//import MovieSymbol = require('./MovieSymbol');
//import FlumpSprite = require('./FlumpSprite');
//import FlumpMovie = require('./FlumpMovie');
//import FlumpMovie = require('./MovieSprite');
//import Sprite = require('./Sprite');

class FlumpLibrary
{
	public static load(url:string):Promise<FlumpLibrary>
	{
		var baseDir = url;

		if(url.indexOf('.json') > -1)
		{
			baseDir = url.substr(0, url.lastIndexOf('/'));
		} else {
			url += ( url.substr(url.length-1) != '/' ? '/' : '' ) +  'library.json';
		}
		
		return HttpRequest
			.getString(url)
			.then((response:string) =>
			{
				return JSON.parse(response);
			})
			.then((json:IFlumpLibrary.ILibrary) =>
			{
				var flumpLibrary = new FlumpLibrary(baseDir);
				flumpLibrary.md5 = json.md5;
				flumpLibrary.frameRate = json.frameRate;

				var textureGroupLoaders:Array<Promise<FlumpTextureGroup>> = [];
				for(var i = 0; i < json.movies.length; i++)
				{
					var flumpMovieData = new FlumpMovieData(flumpLibrary, json.movies[i]);
					flumpLibrary.movieData.push(flumpMovieData);
				}

				var textureGroups = json.textureGroups;
				for(var i = 0; i < textureGroups.length; i++)
				{
					var textureGroup = textureGroups[i];
					var promise = FlumpTextureGroup.load(flumpLibrary, textureGroup);
					textureGroupLoaders.push(promise);
				}

				return Promise.all(textureGroupLoaders).then((textureGroups:Array<FlumpTextureGroup>) => {

					for(var i = 0; i < textureGroups.length; i++)
					{
						var textureGroup = textureGroups[i];
						flumpLibrary.textureGroups.push(textureGroup);
					}

					return flumpLibrary;
				});
			});
	}


	public movieData:Array<FlumpMovieData> = [];
	public textureGroups:Array<FlumpTextureGroup> = [];

	public url:string;
	public md5:string;
	public frameRate:number;

	public fps:number = 0;
	public loaded:boolean = false;

	constructor(basePath:string)
	{
		this.url = basePath;

	}

	//public load(onComplete:() => any, onProgress:(progress:number) => any):void
	//{
	//	library:IFlumpLibrary.ILibrary
	//}

	public getFlumpMovieData(name:string):FlumpMovieData
	{
		for(var i = 0; i < this.movieData.length; i++)
		{
			var movieData = this.movieData[i];
			if(movieData.id == name)
			{
				return movieData;
			}
		}

		throw new Error('movie not found');
	}

	public createSymbol(name:string):FlumpMovie|FlumpTexture
	{
		for(var i = 0; i < this.textureGroups.length; i++)
		{
			var flumpTextures = this.textureGroups[i].flumpTextures;

			if(name in flumpTextures)
			{
				return flumpTextures[name];
			}
		}

		for(var i = 0; i < this.movieData.length; i++)
		{

			var movieData = this.movieData[i];
			if(movieData.id == name)
			{
				return new FlumpMovie(this, name);
			}

		}

		throw new Error("no symbol found");
	}

	private _loadAtlas(path:string):HTMLImageElement
	{
		var img = document.createElement('img');
		img.src = path;
		return img;
	}
}

export = FlumpLibrary;