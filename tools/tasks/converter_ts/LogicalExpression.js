/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BinaryExpression = require('./BinaryExpression');
var LogicalExpression = (function (_super) {
    __extends(LogicalExpression, _super);
    function LogicalExpression() {
        _super.apply(this, arguments);
    }
    return LogicalExpression;
})(BinaryExpression);
module.exports = LogicalExpression;
