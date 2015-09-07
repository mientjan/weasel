//import ref from "lib/ReferenceDefinitions";
import DisplayObject from "../display/DisplayObject";
//import Point from "../geom/Point";
import Bounds from "../geom/Bounds";
import IVector2 from "../interface/IVector2";
import Vector2 from "../geom/Vector2";

class TickAnimateUtil
{
	private static _idCollection:{[index:number]:{time:number}} = {};

	public static getTimeByUID(uid:number):{time:number}
	{
		if(!TickAnimateUtil._idCollection[uid]){
			TickAnimateUtil._idCollection[uid] = {time:0};
		}

		return TickAnimateUtil._idCollection[uid];
	}


	public static jojo(tick:number, duration:number, element:DisplayObject, from:any, to:any)
	{
		var time = TickAnimateUtil.getTimeByUID(element.id);
		time.time += tick;
		time.time %= duration;


	}
}

export default TickAnimateUtil;