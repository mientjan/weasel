/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CallExpression = require('./CallExpression');
var NewExpression = (function (_super) {
    __extends(NewExpression, _super);
    function NewExpression() {
        _super.apply(this, arguments);
    }
    NewExpression.prototype.toString = function () {
        var data = [];
        //		data.push( super.toString() );
        data.push('new');
        data.push(this.callee.toString());
        data.push(this.getArgumentsString());
        return data.join(' ') + ';';
    };
    return NewExpression;
})(CallExpression);
module.exports = NewExpression;
