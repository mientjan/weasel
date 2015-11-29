define(["require", "exports", '../../src/easelts/display/Bitmap', "../../src/easelts/display/Stage", "../../src/easelts/geom/Vector3"], function (require, exports, Bitmap_1, Stage_1, Vector3_1) {
    var v3 = new Vector3_1.default();
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, {});
    var image = new Bitmap_1.default('../assets/image/ninepatch_red.png', 0, 0, 0, 0, 0, 0);
    stage.addChild(image);
    stage.start();
});
