define(["require", "exports", '../../src/easelts/display/Stage', '../../src/easelts/animation/FlumpLibrary', "../../src/easelts/util/ArrayUtil", "../../src/easelts/display/StageWebGL"], function (require, exports, Stage_1, FlumpLibrary_1, ArrayUtil_1, StageWebGL_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, true).setFpsCounter(true);
    var stage = new StageWebGL_1.default(holder, true).setFpsCounter(true);
    //stage.autoClear = false;
    //var flump = new FlumpAnimation('../../assets/flump/smoke');
    //flump.
    //FlumpLibrary.load('../assets/flump/ani-100/TextAnimation').then((fl:FlumpLibrary) => {
    //
    //	for(var i = 0; i < 10000; i++)
    //	{
    //		var movie = <FlumpMovie> fl.createSymbol('TextLoopAnimation');
    //		movie.setX(Math.random() * stage.width).setY(Math.random() * stage.height);
    //		movie.play(-1);
    //		stage.addChild(movie);
    //	}
    //
    //}).catch( error => console.log(error) );
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
            //var movie = <FlumpMovie> fl.createMovie('SupermanWalk');
            movie.setX(Math.random() * stage.width | 0).setY(Math.random() * stage.height | 0);
            movie.play(-1);
            stage.addChild(movie);
        }
        stage.children.sort(function (item0, item1) {
            return item0.y - item1.y;
        });
        //console.time('performance');
        //console.profile('performance');
        stage.start();
        setTimeout(function () {
            //console.profileEnd('performance');
            //console.timeEnd('performance');
        }, 5000);
        //var y0 = 0;
        //var y1 = 0;
        //stage.children.forEach((element) => {
        //	y0 = Math.min(element.y, y0);
        //	y1 = Math.max(element.y, y1);
        //})
        //stage.children.forEach((element) => {
        //	element.scaleX = element.scaleY = (element.y - y0) / y1;
        //	//y1 = Math.max(element.y, y1);
        //})
    }).catch(function (error) { return console.log(error); });
});
