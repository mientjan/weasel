import Stage = require('../../src/easelts/display/Stage');
import FlumpLibrary = require('../../src/easelts/component/flump/FlumpLibrary');

var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);

//var flump = new FlumpAnimation('../../assets/flump/smoke');
//flump.

FlumpLibrary.load('../../assets/flump/smoke').then(fl => {
	var movie = fl.createSymbol('SteamAnimation02');

	movie.setX('50%').setY('50%');

	stage.addChild(movie);
}).catch( error => console.log(error) );

stage.start();