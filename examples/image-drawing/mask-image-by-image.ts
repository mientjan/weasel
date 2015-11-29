
import Stage from "../../src/draw/display/Stage";
import Container from "../../src/draw/display/Container";
import CanvasBuffer from "../../src/draw/display/buffer/CanvasBuffer";
import Bitmap from "../../src/draw/display/Bitmap";
var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, {autoResize:true});

var container = new Container().setBuffer(new CanvasBuffer(500, 500), true)
var image = new Bitmap('../assets/image/ninepatch_red.png', '100%', '100%', 0, 0, 0, 0);
var mask = new Bitmap('../assets/image/mask-image.png', 0, 0, '50%', '50%', '50%', '50%');
mask.compositeOperation = Bitmap.COMPOSITE_OPERATION_DESTINATION_OUT;

container.addChild(image);
container.addChild(mask);

stage.addChild(container);

var container = new Container().setBuffer(new CanvasBuffer(500, 500));

var mask = new Bitmap('../assets/image/mask-image.png', 0, 0, 20, 20, 0, 0);
var image = new Bitmap('../assets/image/ninepatch_red.png', '50%', '50%', 0, 0, 0, 0);
mask.compositeOperation = Bitmap.COMPOSITE_OPERATION_DESTINATION_IN;

container.addChild(image);
container.addChild(mask);
stage.addChild(container);

stage.start();

setTimeout(() => {
	container.cache(0, 0, 1000, 1000, 1);
}, 1000);