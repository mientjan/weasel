var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './SignalAbstract'], function (require, exports, SignalAbstract) {
    var Signal1 = (function (_super) {
        __extends(Signal1, _super);
        function Signal1() {
            _super.apply(this, arguments);
        }
        /**
         * Emit the signal, notifying each connected listener.
         */
        Signal1.prototype.emit = function (arg1) {
            var _this = this;
            if (this.dispatching()) {
                this.defer(function () { return _this.emitImpl(arg1); });
            }
            else {
                this.emitImpl(arg1);
            }
        };
        Signal1.prototype.emitImpl = function (arg1) {
            var head = this.willEmit();
            var p = head;
            while (p != null) {
                p._listener(arg1);
                if (!p.stayInList) {
                    p.dispose();
                }
                p = p._next;
            }
            this.didEmit(head);
        };
        return Signal1;
    })(SignalAbstract);
    return Signal1;
});
