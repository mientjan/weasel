import Stage from "../../src/draw/display/Stage";
import Debug from "../../src/draw/display/Debug";
import Bitmap from "../../src/draw/display/Bitmap";

var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);
stage.addChild(new Debug);
stage.addChild(new Bitmap('assets/image/ninepatch_red.png', 0, 0, '100%', 0, '100%', 0));
stage.start();