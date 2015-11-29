define(["require", "exports"], function (require, exports) {
    var AbstractBehavior = (function () {
        function AbstractBehavior() {
            this.owner = null;
        }
        AbstractBehavior.prototype.initialize = function (owner) {
            if (this.owner) {
                throw new Error('behavior already has a owner');
            }
            this.owner = owner;
        };
        AbstractBehavior.prototype.destruct = function () {
            this.owner = null;
        };
        return AbstractBehavior;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = AbstractBehavior;
});
