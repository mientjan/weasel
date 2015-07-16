import Stage = require('../../src/easelts/display/Stage');
import FlumpLibrary = require('../../src/easelts/component/flump/FlumpLibrary');
import FlumpMovie = require('../../src/easelts/component/flump/FlumpMovie');

var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);

//var flump = new FlumpAnimation('../../assets/flump/smoke');
//flump.

FlumpLibrary.load('../../assets/flump/smoke').then((fl:FlumpLibrary) => {
	var movie = <FlumpMovie> fl.createSymbol('SmokeAnimation01');
	movie.setX('50%').setY('50%');
	movie.play(1, 'start');
	movie.play(-1, 'loop');
	movie.play(1, 'end');

	stage.addChild(movie);
}).catch( error => console.log(error) );

stage.start();