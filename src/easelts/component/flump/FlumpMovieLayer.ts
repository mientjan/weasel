import DisplayObject = require('../../display/DisplayObject');
import FlumpLibrary = require('./FlumpLibrary');
import FlumpLayerData = require('./FlumpLayerData');
import FlumpKeyframeData = require('./FlumpKeyframeData');

class FlumpMovieLayer extends DisplayObject
{
	public flumpLibrary:FlumpLibrary;
	public flumpLayerData:FlumpLayerData;

	_symbol; // BitmapDrawable
	_symbols = {};
	//Matrix _transformationMatrix = new Matrix.fromIdentity();

	constructor(flumpLibrary:FlumpLibrary, flumpLayerData:FlumpLayerData)
	{
		super();

		this.flumpLibrary = flumpLibrary;
		this.flumpLayerData = flumpLayerData;

		for(var i = 0; i < flumpLayerData.flumpKeyframeDatas.length; i++)
		{
			var keyframe = flumpLayerData.flumpKeyframeDatas[i];
			if (keyframe.ref != null && ( keyframe.ref in this._symbols ) == false)
			{
				this._symbols[keyframe.ref] = flumpLibrary.createSymbol(keyframe.ref);
			}
		}

		this.setFrame(0);
	}

//Matrix get transformationMatrix => _transformationMatrix;

	public advanceTime(time):boolean {
		if (this._symbol) {
			//var animatable = this._symbol as Animatable;
			return this._symbol.advanceTime(time);
		} else {
			return false;
		}
	}

	public setFrame(frame:number)
	{
		var keyframe = this.flumpLayerData.getKeyframeForFrame(frame);
		if (!(keyframe instanceof FlumpKeyframeData)) return;

		var x:number = keyframe.x;
		var y:number = keyframe.y;
		var scaleX:number = keyframe.scaleX;
		var scaleY:number = keyframe.scaleY;
		var skewX:number = keyframe.skewX;
		var skewY:number = keyframe.skewY;
		var pivotX:number = keyframe.pivotX
		var pivotY:number = keyframe.pivotY;
		var alpha:number = keyframe.alpha;

		if (keyframe.index != frame && keyframe.tweened) {

			var nextKeyframe = this.flumpLayerData.getKeyframeAfter(keyframe);
			if (nextKeyframe instanceof FlumpKeyframeData)
			{
				var interped = (frame - keyframe.index) / keyframe.duration;
				var ease = keyframe.ease;

				if (ease != 0)
				{
					var t = 0.0;
					if (ease < 0)
					{
						var inv = 1 - interped;
						t = 1 - inv * inv;
						ease = 0 - ease;
					} else {
						t = interped * interped;
					}
					interped = ease * t + (1 - ease) * interped;
				}

				x = x + (nextKeyframe.x - x) * interped;
				y = y + (nextKeyframe.y - y) * interped;
				scaleX = scaleX + (nextKeyframe.scaleX - scaleX) * interped;
				scaleY = scaleY + (nextKeyframe.scaleY - scaleY) * interped;
				skewX = skewX + (nextKeyframe.skewX - skewX) * interped;
				skewY = skewY + (nextKeyframe.skewY - skewY) * interped;
				alpha = alpha + (nextKeyframe.alpha - alpha) * interped;
			}
		}

		/*
		 _transformationMatrixPrivate.identity();
		 _transformationMatrixPrivate.translate(-pivotX, -pivotY);
		 _transformationMatrixPrivate.scale(scaleX, scaleY);
		 _transformationMatrixPrivate.skew(skewX, skewY);
		 _transformationMatrixPrivate.translate(x, y);
		 */

		var a =   scaleX * Math.cos(skewY);
		var b =   scaleX * Math.sin(skewY);
		var c = - scaleY * Math.sin(skewX);
		var d =   scaleY * Math.cos(skewX);
		var tx =  x - (pivotX * a + pivotY * c);
		var ty =  y - (pivotX * b + pivotY * d);

		//_transformationMatrix.setTo(a, b, c, d, tx, ty);

		this.alpha = alpha;
		this.visible = keyframe.visible;

		this._symbol = (keyframe.ref != null) ? this._symbols[keyframe.ref] : null;
	}


	public draw(ctx:CanvasRenderingContext2D, ignoreCache?:boolean):boolean
	{
		//if (_symbol != null) _symbol.render(renderState);
		return true;
	}
}

export = FlumpMovieLayer;