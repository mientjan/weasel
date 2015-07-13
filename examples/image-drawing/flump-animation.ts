import Stage = require('../../src/easelts/display/Stage');
import FlumpLibrary = require('../../src/easelts/component/flump/FlumpLibrary');

var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);

//var flump = new FlumpAnimation('../../assets/flump/smoke');
//flump.

var fl = new FlumpLibrary('../../assets/flump/smoke');
fl.load(() => {
	var movie = fl.createMovie('SmokeAnimation01');

	stage.addChild(movie);
});



stage.start();