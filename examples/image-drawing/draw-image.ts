
import Vector3 from "../../src/util/math/Vector3";
import Stage from "../../src/draw/display/Stage";
import Bitmap from "../../src/draw/display/Bitmap";
var v3 = new Vector3();

var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, {});

var image = new Bitmap('../assets/image/ninepatch_red.png', 0, 0, 0, 0, 0, 0);
stage.addChild(image);

// this will keep drawing the image / you can also do a update when this image is loaded.
stage.start();