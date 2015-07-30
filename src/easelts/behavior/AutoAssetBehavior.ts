import AbstractBehavior = require('./AbstractBehavior');
import DisplayObject = require('../display/DisplayObject');
import Stage = require('../display/Stage');
import Container = require('../display/Container');
import PointerEvent = require('../event/PointerEvent');
import DisplayType = require('../enum/DisplayType');
import MouseEvent = require('../event/MouseEvent');
import Size = require('../geom/Size');
import Scroller = require('../../zynga/Scroller');
import Animate = require('../../zynga/Animate');
import IScrollerOptions = require('../../zynga/IScrollerOptions');

class AutoAssetBehavior extends AbstractBehavior
{
	protected _elements:Array<DisplayObject> = [];

	public owner:Container;

	constructor()
	{
		super();
	}

	public initialize(container:DisplayObject):void
	{
		super.initialize(container);


	}
}

export = AutoAssetBehavior;