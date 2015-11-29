
import Stage from "../../src/draw/display/Stage";
import Debug from "../../src/draw/display/Debug";
import Bitmap from "../../src/draw/display/Bitmap";
var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);
setTimeout(() => stage.addChild(new Debug), 1000 );
stage.addChild(new Bitmap('assets/image/ninepatch_red.png'));
stage.start();