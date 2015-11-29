define(["require", "exports", "../../src/draw/display/Stage", "../../src/draw/display/Container", "../../src/draw/display/buffer/CanvasBuffer", "../../src/draw/display/Bitmap"], function (require, exports, Stage_1, Container_1, CanvasBuffer_1, Bitmap_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, { autoResize: true });
    var container = new Container_1.default().setBuffer(new CanvasBuffer_1.default(500, 500), true);
    var image = new Bitmap_1.default('../assets/image/ninepatch_red.png', '100%', '100%', 0, 0, 0, 0);
    var mask = new Bitmap_1.default('../assets/image/mask-image.png', 0, 0, '50%', '50%', '50%', '50%');
    mask.compositeOperation = Bitmap_1.default.COMPOSITE_OPERATION_DESTINATION_OUT;
    container.addChild(image);
    container.addChild(mask);
    stage.addChild(container);
    var container = new Container_1.default().setBuffer(new CanvasBuffer_1.default(500, 500));
    var mask = new Bitmap_1.default('../assets/image/mask-image.png', 0, 0, 20, 20, 0, 0);
    var image = new Bitmap_1.default('../assets/image/ninepatch_red.png', '50%', '50%', 0, 0, 0, 0);
    mask.compositeOperation = Bitmap_1.default.COMPOSITE_OPERATION_DESTINATION_IN;
    container.addChild(image);
    container.addChild(mask);
    stage.addChild(container);
    stage.start();
    setTimeout(function () {
        container.cache(0, 0, 1000, 1000, 1);
    }, 1000);
});
