import IFlumpLibrary = require('./IFlumpLibrary');

class FlumpLibrary
{
	private _rawLibrary:IFlumpLibrary.ILibrary = null;
	private _atlas:Array<HTMLImageElement|HTMLCanvasElement> = [];

	public loaded:boolean = false;

	constructor(libraryFilepathOrLibraryJsonObject:string|IFlumpLibrary.ILibrary)
	{
		if(typeof libraryFilepathOrLibraryJsonObject == 'string')
		{

		}
		else
		{

		}
	}

	public parse(complete:() => void):void
	{

	}
}

export = FlumpLibrary;