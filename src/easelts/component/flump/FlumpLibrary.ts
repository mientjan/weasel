import IFlumpLibrary = require('./IFlumpLibrary');
import Signal = require('../../../createts/event/Signal');

class FlumpLibrary
{
	private _rawLibrary:IFlumpLibrary.ILibrary = null;
	private _atlas:Array<HTMLImageElement|HTMLCanvasElement> = [];

	public loaded:boolean = false;
	public signalLoad:Signal = new Signal();

	constructor(libraryFilepathOrLibraryJsonObject:string|IFlumpLibrary.ILibrary)
	{
		if(typeof libraryFilepathOrLibraryJsonObject == 'string')
		{
			this.loadJSON( <string> libraryFilepathOrLibraryJsonObject);
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
}

export = FlumpLibrary;