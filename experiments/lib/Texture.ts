class Texture
{
	image:HTMLImageElement = null;
	texture:HTMLImageElement = null;

	constructor(src:string)
	{
		this.image = document.createElement('img');
		this.image.onload = this.onload.bind(this);
		this.image.src = src;
	}

	private onload(){
		this
	}
}

export = Texture;