define(["require", "exports", '../../src/easelts/ui/Touch', '../../src/easelts/display/Stage', '../../src/createts/utils/Ticker', '../../src/easelts/display/Shape', '../../src/easelts/display/Text', '../../src/easelts/geom/Point'], function (require, exports, Touch, Stage, Ticker, Shape, Text, Point) {
    var CurveTo = (function () {
        function CurveTo() {
            this.canvas = document.getElementById("canvas");
            this.colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];
            this.stroke = 1;
            this.index = 0;
            if (window.top != window) {
                document.getElementById("header").style.display = "none";
            }
            // check to see if we are running in a browser with touch support
            this.stage = new Stage(this.canvas);
            this.stage.autoClear = false;
            this.stage.enableDOMEvents(true);
            Touch.enable(this.stage);
            Ticker.getInstance().setFPS(24);
            this.drawingCanvas = new Shape();
            this.stage.addEventListener("stagemousedown", this.handleMouseDown.bind(this));
            this.stage.addEventListener("stagemouseup", this.handleMouseUp.bind(this));
            this.title = new Text("Click and Drag to draw", "36px Arial", "#777777");
            this.title.x = 300;
            this.title.y = 200;
            this.stage.addChild(this.title);
            this.stage.addChild(this.drawingCanvas);
            this.stage.update();
        }
        CurveTo.prototype.handleMouseDown = function (event) {
            if (this.stage.contains(this.title)) {
                this.stage.clear();
                this.stage.removeChild(this.title);
            }
            this.color = this.colors[(this.index++) % this.colors.length];
            this.stroke = Math.random() * 30 + 10 | 0;
            this.oldPt = new Point(this.stage.mouseX, this.stage.mouseY);
            this.oldMidPt = this.oldPt;
            this.stage.addEventListener("stagemousemove", this.handleMouseMove.bind(this));
        };
        CurveTo.prototype.handleMouseMove = function (event) {
            var midPt = new Point(this.oldPt.x + this.stage.mouseX >> 1, this.oldPt.y + this.stage.mouseY >> 1);
            var g = this.drawingCanvas.graphics;
            g.clear();
            g.setStrokeStyle(this.stroke, 'round', 'round').beginStroke(this.color).moveTo(midPt.x, midPt.y).curveTo(this.oldPt.x, this.oldPt.y, this.oldMidPt.x, this.oldMidPt.y);
            this.oldPt.x = this.stage.mouseX;
            this.oldPt.y = this.stage.mouseY;
            this.oldMidPt.x = midPt.x;
            this.oldMidPt.y = midPt.y;
            this.stage.update();
        };
        CurveTo.prototype.handleMouseUp = function (event) {
            this.stage.removeAllEventListeners("stagemousemove");
        };
        return CurveTo;
    })();
    var ct = new CurveTo();
});
