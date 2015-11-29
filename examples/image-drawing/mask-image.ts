
import Stage from "../../src/draw/display/Stage";
import Bitmap from "../../src/draw/display/Bitmap";
import Shape from "../../src/draw/display/Shape";
var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, {autoResize:true});

var image = new Bitmap('../assets/image/ninepatch_red.png', 0, 0, 0, 0, 0, 0);
stage.addChild(image);

var shape = new Shape();
shape.graphics.rect(10,10,100,100);

image.mask = shape;

// this will keep drawing the image / you can also do a update when this image is loaded.
stage.start();