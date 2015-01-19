class Rectangle
{
	constructor(public x:number, public y:number, public width:number, public height:number)
	{
	}

	public toTriangleArray():Float32Array
	{
		var x1 = this.x;
		var x2 = this.x + this.width;
		var y1 = this.y;
		var y2 = this.y + this.height;

		return new Float32Array([
			x1, y1,
			x2, y1,
			x1, y2,
			x1, y2,
			x2, y1,
			x2, y2
		]);
	}
}

export = Rectangle;