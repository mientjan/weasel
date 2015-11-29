//import FollowMouseBehavior from 'lib/easelts/behavior/FollowMouseBehavior';
define(["require", "exports", "../../src/draw/display/Stage", "../../src/draw/display/Debug", "../../src/draw/component/BitmapNinePatch", "../../src/draw/component/bitmapninepatch/NinePatch", "../../src/draw/geom/Rectangle"], function (require, exports, Stage_1, Debug_1, BitmapNinePatch_1, NinePatch_1, Rectangle_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, true);
    stage.enableMouseOver();
    stage.addChild(new Debug_1.default);
    var bitmap = new BitmapNinePatch_1.default(new NinePatch_1.default('assets/image/ninepatch_red.png', new Rectangle_1.default(40, 100, 160, 100)), '50%', '50%', '50%', '50%', '50%', '50%');
    stage.addChild(bitmap);
    stage.start();
});
