
import Stage from "../../src/draw/display/Stage";
import Debug from "../../src/draw/display/Debug";
var holder = document.getElementById('holder');

var stage = new Stage( <HTMLDivElement> holder, {});
stage.start();

stage.addChild(new Debug('canvas', '100% - 300', '100% - 300', '50%', '50%', '50%', '50%'));

