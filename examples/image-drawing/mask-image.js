define(["require", "exports", '../../src/easelts/display/Stage', '../../src/easelts/display/Bitmap', '../../src/easelts/display/Shape'], function (require, exports, Stage, Bitmap, Shape) {
    var holder = document.getElementById('holder');
    var stage = new Stage(holder, true);
    var image = new Bitmap('../assets/image/ninepatch_red.png', 0, 0, 0, 0, 0, 0);
    stage.addChild(image);
    var shape = new Shape();
    shape.graphics.rect(10, 10, 100, 100);
    image.mask = shape;
    // this will keep drawing the image / you can also do a update when this image is loaded.
    stage.start();
});
