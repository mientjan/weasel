import Stage = require('../../src/easelts/display/Stage');
import Bitmap = require('../../src/easelts/display/Bitmap');
import m4 = require('../../src/easelts/geom/Matrix4');
import Vector3 = require('../../src/easelts/geom/Vector3');

var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);

var image = new Bitmap('../assets/image/ninepatch_red.png', 0, 0, 0, 0, 0, 0);
stage.addChild(image);

var v3 = new Vector3(1,0,0);
var m = new m4.Matrix4();


// this will keep drawing the image / you can also do a update when this image is loaded.
stage.start();