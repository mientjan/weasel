/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var ExpressionStatement = (function (_super) {
    __extends(ExpressionStatement, _super);
    function ExpressionStatement(data) {
        _super.call(this, data);
        //		console.log(data);
        this.expression = this.getObjectByType(data.expression);
    }
    ExpressionStatement.prototype.toString = function () {
        var data = [];
        var expression = this.expression.toString();
        //		data.push(super.toString());
        //		data.push('(');
        data.push(expression);
        //		data.push(')');
        return data.join('');
    };
    return ExpressionStatement;
})(Node);
module.exports = ExpressionStatement;
