import FlumpLabelData = require('./FlumpLabelData');
class FlumpLabelQueueData extends FlumpLabelData
{
	public times:number;

	constructor(label:string, index:number, duration:number, times:number = 1)
	{
		super(label, index, duration);

		this.times = times;
	}
}

export = FlumpLabelQueueData;