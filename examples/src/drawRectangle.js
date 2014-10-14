define(["require", "exports", '../../src/easel/display/Stage', '../../src/easel/display/Shape'], function (require, exports, Stage, Shape) {
    var Start = (function () {
        function Start() {
            var stage = new Stage(document.getElementById('canvasElement'));
            var shape = new Shape();
            shape.graphics.beginFill('#FF0000');
            shape.graphics.drawRect(0, 0, 50, 50);
            stage.addChild(shape);
            stage.update();
        }
        return Start;
    })();
    var s = new Start();
});
