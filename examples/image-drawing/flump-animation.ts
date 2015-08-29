import Stage = require('../../src/easelts/display/Stage');
import FlumpLibrary = require('../../src/easelts/animation/FlumpLibrary');
import FlumpMovie = require('../../src/easelts/animation/flump/FlumpMovie');

var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true).setFpsCounter(true);
stage.canvas.style.transform = 'translate3d(0,0,-1px) scale(1.000001);';
stage.canvas.style.transformStyle = 'preserve-3d';
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

FlumpLibrary.load('../assets/flump/ani-100/Interface').then((fl:FlumpLibrary) => {

	for(var i = 0; i < 50; i++)
	{
		var movie = <FlumpMovie> fl.createMovie('animation_awesome');
		movie.setX(Math.random() * stage.width).setY(Math.random() * stage.height);
		movie.play(-1);
		stage.addChild(movie);

		var movie = <FlumpMovie> fl.createMovie('aniamtion_hope_sadTriangles');
		movie.setX(Math.random() * stage.width).setY(Math.random() * stage.height);
		movie.play(-1);
		stage.addChild(movie);
	}

}).catch( error => console.log(error) );


stage.start();