import DisplayObject = require('../display/DisplayObject');

/**
 * @method AbstractBehavior
 */
class AbstractBehaviour {

	public owner:DisplayObject = null;

	constructor(){}
	initialize(owner:DisplayObject){
		if(this.owner){
			throw new Error('behavior already has a owner')
		}
		this.owner = owner;
	}

	destruct(){
		this.owner = null;
	}
}

export  = AbstractBehaviour;