define(["require", "exports", '../../../src/easelts/display/SpriteStage', '../../../src/easelts/display/Bitmap'], function (require, exports, SpriteStage, Bitmap) {
    var canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    document.body.appendChild(canvas);
    var stage = new SpriteStage(canvas);
    var img = new Image();
    img.onload = function () {
        var bitmap = new Bitmap(img);
        stage.addChild(bitmap);
        stage.start();
    };
    img.src = '../assets/webgl_shark.png';
});
