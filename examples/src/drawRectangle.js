define(["require", "exports", '../../src/easelts/display/Stage', '../../src/easelts/display/Shape'], function (require, exports, Stage, Shape) {
    var Test = (function () {
        function Test() {
            var stage = new Stage(document.getElementById('canvasElement'));
            var shape = new Shape();
            shape.graphics.beginFill('#FF0000');
            shape.graphics.drawRect(0, 0, 50, 50);
            stage.addChild(shape);
            stage.update();
        }
        return Test;
    })();
    new Test();
});
