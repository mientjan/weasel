import Stage = require('../../src/easelts/display/Stage');
import Shape = require('../../src/easelts/display/Shape');

class Test {
	constructor(){
		var stage = new Stage( <HTMLDivElement> document.getElementById('canvasElement') );

		var shape = new Shape();
		shape.graphics.beginFill('#FF0000');
		shape.graphics.drawRect(0,0,50,50);

		stage.addChild(shape);

		stage.update();
	}
}

new Test();