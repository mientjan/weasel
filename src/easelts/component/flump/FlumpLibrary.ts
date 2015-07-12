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
	private _maxExtensionLength:number = 5;
	private _baseDir:string = '';

	private _map:{[name:string]:any} = {};

	public fps:number = 0;
	public loaded:boolean = false;
	public signalLoad:Signal = new Signal();

	constructor(libraryFilepathOrLibraryJsonObject:string|IFlumpLibrary.ILibrary, baseDir:string = '', autoload:boolean = true)
	{
		this._baseDir = baseDir;

		if(typeof libraryFilepathOrLibraryJsonObject == 'string')
		{
			var filepath:string = <string> libraryFilepathOrLibraryJsonObject;
			var dir:string = <string> libraryFilepathOrLibraryJsonObject;

			if(this.isDir(filepath))
			{
				filepath += (filepath.substr(filepath.length - 1) != '/' ? '/' : '') + 'library.json'
			}

			if(!this.isDir(dir))
			{
				dir = dir.substr(0, dir.lastIndexOf('/'));
			}

			if(this._baseDir.length == 0 )
			{
				this._baseDir = dir;
			}


			if(autoload){
				this.loadJSON( <string> filepath );
			}
		}
		else
		{
			if(this._baseDir.length == 0)
			{
				throw new Error('argument baseDir can not be empty when providing a object dump');
			}

			this._rawLibrary = <IFlumpLibrary.ILibrary> libraryFilepathOrLibraryJsonObject;
			this.parse();
		}
	}

	public isDir(path:string):boolean
	{
		return !( path.length - path.indexOf('.') <= this._maxExtensionLength );
	}

	public hasJSONLoaded():boolean
	{
		return !!this._rawLibrary;
	}

	public hasAssetsLoaded():boolean
	{
		return this.loaded;
	}

	private loadJSON(path:string, onComplete?:()=>void):void
	{
		this.xhrLoad(path, (response:string) => {
			var data:IFlumpLibrary.ILibrary = JSON.parse(response);
			this._rawLibrary = data;
			this.parse(onComplete);
		});
	}

	public parse(onComplete?:() => void):void
	{
		var data = this._rawLibrary;
		this.fps = data.frameRate;
		this._groups = data.textureGroups;
		var map = this._map;


		var movies = [];
		for(var i = 0; i < data.movies.length; i++)
		{
			var m = new MovieSymbol.MovieSymbol(this, data.movies[i]);
			movies.push(m);
			map[m.name] = m;
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

				var bitmap = new BitmapSymbol(textureObject, atlas);
				map[bitmap.name] = bitmap;
			} 
		}

		// Now that all symbols have been parsed, go through keyframes and resolve references
		for(var i = 0; i < movies.length; i++)
		{
			var movie = movies[i];

			for(var j = 0; j < movie.layers.length; j++)
			{
				var layer = movie.layers[j];
				var keyframes = layer.keyframes;
				
				var ll = keyframes.length;
				for(var k = 0; k < ll; k++)
				{
					console.log(kf);
					
					var kf = keyframes[k];
					if (kf.symbolName != null) {
						var symbol = map[kf.symbolName];
						if(symbol != void 0)
						{
							kf.symbol = symbol;
						}
					}

					// Specially handle "stop frames". These are one-frame keyframes that preceed an
					// invisible or empty keyframe. They don't appear in Flash (or Starling Flump)
					// since movies use the authored FLA framerate there (typically 30 FPS). Flambe
					// animates at 60 FPS, which can cause unexpected motion/flickering as those
					// one-frame keyframes are interpolated. So, assume that these frames are never
					// meant to actually be displayed and hide them.
					if (kf.tweened && kf.duration == 1 && k+1 < ll.length)
					{
						var nextKf = keyframes[k+1];
						if (!nextKf.visible || nextKf.symbolName == null)
						{
							kf.visible = false;
						}
					}
				}
			}
		}
		
		console.log(map);
		
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