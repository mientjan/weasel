var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './FlumpLabelData'], function (require, exports, FlumpLabelData) {
    var FlumpLabelQueueData = (function (_super) {
        __extends(FlumpLabelQueueData, _super);
        function FlumpLabelQueueData(label, index, duration, times, delay) {
            if (times === void 0) { times = 1; }
            if (delay === void 0) { delay = 0; }
            _super.call(this, label, index, duration);
            this.times = times;
            this.delay = delay;
        }
        FlumpLabelQueueData.prototype.then = function (complete) {
            this._complete = complete;
            return this;
        };
        FlumpLabelQueueData.prototype.finish = function () {
            if (this._complete) {
                this._complete.call(this);
            }
            return this;
        };
        FlumpLabelQueueData.prototype.destruct = function () {
            this.label = null;
            this._complete = null;
        };
        return FlumpLabelQueueData;
    })(FlumpLabelData);
    return FlumpLabelQueueData;
});
