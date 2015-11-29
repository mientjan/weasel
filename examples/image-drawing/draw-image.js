define(["require", "exports", "../../src/util/math/Vector3", "../../src/draw/display/Stage", "../../src/draw/display/Bitmap"], function (require, exports, Vector3_1, Stage_1, Bitmap_1) {
    var v3 = new Vector3_1.default();
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, {});
    var image = new Bitmap_1.default('../assets/image/ninepatch_red.png', 0, 0, 0, 0, 0, 0);
    stage.addChild(image);
    stage.start();
});
