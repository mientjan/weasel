import IFlumpLibrary = require('./IFlumpLibrary');
import Signal = require('../../../createts/event/Signal');
import MovieSymbol = require('./MovieSymbol');
import BitmapSymbol = require('./BitmapSymbol');

class FlumpLibrary
{
	private _rawLibrary:IFlumpLibrary.ILibrary = null;
	private _atlas:Array<HTMLImageElement|HTMLCanvasElement> = [];
	private _movies:IFlumpLibrary.IMovie;
	private _groups:Array<IFlumpLibrary.ITextureGroup> = [];
	private _baseDir:string = '';

	private _map:{[name:string]:any} = {};

	public fps:number = 0;
	public loaded:boolean = false;
	public signalLoad:Signal = new Signal();

	constructor(libraryFilepathOrLibraryJsonObject:string|IFlumpLibrary.ILibrary, baseDir:string = '')
	{
		this._baseDir = baseDir;

		if(typeof libraryFilepathOrLibraryJsonObject == 'string')
		{
			this.loadJSON( <string> libraryFilepathOrLibraryJsonObject );
		}
		else
		{
			this._rawLibrary = <IFlumpLibrary.ILibrary> libraryFilepathOrLibraryJsonObject;
		}
	}

	public hasJSONLoaded():boolean
	{
		return !!this._rawLibrary;
	}

	public hasAssetsLoaded():boolean
	{
		return this.loaded;
	}

	private loadJSON(path:string):void
	{
		this.xhrLoad(path, (response:string) => {
			var data:IFlumpLibrary.ILibrary = JSON.parse(response);
			this._rawLibrary = data;
		});
	}

	public parse(complete:() => void):void
	{
		var data = this._rawLibrary;
		this.fps = data.frameRate;
		this._groups = data.textureGroups;
		var map = {};

		var movies = [];
		for(var i = 0; i < data.movies.length; i++)
		{
			var movie = new MovieSymbol.MovieSymbol(this, data.movies[i]);
			movies.push(movie);
			map[movie.name] = movie;
		}

		var groups = data.textureGroups;
		if (groups[0].scaleFactor != 1 || groups.length > 1) {
			// multiple texture sizes
		}

		var atlases = groups[0].atlases;
		for(var i = 0; i < atlases.length; i++)
		{
			var atlasObj = atlases[i];

			var atlas = this._loadAtlas(this._baseDir + "/" + atlasObj.file);

			for(var j = 0; j < atlasObj.textures.length; j++)
			{
				var textureObject = atlasObj.textures[j];

				var bitmap = new MovieSymbol.BitmapSymbol(textureObject, atlas);
				map[bitmap.name] = bitmap;
			}
		}


	}

	private xhrLoad(path:string, complete:(response:string) => any):void
	{
		var xhr = new XMLHttpRequest();
		xhr.onload = function(){
			complete( <string> this.responseText);
		};
		xhr.open("get", path, true);
		xhr.send();
	}

	private _loadAtlas(path:string):HTMLImageElement
	{
		var img = document.createElement('img');
		img.src = path;
		return img;
	}
}

export = FlumpLibrary;