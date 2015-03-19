/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var ThisExpression = (function (_super) {
    __extends(ThisExpression, _super);
    function ThisExpression() {
        _super.apply(this, arguments);
    }
    ThisExpression.prototype.toString = function () {
        return 'this';
    };
    return ThisExpression;
})(Node);
module.exports = ThisExpression;
