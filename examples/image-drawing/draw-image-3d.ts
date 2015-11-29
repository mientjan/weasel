

import Vector3 from "../../src/util/math/Vector3";
import Matrix4 from "../../src/util/math/Matrix4";
import Stage from "../../src/draw/display/Stage";
var v3_0 = new Vector3();
var v3_1 = new Vector3();
var v3_2 = new Vector3();

var camera = new Matrix4().makePerspective(1, 4/3, 1, 1100)
var world = new Matrix4().identity();
var obj = new Matrix4().identity();



var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, {});

var items = [];
for(var i = 0; i < 50; i++)
{
	var obj1 = [i];

}


// this will keep drawing the image / you can also do a update when this image is loaded.
stage.start();