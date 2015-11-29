

import Stage from "../../src/draw/display/Stage";
import Debug from "../../src/draw/display/Debug";
import Bitmap from "../../src/draw/display/Bitmap";
import ButtonBehavior from "../../src/draw/behavior/ButtonBehavior";
var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);
stage.enableMouseOver();
stage.addChild(new Debug);

var btn = new Bitmap('assets/image/ninepatch_red.png', 0, 0, '100%', 0, '100%', 0);
btn.addBehavior(new ButtonBehavior);
stage.addChild(btn);

btn.addEventListener(Bitmap.EVENT_MOUSE_CLICK, () => {
	alert('i clicked this button');
})


stage.start();