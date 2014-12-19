import AbstractBehaviour = require('./AbstractBehavior');
import DisplayObject = require('../display/DisplayObject');
import Stage = require('../display/Stage');
import Container = require('../display/Container');
import DisplayType = require('../enum/DisplayType');

class ButtonBehaviour extends AbstractBehaviour {
	private _stage:Stage;
	initialize(displayObject:DisplayObject)
	{
		super.initialize(displayObject);

		this.owner.enableMouseInteraction();
		this.owner.cursor = 'pointer';
	}

	private getStage():Stage
	{
		if(!this._stage){
			this._stage = this.owner.getStage();
		}

		return this._stage;
	}

	destruct(){
		this._stage = null;
		super.destruct();
	}
}

export = ButtonBehaviour;