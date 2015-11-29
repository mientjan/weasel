var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../display/DisplayObject"], function (require, exports, DisplayObject_1) {
    var now = (window.performance && window.performance.now) ? window.performance.now.bind(performance) : Date.now;
    var Stats = (function (_super) {
        __extends(Stats, _super);
        function Stats(x, y, rx, ry) {
            if (x === void 0) { x = '100%'; }
            if (y === void 0) { y = 0; }
            if (rx === void 0) { rx = '100%'; }
            if (ry === void 0) { ry = 0; }
            _super.call(this, 100, 50, x, y, rx, ry);
            this.text = '';
            this.startTime = now();
            this.prevTime = this.startTime;
            this.frames = 0;
            this.mode = 0;
            this.fps = 0;
            this.fpsMin = Infinity;
            this.fpsMax = 0;
            this.ms = 0;
            this.msMin = Infinity;
            this.msMax = 0;
            this.graph = new Array(100).map(function () { return 0; });
        }
        Stats.prototype.updateGraph = function (graph, value) {
            graph.shift();
            graph.push(Math.max(0, Math.min(this.height, this.height - value * this.height)));
        };
        Stats.prototype.draw = function (ctx, ignore) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.fillStyle = '#FF0000';
            for (var i = 0; i < this.graph.length; i++) {
                var graph = this.graph[i];
                ctx.fillRect(i * 1, this.height - graph, 1, graph);
            }
            ctx.fillStyle = '#000000';
            ctx.textAlign = "right";
            ctx.textBaseline = 'bottom';
            ctx.font = "10px Georgia";
            ctx.fillText(this.text, this.width - 2, this.height - 2);
            return true;
        };
        Stats.prototype.begin = function () {
            this.startTime = now();
        };
        Stats.prototype.end = function () {
            var time = now();
            this.ms = time - this.startTime;
            this.msMin = Math.min(this.msMin, this.ms);
            this.msMax = Math.max(this.msMax, this.ms);
            this.text = (this.ms | 0) + ' MS (' + (this.msMin | 0) + '-' + (this.msMax | 0) + ')';
            this.updateGraph(this.graph, this.ms / 200);
            this.frames++;
            return time;
        };
        Stats.prototype.update = function () {
            this.startTime = this.end();
        };
        return Stats;
    })(DisplayObject_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Stats;
});
