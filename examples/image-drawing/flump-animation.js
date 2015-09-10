define(["require", "exports", '../../src/easelts/display/Stage', '../../src/easelts/animation/FlumpLibrary', "../../src/easelts/util/ArrayUtil"], function (require, exports, Stage_1, FlumpLibrary_1, ArrayUtil_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, true).setFpsCounter(true);
    stage.canvas.style.transform = 'translate3d(0,0,-1px) scale(1.000001);';
    stage.canvas.style.transformStyle = 'preserve-3d';
    FlumpLibrary_1.default.load('../assets/flump/a-100-8x8l-1024/character').then(function (fl) {
        var names = [
            'SupermanSuduction1',
            'SupermanSuduction2',
            'SupermanSuduction3',
            'SupermanDie',
            'SupermanWalk',
            'SupermanSuductionWin',
            'SupermanSuductionLose'
        ];
        for (var i = 0; i < 60; i++) {
            var movie = fl.createMovie(ArrayUtil_1.default.getRandom(names));
            movie.setX(Math.random() * stage.width | 0).setY(Math.random() * stage.height | 0);
            movie.play(-1);
            stage.addChild(movie);
        }
        stage.children.sort(function (item0, item1) {
            return item0.y - item1.y;
        });
        stage.start();
        setTimeout(function () {
        }, 5000);
    }).catch(function (error) { return console.log(error); });
});
