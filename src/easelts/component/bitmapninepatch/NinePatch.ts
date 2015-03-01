import Bitmap = require('../../display/Bitmap');
import Rectangle = require('../../geom/Rectangle');
import NinePatchCoordinates = require('./NinePatchCoordinates');

/**
 *
 */
class NinePatch {

	public bitmap:Bitmap;
	public rectangle:Rectangle;

	constructor(imageOrString:HTMLImageElement|HTMLVideoElement|HTMLCanvasElement|string, rectangle:Rectangle)
	{
		this.bitmap = new Bitmap(imageOrString);
		this.rectangle = rectangle;
	}

	public getCoordinates(width:number, height:number):NinePatchCoordinates
	{
		var image = this.bitmap.image;
		var iw = image.width;
		var ih = image.height;
		var rx = this.rectangle.x;
		var ry = this.rectangle.y;
		var rw = this.rectangle.width;
		var rh = this.rectangle.height;

		var sourceRow = [
			0, ry, ry + rh, ih
		];

		var sourceColumn = [
			0, rx, rx + rw, iw
		];

		var destRow = [
			0, ry, height - ( sourceRow[3] - sourceRow[2] ), height
		];

		var destColumn = [
			0, rx, width - ( sourceColumn[3] - sourceColumn[2] ), width
		];

		return new NinePatchCoordinates(
			sourceRow, sourceColumn, destRow, destColumn
		);
	}
}

export = NinePatch;