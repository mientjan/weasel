import Touch = require('../../src/easel/ui/Touch');
import Stage = require('../../src/easel/display/Stage');
import Ticker = require('../../src/easel/utils/Ticker');
import SignalConnection = require('../../src/createts/events/SignalConnection');
import TimeEvent = require('../../src/createts/events/TimeEvent');
import Shape = require('../../src/easel/display/Shape');
import Text = require('../../src/easel/display/Text');
import Point = require('../../src/easel/geom/Point');


class Test
{

	canvas;
	stage;
	shape;
	circleRadius = 30;
	rings = 30;
	fpsLabel;
	tickerConnection:SignalConnection = null;

	constructor()
	{


		// create a new stage and point it at our canvas:
		this.canvas = document.getElementById("canvas");
		this.stage = new Stage(this.canvas);

		// create a large number of slightly complex vector shapes, and give them random positions and velocities:

		var colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];

		for(var i = 0; i < 200; i++)
		{
			var shape = new Shape();
			for(var j = this.rings; j > 0; j--)
			{
				shape.graphics.beginFill(colors[Math.random() * colors.length | 0]).drawCircle(0, 0, this.circleRadius * j / this.rings);
			}
			shape.x = Math.random() * this.canvas.width;
			shape.y = Math.random() * this.canvas.height;
			shape['velX'] = Math.random() * 10 - 5;
			shape['velY'] = Math.random() * 10 - 5;

			// turn snapToPixel on for all shapes - it's set to false by default on Shape.
			// it won't do anything until stage.snapToPixelEnabled is set to true.
			shape.snapToPixel = true;

			this.stage.addChild(shape);
		}

		// add a text object to output the current FPS:
		this.fpsLabel = new Text("-- fps", "bold 18px Arial", "#FFF");
		this.stage.addChild(this.fpsLabel);
		this.fpsLabel.x = 10;
		this.fpsLabel.y = 20;

		// start the tick and point it at the window so we can do some work before updating the stage:
		this.tickerConnection = Ticker.addTickListener( this.tick.bind(this) );
		Ticker.setFPS(50);

		window['toggleCache'] = this.toggleCache.bind(this);
	}

	tick(event)
	{
		
		var w = this.canvas.width;
		var h = this.canvas.height;
		var l = this.stage.getNumChildren() - 1;

		// iterate through all the children and move them according to their velocity:
		for(var i = 1; i < l; i++)
		{
			var shape = this.stage.getChildAt(i);
			shape.x = (shape.x + shape.velX + w) % w;
			shape.y = (shape.y + shape.velY + h) % h;
		}

		this.fpsLabel.text = Math.round(Ticker.getMeasuredFPS(0)) + " fps";

		// draw the updates to stage:
		this.stage.update(event);
	}

	toggleCache(value)
	{
		// iterate all the children except the fpsLabel, and set up the cache:
		var l = this.stage.getNumChildren() - 1;

		for(var i = 0; i < l; i++)
		{
			var shape = <Shape> this.stage.getChildAt(i);
			if(value)
			{
				shape.cache(-this.circleRadius, -this.circleRadius, this.circleRadius * 2, this.circleRadius * 2);
			}
			else
			{
				shape.uncache();
			}
		}
	}
}

var c = new Test();