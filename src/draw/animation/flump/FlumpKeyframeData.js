define(["require", "exports"], function (require, exports) {
    var FlumpKeyframeData = (function () {
        function FlumpKeyframeData(json) {
            if (json.length != void 0) {
                this.fromArray(json);
            }
            else {
                var jsonObject = json;
                this.index = jsonObject.index;
                this.duration = jsonObject.duration;
                this.ref = 'ref' in jsonObject ? jsonObject.ref : null;
                this.label = 'label' in jsonObject ? jsonObject.label : null;
                this.x = 'loc' in jsonObject ? jsonObject.loc[0] : 0.0;
                this.y = 'loc' in jsonObject ? jsonObject.loc[1] : 0.0;
                this.scaleX = 'scale' in jsonObject ? jsonObject.scale[0] : 1.0;
                this.scaleY = 'scale' in jsonObject ? jsonObject.scale[1] : 1.0;
                this.skewX = 'skew' in jsonObject ? jsonObject.skew[0] : 0.0;
                this.skewY = 'skew' in jsonObject ? jsonObject.skew[1] : 0.0;
                this.pivotX = 'pivot' in jsonObject ? jsonObject.pivot[0] : 0.0;
                this.pivotY = 'pivot' in jsonObject ? jsonObject.pivot[1] : 0.0;
                this.visible = 'visible' in jsonObject ? jsonObject.visible : true;
                this.alpha = 'alpha' in jsonObject ? jsonObject.alpha : 1.0;
                this.tweened = 'tweened' in jsonObject ? jsonObject.tweened : true;
                this.ease = 'ease' in jsonObject ? jsonObject.ease : 0.0;
            }
        }
        FlumpKeyframeData.prototype.getValueOrder = function () {
            return [
                'index',
                'duration',
                'ref',
                'label',
                'x', 'y',
                'scaleX', 'scaleY',
                'skewX', 'skewY',
                'pivotX', 'pivotY',
                'visible',
                'alpha',
                'tweened',
                'ease'
            ];
        };
        FlumpKeyframeData.prototype.toArray = function () {
            var order = this.getValueOrder();
            var data = new Array(order.length);
            for (var i = 0; i < order.length; i++) {
                var name = order[i];
                data[i] = this[name];
            }
            return data;
        };
        FlumpKeyframeData.prototype.fromArray = function (data) {
            var order = this.getValueOrder();
            for (var i = 0; i < data.length; i++) {
                var name = order[i];
                var value = data[i];
                this[name] = value;
            }
        };
        return FlumpKeyframeData;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = FlumpKeyframeData;
});
