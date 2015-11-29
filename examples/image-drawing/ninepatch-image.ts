
import Stage from "../../src/draw/display/Stage";
import NinePatch from "../../src/draw/component/bitmapninepatch/NinePatch";
import Rectangle from "../../src/draw/geom/Rectangle";
import BitmapNinePatch from "../../src/draw/component/BitmapNinePatch";
import Debug from "../../src/draw/display/Debug";
var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, {autoResize:true});

var ninePatch = new NinePatch('../assets/image/ninepatch_red.png', new Rectangle(100, 100, 300, 300));
var image = new BitmapNinePatch(ninePatch);
stage.addChild(new Debug);
stage.addChild(image);

stage.start();