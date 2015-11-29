define(["require", "exports", "../../src/draw/animation/FlumpLibrary", "../../src/draw/display/Stage", "../../src/util/ArrayUtil"], function (require, exports, FlumpLibrary_1, Stage_1, ArrayUtil_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, { autoResize: true }).setFpsCounter(true);
    FlumpLibrary_1.default.load('../assets/flump/animations-100/character').then(function (fl) {
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
