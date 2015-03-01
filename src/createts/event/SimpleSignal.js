define(["require", "exports"], function (require, exports) {
    var Generator = function () {
        var _events = [];
        var SimpleSignal = function (callback, remove) {
            if (callback === void 0) { callback = null; }
            if (remove === void 0) { remove = 0; }
            var items = 0;
            // emit
            if (callback == void 0) {
                for (var i = 0; i < _events.length; i++) {
                    _events[i].call(void 0);
                    items++;
                }
            }
            else {
                if (!remove) {
                    _events.push(callback);
                    items++;
                }
                else {
                    for (var i = 0; i < _events.length; i++) {
                        if (_events[i] == callback) {
                            _events.splice(i, 1);
                            items++;
                        }
                    }
                }
            }
            return items;
        };
    };
    Generator.TYPE_REMOVE = 1;
    Generator.TYPE_REMOVE_ALL = 2;
    return Generator;
});
