import Stage = require('../src/easel/display/Stage');
import Shape = require('../src/easel/display/Shape');

class Start {
	constructor(){
		var stage = new Stage( document.getElementById('canvasElement') );

		var shape = new Shape();
		shape.graphics.beginFill('#FF0000');
		shape.graphics.drawRect(0,0,50,50);

		stage.addChild(shape);

		stage.update();
	}
}

var s = new Start();