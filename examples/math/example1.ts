import Stage = require('../../src/easelts/display/Stage');
import Bitmap = require('../../src/easelts/display/Bitmap');
//import Math3D = require('../../src/easelts/geom/Math3D');

//import Ticker = require('../../src/createts/util/Ticker');

var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);

var image = new Bitmap('../assets/image/ninepatch_red.png', 0, 0, 0, 0, 0, 0);
stage.addChild(image);


//
//setInterval(() => {
//	image.x++;
//}, 1000/60)

//var m = new Math3D.Matrix4();
//
//var x = new Math3D.Matrix4();
//var y = new Math3D.Matrix4();
//var z = new Math3D.Matrix4();
//
//var alpha = 0;
//var beta = Math.PI;
//var gamma = Math.PI/2;
//
//x.makeRotationX( alpha );
//y.makeRotationY( beta );
////z.makeRotationZ( gamma );
//
//m.multiplyMatrices( x, y );
//m.multiply( z );
//
//
//
//
//// this will keep drawing the image / you can also do a update when this image is loaded.
//
//var position = new Math3D.Vector3();
//var rotation = new Math3D.Quaternion();
//var scale = new Math3D.Vector3();
//

var test  = () => {
	console.log('test')
	//	m.decompose(position, rotation, scale);
	//
	//	image.x = position.x;
	//	image.y = position.y;

	//	console.log(position.x, position.y, position.z);

}
//var signal = Ticker.getInstance().addTickListener(test);

//console.log(signal);

//stage.start();