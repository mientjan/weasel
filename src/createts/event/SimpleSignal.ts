interface IGenerator {
	():ISimpleSignal;

	TYPE_REMOVE:number;
	TYPE_REMOVE_ALL:number;
}

interface ISimpleSignal {
	(callback:Function, remove:number):number
}

var Generator = <IGenerator> function()
{
	var _events = [];
	var SimpleSignal = <ISimpleSignal> function(callback:Function = null, remove:number = 0){
		var items:number = 0;

		// emit
		if(callback == void 0){
			for(var i = 0; i < _events.length; i++)
			{
				_events[i].call(void 0);
				items++;
			}
		} else {
			if( !remove ){
				_events.push(callback);
				items++;
			} else {
				for(var i = 0; i < _events.length; i++)
				{
					if( _events[i] == callback ){
						_events.splice(i, 1);
						items++;
					}

				}
			}
		}

		return items;
	}

	return SimpleSignal;
}

Generator.TYPE_REMOVE = 1;
Generator.TYPE_REMOVE_ALL = 2;


export = Generator;