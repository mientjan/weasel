define(["require", "exports", '../../src/easelts/display/Bitmap', "../../src/easelts/display/Stage"], function (require, exports, Bitmap_1, Stage_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, {});
    var image = new Bitmap_1.default('../assets/image/ninepatch_red.png', 0, 0, 0, 0, 0, 0);
    stage.addChild(image);
    stage.start();
});
