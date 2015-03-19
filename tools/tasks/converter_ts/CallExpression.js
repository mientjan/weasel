/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var FunctionExpression = require('./FunctionExpression');
var CallExpression = (function (_super) {
    __extends(CallExpression, _super);
    function CallExpression(data) {
        _super.call(this, data);
        this.callee = this.getObjectByType(data.callee);
        this.arguments = this.getObjectArrayToNodeArray(data.arguments);
    }
    CallExpression.prototype.getArgumentsString = function () {
        var data = [];
        data.push('(');
        data.push(this.getNodeArrayToStringArray(this.arguments).join(', '));
        data.push(')');
        return data.join('');
    };
    CallExpression.prototype.toString = function () {
        //		console.log('1',JSON.stringify(this.callee, null, 2));
        //		console.log('2',JSON.stringify(this.arguments, null, 2));
        var data = [];
        if (this.callee instanceof FunctionExpression) {
            data.push('(');
            data.push(this.callee.toString());
            data.push(')');
        }
        else {
            data.push(this.callee.toString());
        }
        data.push(this.getArgumentsString());
        return data.join('');
    };
    return CallExpression;
})(Node);
module.exports = CallExpression;
