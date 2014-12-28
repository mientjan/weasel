import AbstractBehavior = require('./AbstractBehavior');
import DisplayObject = require('../display/DisplayObject');
import Stage = require('../display/Stage');
import Container = require('../display/Container');
import DisplayType = require('../enum/DisplayType');

class ButtonBehaviour extends AbstractBehavior
{
	private _stage:Stage;

	initialize(displayObject:DisplayObject):void
	{
		super.initialize(displayObject);

		this.owner.enableMouseInteraction();
		this.owner.cursor = 'pointer';

		if(typeof(this.owner['onClick']) == 'function')
		{
			this.owner.addEventListener(DisplayObject.EVENT_MOUSE_CLICK, this.owner['onClick'].bind(this.owner));
		}

		if(typeof(this.owner['onPointerOver']) == 'function')
		{
			this.owner.addEventListener(DisplayObject.EVENT_MOUSE_MOUSEOVER, this.owner['onPointerOver'].bind(this.owner));
		}

		if(typeof(this.owner['onPointerOut']) == 'function')
		{
			this.owner.addEventListener(DisplayObject.EVENT_MOUSE_MOUSEOUT, this.owner['onPointerOut'].bind(this.owner));
		}
	}

	public destruct():void
	{
		this._stage = null;
		super.destruct();
	}
}

export = ButtonBehaviour;