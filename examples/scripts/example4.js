define(["require", "exports", "../../src/draw/display/Stage", "../../src/draw/display/Debug", "../../src/draw/display/Bitmap", "../../src/draw/behavior/ButtonBehavior"], function (require, exports, Stage_1, Debug_1, Bitmap_1, ButtonBehavior_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, true);
    stage.enableMouseOver();
    stage.addChild(new Debug_1.default);
    var btn = new Bitmap_1.default('assets/image/ninepatch_red.png', 0, 0, '100%', 0, '100%', 0);
    btn.addBehavior(new ButtonBehavior_1.default);
    stage.addChild(btn);
    btn.addEventListener(Bitmap_1.default.EVENT_MOUSE_CLICK, function () {
        alert('i clicked this button');
    });
    stage.start();
});
