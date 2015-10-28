define(["require", "exports", '../../src/easelts/display/Stage', '../../src/easelts/display/Debug', '../../src/easelts/component/BitmapNinePatch', '../../src/easelts/component/bitmapninepatch/NinePatch', '../../src/easelts/geom/Rectangle', '../../src/easelts/behavior/ButtonBehavior'], function (require, exports, Stage_1, Debug_1, BitmapNinePatch_1, NinePatch_1, Rectangle_1, ButtonBehavior_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, true);
    stage.enableMouseOver();
    stage.addChild(new Debug_1.default);
    var video = document.createElement('video');
    video.loop = true;
    video.src = 'assets/video/placeholder_480x270.mp4';
    video.width = 480;
    video.height = 270;
    video.play();
    var nine = new NinePatch_1.default(video, new Rectangle_1.default(100, 50, 280, 170));
    stage.addChild(new BitmapNinePatch_1.default(nine, '50%', '50%', '0%', '0%', '0%', '0%').addBehavior(new ButtonBehavior_1.default));
    stage.addChild(new BitmapNinePatch_1.default(nine, '50%', '50%', '100%', '0%', '100%', '0%').addBehavior(new ButtonBehavior_1.default));
    stage.addChild(new BitmapNinePatch_1.default(nine, '50%', '50%', '0%', '100%', '0%', '100%').addBehavior(new ButtonBehavior_1.default));
    stage.addChild(new BitmapNinePatch_1.default(nine, '50%', '50%', '100%', '100%', '100%', '100%').addBehavior(new ButtonBehavior_1.default));
    stage.start();
});
