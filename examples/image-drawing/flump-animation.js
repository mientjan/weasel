define(["require", "exports", '../../src/easelts/display/Stage', '../../src/easelts/animation/FlumpLibrary'], function (require, exports, Stage, FlumpLibrary) {
    var holder = document.getElementById('holder');
    var stage = new Stage(holder, true).setFpsCounter(true);
    stage.canvas.style.transform = 'translate3d(0,0,-1px) scale(1.000001);';
    stage.canvas.style.transformStyle = 'preserve-3d';
    FlumpLibrary.load('../assets/flump/ani-100/Interface').then(function (fl) {
        for (var i = 0; i < 50; i++) {
            var movie = fl.createMovie('animation_awesome');
            movie.setX(Math.random() * stage.width).setY(Math.random() * stage.height);
            movie.play(-1);
            stage.addChild(movie);
            var movie = fl.createMovie('aniamtion_hope_sadTriangles');
            movie.setX(Math.random() * stage.width).setY(Math.random() * stage.height);
            movie.play(-1);
            stage.addChild(movie);
        }
    }).catch(function (error) { return console.log(error); });
    stage.start();
});
