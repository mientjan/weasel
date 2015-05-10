define(["require", "exports", '../../src/easelts/display/Stage', '../../src/easelts/display/Bitmap', '../../src/easelts/geom/Matrix4', '../../src/easelts/geom/Vector3'], function (require, exports, Stage, Bitmap, m4, Vector3) {
    var holder = document.getElementById('holder');
    var stage = new Stage(holder, true);
    var image = new Bitmap('../assets/image/ninepatch_red.png', 0, 0, 0, 0, 0, 0);
    stage.addChild(image);
    var v3 = new Vector3(1, 0, 0);
    var m = new m4.Matrix4();
    stage.start();
});
