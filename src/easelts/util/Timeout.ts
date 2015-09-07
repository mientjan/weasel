class Timeout
{
	private _timeout:number = -1;
	private _duration:number;

	constructor(duration:number)
	{
		this._duration = duration;
	}

	public call(callback:Function, params:Array<any> = [], scope:any = window):Timeout
	{
		clearTimeout(this._timeout);
		this._timeout = setTimeout(() => {
			callback.apply(scope, params);
		}, this._duration);
		return this;
	}
}

export default Timeout;