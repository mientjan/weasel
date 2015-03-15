define(["require", "exports", '../../src/easelts/display/Stage', '../../src/easelts/display/Debug'], function (require, exports, Stage, Debug) {
    var holder = document.getElementById('holder');
    var stage = new Stage(holder);
    stage.addChild(new Debug);
    stage.start();
});
