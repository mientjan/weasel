/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BinaryExpression = require('./BinaryExpression');
var AssignmentExpression = (function (_super) {
    __extends(AssignmentExpression, _super);
    function AssignmentExpression(data) {
        _super.call(this, data);
    }
    AssignmentExpression.prototype.toString = function () {
        var str = this.getNodeArrayToStringArray([this.left, this.right]).join(' ' + this.operator + ' ');
        return str;
        return '(' + str + ')';
    };
    return AssignmentExpression;
})(BinaryExpression);
module.exports = AssignmentExpression;
