import IFlumpLibrary = require('./IFlumpLibrary');

class BitmapSymbol
{
	public name:string;
	public atlas:HTMLImageElement;
	public rect:Array<number>;

	public texture:any;
	public regX:number;
	public regY:number;

	constructor(json:IFlumpLibrary.ITexture, atlas:HTMLImageElement)
	{
		this.name = json.symbol;
		var rect = json.rect;
		this.rect = [rect[0], rect[1], rect[2], rect[3]];
		this.atlas = atlas;
		//this.texture = atlas.subTexture(rect[0], rect[1], rect[2], rect[3]);

		var origin = json.origin;
		if (origin != null) {
			this.regX = origin[0];
			this.regY = origin[1];
		} else {
			this.regX = 0;
			this.regY = 0;
		}
	}

	//public function createSprite () :ImageSprite
	//{
	//	var sprite = new ImageSprite(texture);
	//	sprite.setAnchor(anchorX, anchorY);
	//	return sprite;
	//}

}

export = BitmapSymbol;