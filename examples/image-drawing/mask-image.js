define(["require", "exports", "../../src/draw/display/Stage", "../../src/draw/display/Bitmap", "../../src/draw/display/Shape"], function (require, exports, Stage_1, Bitmap_1, Shape_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, { autoResize: true });
    var image = new Bitmap_1.default('../assets/image/ninepatch_red.png', 0, 0, 0, 0, 0, 0);
    stage.addChild(image);
    var shape = new Shape_1.default();
    shape.graphics.rect(10, 10, 100, 100);
    image.mask = shape;
    stage.start();
});
