define(["require", "exports", '../../src/easel/display/Stage', '../../src/easel/display/Bitmap', '../../src/easel/display/Shape', '../../src/easel/display/Graphics', '../../src/easel/display/Text', '../../src/easel/geom/Point', '../../src/easel/ui/Touch', '../../src/easel/filters/BlurFilter', '../../src/easel/filters/AlphaMaskFilter'], function (require, exports, Stage, Bitmap, Shape, Graphics, Text, Point, Touch, BlurFilter, AlphaMaskFilter) {
    var Test = (function () {
        function Test() {
            document.getElementById("loader").className = "loader";
            this.image = new Image();
            this.image.onload = this.handleComplete.bind(this);
            this.image.src = "assets/AlphaMaskImage.png";
            this.stage = new Stage("canvas");
            this.text = new Text("Loading...", "20px Arial", "#999999");
            this.text.set({ x: this.stage.canvas.width / 2, y: this.stage.canvas.height - 80 });
            this.text.textAlign = "center";
        }
        Test.prototype.handleComplete = function () {
            document.getElementById("loader").className = "";
            Touch.enable(this.stage);
            this.stage.enableMouseOver();
            this.stage.addEventListener("stagemousedown", this.handleMouseDown.bind(this));
            this.stage.addEventListener("stagemouseup", this.handleMouseUp.bind(this));
            this.stage.addEventListener("stagemousemove", this.handleMouseMove.bind(this));
            this.drawingCanvas = new Shape();
            this.bitmap = new Bitmap(this.image);
            this.blur = new Bitmap(this.image);
            this.blur.filters = [new BlurFilter(15, 15, 2)];
            this.blur.cache(0, 0, 960, 400);
            this.blur.alpha = 0.9;
            this.text.text = "Click and Drag to Reveal the Image.";
            this.stage.addChild(this.blur, this.text, this.bitmap);
            this.updateCacheImage(false);
            this.cursor = new Shape(new Graphics().beginFill("#FFFFFF").drawCircle(0, 0, 20));
            this.cursor.cursor = "pointer";
            this.stage.addChild(this.cursor);
        };
        Test.prototype.handleMouseDown = function (event) {
            this.oldPt = new Point(this.stage.mouseX, this.stage.mouseY);
            this.oldMidPt = this.oldPt;
            this.isDrawing = true;
        };
        Test.prototype.handleMouseMove = function (event) {
            this.cursor.x = this.stage.mouseX;
            this.cursor.y = this.stage.mouseY;
            if (!this.isDrawing) {
                this.stage.update();
                return;
            }
            var midPoint = new Point(this.oldPt.x + this.stage.mouseX >> 1, this.oldPt.y + this.stage.mouseY >> 1);
            this.drawingCanvas.graphics.setStrokeStyle(40, "round", "round").beginStroke("rgba(0,0,0,0.15)").moveTo(midPoint.x, midPoint.y).curveTo(this.oldPt.x, this.oldPt.y, this.oldMidPt.x, this.oldMidPt.y);
            this.oldPt.x = this.stage.mouseX;
            this.oldPt.y = this.stage.mouseY;
            this.oldMidPt.x = midPoint.x;
            this.oldMidPt.y = midPoint.y;
            this.updateCacheImage(true);
        };
        Test.prototype.handleMouseUp = function (event) {
            this.updateCacheImage(true);
            this.isDrawing = false;
        };
        Test.prototype.updateCacheImage = function (update) {
            if (update) {
                this.drawingCanvas.updateCache();
            }
            else {
                this.drawingCanvas.cache(0, 0, this.image.width, this.image.height);
            }
            this.maskFilter = new AlphaMaskFilter(this.drawingCanvas.cacheCanvas);
            this.bitmap.filters = [this.maskFilter];
            if (update) {
                this.bitmap.updateCache(0, 0, this.image.width, this.image.height);
            }
            else {
                this.bitmap.cache(0, 0, this.image.width, this.image.height);
            }
            this.stage.update();
        };
        return Test;
    })();
    var bt = new Test();
});
