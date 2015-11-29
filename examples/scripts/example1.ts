
import Stage from "../../src/draw/display/Stage";
import Debug from "../../src/draw/display/Debug";
var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);
stage.addChild(new Debug);
stage.start();