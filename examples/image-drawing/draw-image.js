define(["require", "exports", '../../src/easelts/display/StageWebGL', '../../src/easelts/display/Bitmap'], function (require, exports, StageWebGL_1, Bitmap_1) {
    var holder = document.getElementById('holder');
    var stage = new StageWebGL_1.default(holder);
    var image = new Bitmap_1.default('../assets/image/ninepatch_red.png', 0, 0, 0, 0, 0, 0);
    stage.addChild(image);
    // this will keep drawing the image / you can also do a update when this image is loaded.
    stage.start();
});
