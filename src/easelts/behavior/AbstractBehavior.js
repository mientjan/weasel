define(["require", "exports"], function (require, exports) {
    /**
     * @method AbstractBehavior
     * @author Mient-jan Stelling <mientjan.stelling@gmail.com>
     */
    var AbstractBehaviour = (function () {
        function AbstractBehaviour() {
            this.owner = null;
        }
        AbstractBehaviour.prototype.initialize = function (owner) {
            if (this.owner) {
                throw new Error('behavior already has a owner');
            }
            this.owner = owner;
        };
        AbstractBehaviour.prototype.destruct = function () {
            this.owner = null;
        };
        return AbstractBehaviour;
    })();
    return AbstractBehaviour;
});
