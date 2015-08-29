import Stage = require('../../src/easelts/display/Stage');
import FlumpLibrary = require('../../src/easelts/animation/FlumpLibrary');
import FlumpMovie = require('../../src/easelts/animation/flump/FlumpMovie');

var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);

//var flump = new FlumpAnimation('../../assets/flump/smoke');
//flump.

FlumpLibrary.load('../assets/flump/ani-100/TextAnimation').then((fl:FlumpLibrary) => {

	for(var i = 0; i < 1000; i++)
	{
		var movie = <FlumpMovie> fl.createSymbol('TextLoopAnimation');
		movie.setX(Math.random() * stage.width).setY(Math.random() * stage.height);
		movie.play(-1);
		stage.addChild(movie);

	}

}).catch( error => console.log(error) );

stage.start();