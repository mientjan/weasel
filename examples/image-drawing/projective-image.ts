import Stage = require('../../src/easelts/display/Stage');
import Bitmap = require('../../src/easelts/display/Bitmap');
import BitmapProjective = require('../../src/easelts/display/BitmapProjective');

var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);

var image = new BitmapProjective('../assets/image/ninepatch_red.png', [
	[100, 100],
	[200 + Math.random() * 200, 100],
	[100, 200 + Math.random() * 200],
	[200 + Math.random() * 200, 200 + Math.random() * 200]
], 0, 0, 0);
stage.addChild(image);

stage.start();