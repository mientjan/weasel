
import Stage from "../../src/draw/display/Stage";
import Bitmap from "../../src/draw/display/Bitmap";
var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);

var image = new Bitmap('../assets/image/ninepatch_red.png', '100%', '100%', 0, 0, 0, 0);
stage.addChild(image);

stage.start();