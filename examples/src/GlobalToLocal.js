define(["require", "exports", '../../src/easel/display/Stage', '../../src/easel/display/Text', '../../src/easel/display/Container', '../../src/easel/utils/Ticker', '../../src/easel/display/Graphics', '../../src/easel/display/Shape'], function (require, exports, Stage, Text, Container, Ticker, Graphics, Shape) {
    var canvas;
    var stage;
    var _mouseIsDown;
    var _mouseX;
    var _mouseY;
    var spin1; // nested invisble container to generate a spirograph effect
    var spin2; // nested invisble container to generate a spirograph effect
    var shape; // drawing shape
    var color; // drawing color
    var lastPt; // last draw position
    var text;
    var graphics;
    var count = 0;
    var Test = (function () {
        function Test() {
            // create a new stage and point it at our canvas:
            canvas = document.getElementById("testCanvas");
            stage = new Stage(canvas);
            // attach mouse handlers directly to the source canvas
            // better than calling from canvas tag for cross browser
            stage.enableDOMEvents(true);
            stage.addEventListener("stagemousemove", this.mouseMove);
            stage.addEventListener("stagemousedown", this.mouseDown);
            stage.addEventListener("stagemouseup", this.mouseUp);
            text = new Text("Click and Drag", "36px Arial", "#777777");
            text.x = 360;
            text.y = 200;
            stage.addChild(text);
            // shape to draw vector data into:
            shape = new Shape();
            shape.x = 41; //position in parent container
            graphics = shape.graphics;
            // middle spinner:
            spin2 = new Container();
            spin2.addChild(shape);
            spin2.x = 303; //position in parent container
            // outside spinner:
            spin1 = new Container();
            spin1.addChild(spin2);
            // center it on the stage:
            spin1.x = canvas.width / 2;
            spin1.y = canvas.height / 2;
            stage.addChild(spin1);
            // start the tick and point it at the window so we can do some work before updating the stage:
            Ticker.getInstance().setFPS(30);
            Ticker.getInstance().ticker.connectImpl(this.tick, false);
        }
        Test.prototype.tick = function (event) {
            console.log(event);
            // update rotation:
            spin1.rotation += 10;
            spin2.rotation += -7;
            shape.rotation += 3;
            if (_mouseIsDown) {
                var color = Graphics.getHSL(Math.cos((count++) * 0.01) * 180, 100, 50, 1.0);
                // set up our drawing properties:
                graphics.setStrokeStyle(Math.random() * 20 + 2, "round").beginStroke(color);
                // start the line at the last position:
                graphics.moveTo(lastPt.x, lastPt.y);
                // calculate the new position in the shape's local coordinate space:
                lastPt = shape.globalToLocal(_mouseX, _mouseY);
                // draw the line, and close the path:
                graphics.lineTo(lastPt.x, lastPt.y);
            }
            // update the stage:
            stage.update(event);
        };
        //start drawing
        Test.prototype.mouseDown = function (event) {
            //if(!e){ e = window.event; }
            stage.removeChild(text);
            _mouseIsDown = true;
            // set up the first point in the new draw, and choose a random color:
            lastPt = shape.globalToLocal(event.nativeEvent.pageX - canvas.offsetLeft, event.nativeEvent.pageY - canvas.offsetTop);
            //color = "#"+(Math.random()*0xFFFFFF|0).toString(16);
            // clear the cache, so the vector data is drawn each tick:
            shape.uncache();
        };
        //stop drawing
        Test.prototype.mouseUp = function () {
            _mouseIsDown = false;
            // cache the vector data to a saved canvas, so we don't have to render it each tick:
            shape.cache(-800, -800, 1600, 1600);
        };
        //update mouse positions
        Test.prototype.mouseMove = function (e) {
            //if(!e){ e = window.event; }
            _mouseX = e.nativeEvent.pageX - canvas.offsetLeft;
            _mouseY = e.nativeEvent.pageY - canvas.offsetTop;
        };
        return Test;
    })();
    new Test();
});
