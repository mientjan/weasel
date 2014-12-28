import DisplayObject = require('../display/DisplayObject');

/**
 * @method AbstractBehavior
 */
class AbstractBehaviour
{

	public owner:DisplayObject = null;

	constructor()
	{
	}

	public initialize(owner:DisplayObject):any
	{
		if(this.owner)
		{
			throw new Error('behavior already has a owner')
		}

		this.owner = owner;
	}

	public destruct():any
	{
		this.owner = null;
	}
}

export  = AbstractBehaviour;