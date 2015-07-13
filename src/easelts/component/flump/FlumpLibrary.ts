import IFlumpLibrary = require('./IFlumpLibrary');
import Signal = require('../../../createts/event/Signal');
import HttpRequest = require('../../../createts/util/HttpRequest');
import SignalConnection = require('../../../createts/event/SignalConnection');
import FlumpMovieData = require('./FlumpMovieData');
import FlumpTextureGroup = require('./FlumpTextureGroup');
import FlumpMovie = require('./FlumpMovie');
//import MovieSymbol = require('./MovieSymbol');
//import FlumpSprite = require('./FlumpSprite');
//import FlumpMovie = require('./FlumpMovie');
//import FlumpMovie = require('./MovieSprite');
//import Sprite = require('./Sprite');

class FlumpLibrary
{
	public static load(url:string)
	{

		return HttpRequest.getString(url)
			.then((response:string) =>
			{
				return JSON.parse(response);
			})
			.then((json:IFlumpLibrary.ILibrary) =>
			{
				var flumpLibrary = new FlumpLibrary(json, url);
				return flumpLibrary;
			});
	}


	public movieData:Array<FlumpMovieData> = [];
	public textureGroups:Array<FlumpTextureGroup> = [];

	public url:string;
	public md5:string;
	public frameRate:number;

	private _maxExtensionLength:number = 5;
	private _baseDir:string = '';

	//private _map:{[name:string]:FlumpMovie|FlumpSprite} = {};

	public fps:number = 0;
	public loaded:boolean = false;

	constructor(library:IFlumpLibrary.ILibrary, url:string)
	{
		this.url = url;
		this.md5 = library.md5;
		this.frameRate = library.frameRate;

		var textureGroupLoaders = [];

		for(var i = 0; i < library.movies.length; i++)
		{
			var flumpMovieData = new FlumpMovieData(this, library.movies[i]);
			this.movieData.push(flumpMovieData);
		}

		var textureGroups = library.textureGroups;
		for(var i = 0; i < textureGroups.length; i++)
		{
			var textureGroup = textureGroups[i];
			var promise = FlumpTextureGroup.load(this, textureGroup);
			textureGroupLoaders.push(promise);
			//var group = new FlumpTextureGroup(this, textureGroup);
			//this.textureGroups.push(group);
		}

		HttpRequest.wait(textureGroupLoaders).then((textureGroups:Array<FlumpTextureGroup>) => {
			this.textureGroups.concat(textureGroups);
		});
	}

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

	public createSymbol(name:string):FlumpMovie
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