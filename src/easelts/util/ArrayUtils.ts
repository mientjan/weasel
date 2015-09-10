import DisplayObject from "../display/DisplayObject";
import Bounds from "../geom/Bounds";
import Size from "../geom/Size";
import Point from "../geom/Point";

class ArrayUtils
{
	public static getMaxSize(arr:DisplayObject[]):Size
	{
		var size = new Size(0, 0);
		for(var i = 0; i < arr.length; i++)
		{
			size.width = Math.max(arr[i].width, size.width);
			size.height = Math.max(arr[i].height, size.height);
		}

		return size;
	}

	public static getSize(arr:DisplayObject[]):Size
	{
		var size = new Size(0, 0);
		for(var i = 0; i < arr.length; i++)
		{
			size.width += arr[i].width;
			size.height += arr[i].height;
		}

		return size;
	}
}

export default ArrayUtils;