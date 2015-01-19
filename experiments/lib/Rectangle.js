define(["require", "exports"], function (require, exports) {
    var Rectangle = (function () {
        function Rectangle(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Rectangle.prototype.toTriangleArray = function () {
            var x1 = this.x;
            var x2 = this.x + this.width;
            var y1 = this.y;
            var y2 = this.y + this.height;
            return new Float32Array([
                x1,
                y1,
                x2,
                y1,
                x1,
                y2,
                x1,
                y2,
                x2,
                y1,
                x2,
                y2
            ]);
        };
        return Rectangle;
    })();
    return Rectangle;
});
