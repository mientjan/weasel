define(["require", "exports", '../../src/easelts/display/Stage', '../../src/easelts/animation/FlumpLibrary'], function (require, exports, Stage, FlumpLibrary) {
    var holder = document.getElementById('holder');
    var stage = new Stage(holder, true);
    FlumpLibrary.load('../assets/flump/ani-100/TextAnimation').then(function (fl) {
        for (var i = 0; i < 1000; i++) {
            var movie = fl.createSymbol('TextLoopAnimation');
            movie.setX(Math.random() * stage.width).setY(Math.random() * stage.height);
            movie.play(-1);
            stage.addChild(movie);
        }
    }).catch(function (error) { return console.log(error); });
    stage.start();
});
