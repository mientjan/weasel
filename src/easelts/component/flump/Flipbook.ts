//
// Flambe - Rapid game development
// https://github.com/aduros/flambe/blob/master/LICENSE.txt

//package flambe.swf;
//
//import flambe.display.ImageSprite;
//import flambe.display.Texture;

/**
 * Defines a flipbook-style movie, typically created from a spritesheet. Use
 * `Library.fromFlipbooks()` to create a Library from a list of Flipbooks.
 */
class Flipbook<T extends Texture>
{
	public name:string;
	public frames:Array<FlipbookFrame> = [];

	/**
	 * @param name The name of the symbol that will be placed in the library.
	 * @param textures The frames of the flipbook animation.
	 */
	constructor(name:string, textures:Array<T>)
	{
		this.name = name;

		// By default, play the animation for one second
		var durationPerFrame = 1 / textures.length;

		for(var i = 0; i < textures.length; i++)
		{
			var texture = textures[i];
			this.frames.push(new FlipbookFrame(texture, durationPerFrame));
		}
	}

	/**
	 * Uniformly sets the duration for all frames in this flipbook, so that the entire movie takes
	 * the given duration.
	 *
	 * @param duration The movie duration, in seconds.
	 * @returns This instance, for chaining.
	 */
	public setDuration(duration:number):Flipbook<T>
	{
		var durationPerFrame = duration / frames.length;
		var frames = this.frames;
		for(var i = 0; i < frames.length; i++)
		{
			var frame = frames[i];
			frame.duration = durationPerFrame;
		}

		return this;
	}

	/**
	 * Sets the anchor point for all frames in this flipbook.
	 *
	 * @returns This instance, for chaining.
	 */
	public setAnchor(x:number, y:number):Flipbook<T>
	{
		var frames = this.frames;
		for(var i = 0; i < frames.length; i++)
		{
			var frame = frames[i];
			frame.anchorX = x;
			frame.anchorY = y;
		}
		return this;
	}
}

class FlipbookFrame
{
	/** The texture shown during this frame. */
	public texture:Texture;

	/** How long to show this frame, in seconds. */
	public duration:number;

	/** The X position of this frame's anchor point. */
	public anchorX:number = 0;

	/** The Y position of this frame's anchor point. */
	public anchorY:number = 0;

	public label:string = null;

	constructor(texture:Texture, duration:number)
	{
		this.texture = texture;
		this.duration = duration;
	}

	public toSymbol():Symbol
	{
		return new FrameSymbol(this);
	}
}

class FrameSymbol
{
	public name:string = null;

	private _texture:any;
	private _anchorX:number;
	private _anchorY:number;

	constructor(frame:FlipbookFrame)
	{
		this._texture = frame.texture;
		this._anchorX = frame.anchorX;
		this._anchorY = frame.anchorY;
	}

	public createSprite():ImageSprite
	{
		var sprite = new ImageSprite(this._texture);
		sprite.setAnchor(this._anchorX, this._anchorY);
		return sprite;
	}
}
