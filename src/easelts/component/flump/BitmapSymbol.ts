class BitmapSymbol
{
	public name:string;
	public texture:SubTexture;
	public anchorX:number = 0;
	public anchorY:number = 0;

	constructor(json :TextureFormat, atlas :Texture)
	{
		_name = json.symbol;
		this.name = json.symbol;

		var rect = json.rect;
		texture = atlas.subTexture(rect[0], rect[1], rect[2], rect[3]);

		var origin = json.origin;
		if (origin != null) {
			this.anchorX = origin[0];
			this.anchorY = origin[1];
		} else {
			this.anchorX = 0;
			this.anchorY = 0;
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