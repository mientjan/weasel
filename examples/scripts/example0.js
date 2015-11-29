define(["require", "exports", "../../src/draw/display/Stage", "../../src/draw/display/Shape", "../../src/draw/behavior/FollowMouseBehavior"], function (require, exports, Stage_1, Shape_1, FollowMouseBehavior_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, {});
    stage.start();
    var spiral = new Shape_1.default();
    stage.addChild(spiral);
    spiral.addBehavior(new FollowMouseBehavior_1.default);
    var a = 1;
    var b = 4;
    var total = 720;
    var index = 0;
    var cx = stage.width / 2;
    var cy = stage.height / 2;
    console.log(cx, cy);
    spiral.graphics.moveTo(cx, cy);
    spiral.graphics.beginStroke('#000');
    spiral.graphics.setStrokeStyle(2);
    var x = 0;
    var y = 0;
    setInterval(function () {
        var lineSize = 1 + Math.floor(index / total * 30);
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);
        var color = 'rgba(' + [r, g, b].join(',') + ', 1)';
        spiral.graphics.beginStroke(color);
        spiral.graphics.moveTo(x, y);
        spiral.graphics.setStrokeStyle(lineSize);
    }, 1000 / 10);
    setInterval(function () {
        if (index < total) {
            var angle = 0.1 * index;
            x = cx + (a + b * angle) * Math.cos(angle);
            y = cy + (a + b * angle) * Math.sin(angle);
            spiral.graphics.lineTo(x, y);
            index++;
        }
    }, 1000 / 60);
});
