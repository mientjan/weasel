import IFlumpLibrary = require('./IFlumpLibrary');

class FlumpKeyframeData
{
	index:number;
	duration:number;
	label:string;
	ref:string;

	x:number;
	y:number;
	scaleX:number;
	scaleY:number;
	skewX:number;
	skewY:number;
	pivotX:number;
	pivotY:number;

	visible:boolean;
	alpha:number;

	tweened:boolean;

	ease:number;

	constructor(json:IFlumpLibrary.IKeyframe)
	{
		this.index = json.index;
		this.duration = json.duration;
		this.ref = 'ref' in json ? json.ref : null;
		this.label = 'label' in json ? json.label : null;
		this.x = 'loc' in json ? json.loc[0] : 0.0;
		this.y = 'loc' in json ? json.loc[1] : 0.0;
		this.scaleX = 'scale' in json ? json.scale[0] : 1.0;
		this.scaleY = 'scale' in json ? json.scale[1] : 1.0;
		this.skewX = 'skew' in json ? json.skew[0] : 0.0;
		this.skewY = 'skew' in json ? json.skew[1] : 0.0;
		this.pivotX = 'pivot' in json ? json.pivot[0] : 0.0;
		this.pivotY = 'pivot' in json ? json.pivot[1] : 0.0;
		this.visible = 'visible' in json ? json.visible : true;
		this.alpha = 'alpha' in json ? json.alpha : 1.0;
		this.tweened = 'tweened' in json ? json.tweened : true;
		this.ease = 'ease' in json ? json.ease : 0.0;
	}
}

export = FlumpKeyframeData;