import Container = require('../display/Container');
import AssetTypeEnum = require('./flump/AssetTypeEnum');
import FlumpLibrary = require('./flump/FlumpLibrary');
import IFlumpLibrary = require('./flump/IFlumpLibrary');

class FlumpAnimation extends Container
{
	public static EVENT_ONLOAD = 'flumpAnimation.load'

	/**
	 * Indicates if assets are loaded
	 * @type {boolean}
	 */
	public loaded:boolean = false;

	private _paused:boolean = false;
	private _animationQueu:Array<string> = [];
	private _library:FlumpLibrary = null;
	private _time:number = 0;

	constructor(
		libraryFilepathOrLibraryJsonObject:string|IFlumpLibrary.ILibrary|FlumpLibrary,
		autoload:boolean = false
	)
	{
		super();

		if( typeof libraryFilepathOrLibraryJsonObject === 'object' && libraryFilepathOrLibraryJsonObject instanceof FlumpLibrary )
		{
			this._library = libraryFilepathOrLibraryJsonObject;
		}
		else
		{
			this._library = new FlumpLibrary( <string|IFlumpLibrary.ILibrary> libraryFilepathOrLibraryJsonObject);
		}
	}

	public onTick(delta:number):void
	{
		super.onTick(delta);

		if(!this._paused)
		{
			this._time += delta;
		}
	}

	private preloadAssets( assets:Array<string>, complete:() => void ):void
	{

	}

	public play(label:string = '*', repeat:number = 1, queu:boolean = false):void
	{

	}

	public pause():void
	{
		this._paused = true;
	}

	public resume():void
	{
		this._paused = false;
	}
}

export = FlumpAnimation;