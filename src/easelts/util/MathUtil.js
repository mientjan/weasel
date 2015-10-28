define(["require", "exports"], function (require, exports) {
    var MathUtil = (function () {
        function MathUtil() {
        }
        MathUtil.clamp = function (x, a, b) {
            return (x < a) ? a : ((x > b) ? b : x);
        };
        MathUtil.clampBottom = function (x, a) {
            return x < a ? a : x;
        };
        MathUtil.mapLinear = function (x, a1, a2, b1, b2) {
            return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
        };
        MathUtil.smoothStep = function (x, min, max) {
            if (x <= min) {
                return 0;
            }
            if (x >= max) {
                return 1;
            }
            x = (x - min) / (max - min);
            return x * x * (3 - 2 * x);
        };
        MathUtil.smootherStep = function (x, min, max) {
            if (x <= min) {
                return 0;
            }
            if (x >= max) {
                return 1;
            }
            x = (x - min) / (max - min);
            return x * x * x * (x * (x * 6 - 15) + 10);
        };
        MathUtil.lerp = function (fromValue, toValue, alpha) {
            fromValue += (toValue - fromValue) * alpha;
            return fromValue;
        };
        MathUtil.random16 = function () {
            return (65280 * Math.random() + 255 * Math.random()) / 65535;
        };
        MathUtil.randInt = function (low, high) {
            return low + Math.floor(Math.random() * (high - low + 1));
        };
        MathUtil.randFloat = function (low, high) {
            return low + Math.random() * (high - low);
        };
        MathUtil.randFloatSpread = function (range) {
            return range * (0.5 - Math.random());
        };
        MathUtil.degToRad = function (degrees) {
            return degrees * MathUtil.degreeToRadiansFactor;
        };
        MathUtil.radToDeg = function (radians) {
            return radians * MathUtil.radianToDegreesFactor;
        };
        MathUtil.isPowerOfTwo = function (value) {
            return (value & (value - 1)) === 0 && value !== 0;
        };
        MathUtil.getDistance = function (point0, point1) {
            return Math.abs(Math.sqrt(this.getDistanceSquared(point0, point1)));
        };
        MathUtil.getDistanceSquared = function (point0, point1) {
            var dx = point1.x - point0.x, dy = point1.y - point0.y;
            return dx * dx + dy * dy;
        };
        MathUtil.getClosestVector2 = function (value, points) {
            var prevDist = 99999999999;
            var point = null;
            var index = null;
            for (var i = 0; i < points.length; i++) {
                var dist = Math.abs(MathUtil.getDistanceSquared(value, points[i]));
                if (dist < prevDist) {
                    prevDist = dist;
                    point = points[i];
                }
            }
            return point;
        };
        MathUtil.prototype.getNextPowerOfTwo = function (value) {
            if (value > 0 && (value & (value - 1)) === 0) {
                return value;
            }
            else {
                var result = 1;
                while (result < value) {
                    result <<= 1;
                }
                return result;
            }
        };
        MathUtil.degreeToRadiansFactor = Math.PI / 180;
        MathUtil.radianToDegreesFactor = 180 / Math.PI;
        return MathUtil;
    })();
    exports.default = MathUtil;
});
