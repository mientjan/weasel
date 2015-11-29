define(["require", "exports", "../../src/draw/display/Stage", "../../src/draw/component/bitmapninepatch/NinePatch", "../../src/draw/geom/Rectangle", "../../src/draw/component/BitmapNinePatch", "../../src/draw/display/Debug"], function (require, exports, Stage_1, NinePatch_1, Rectangle_1, BitmapNinePatch_1, Debug_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, { autoResize: true });
    var ninePatch = new NinePatch_1.default('../assets/image/ninepatch_red.png', new Rectangle_1.default(100, 100, 300, 300));
    var image = new BitmapNinePatch_1.default(ninePatch);
    stage.addChild(new Debug_1.default);
    stage.addChild(image);
    stage.start();
});
