/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var BinaryExpression = (function (_super) {
    __extends(BinaryExpression, _super);
    function BinaryExpression(data) {
        _super.call(this, data);
        this.operator = data.operator;
        this.left = this.getObjectByType(data.left);
        this.right = this.getObjectByType(data.right);
    }
    BinaryExpression.prototype.toString = function () {
        return this.getNodeArrayToStringArray([this.left, this.right]).join(' ' + this.operator + ' ');
    };
    return BinaryExpression;
})(Node);
module.exports = BinaryExpression;
