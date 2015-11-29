
//import FollowMouseBehavior from 'lib/easelts/behavior/FollowMouseBehavior';

import Stage from "../../src/draw/display/Stage";
import Debug from "../../src/draw/display/Debug";
import BitmapNinePatch from "../../src/draw/component/BitmapNinePatch";
import NinePatch from "../../src/draw/component/bitmapninepatch/NinePatch";
import Rectangle from "../../src/draw/geom/Rectangle";
var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);
stage.enableMouseOver();
stage.addChild(new Debug);

var bitmap = new BitmapNinePatch(
	new NinePatch('assets/image/ninepatch_red.png', new Rectangle(40, 100, 160, 100) ),
	'50%', '50%', '50%', '50%', '50%', '50%'
);

stage.addChild(bitmap);
//bitmap.addBehavior(new FollowMouseBehavior);

stage.start();