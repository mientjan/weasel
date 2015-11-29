define(["require", "exports", "../../src/draw/display/Stage", "../../src/draw/display/Debug", "../../src/draw/display/Bitmap"], function (require, exports, Stage_1, Debug_1, Bitmap_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, true);
    setTimeout(function () { return stage.addChild(new Debug_1.default); }, 1000);
    stage.addChild(new Bitmap_1.default('assets/image/ninepatch_red.png'));
    stage.start();
});
