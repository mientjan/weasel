import AbstractBehaviour = require('./AbstractBehaviour');
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
		this.owner.addEventListener('mouseover', this.onMouseOver );
		this.owner.addEventListener('mouseout', this.onMouseOut );

	}

	private getStage():Stage
	{
		if(!this._stage){
			this._stage = this.owner.getStage();
		}

		return this._stage;
	}

	private onMouseOver = () => {
		this.getStage();
		this._stage.holder.style.cursor = 'pointer';
	}

	private onMouseOut = () => {
		this.getStage();
		this._stage.holder.style.cursor = 'auto';
	}

	destruct(){
		this._stage = null;
		this.owner.removeEventListener('mouseover', <Function> this.onMouseOver );
		this.owner.removeEventListener('mouseout', <Function> this.onMouseOut );

		super.destruct();
	}
}

export = ButtonBehaviour;