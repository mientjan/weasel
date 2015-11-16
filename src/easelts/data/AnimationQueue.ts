import Queue from "./Queue";
import QueueList from "./QueueList";

class AnimationQueue extends QueueList
{
	public frame:number = 0;

	protected _time:number = 0;
	protected _fpms:number = 0;

	constructor(fps:number, unit:number = 1000)
	{
		super();
		this._fpms = unit / fps;
	}

	public onTick(delta:number):void
	{
		this._time += delta;

		if(this.current != null || this.next() != null)
		{
			var times = this.current.times;
			var from = this.current.from;
			var duration = this.current.duration;

			var frame = (duration * this._time / (duration * this._fpms));

			this.frame = from + (frame % duration);

			if(times > -1 && times - (frame / duration) < 0)
			{
				this.next();
			}
		}
	}

	public next():Queue
	{
		this._time = this._time % this._fpms;

		return super.next();
	}

	public getFrame():number
	{
		return this.frame|0
	}
}

export default AnimationQueue;
