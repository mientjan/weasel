/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var FunctionDeclaration = (function (_super) {
    __extends(FunctionDeclaration, _super);
    function FunctionDeclaration(data) {
        _super.call(this, data);
        this.id = this.getObjectByType(data.id);
        this.params = this.getObjectArrayToNodeArray(data.params);
        this.body = this.getObjectArrayToNodeArray(data.body);
        this.generator = data.generator;
        this.expression = data.expression;
    }
    FunctionDeclaration.prototype.getParamsString = function () {
        var data = [];
        data.push('(');
        data.push(this.getNodeArrayToStringArray(this.params).join(', '));
        data.push(')');
        return data.join(' ');
    };
    FunctionDeclaration.prototype.getBodyString = function () {
        var data = [];
        data.push('{');
        this.getNodeArrayToStringArray(this.body, data);
        data.push('}');
        return data.join("\n");
    };
    FunctionDeclaration.prototype.toString = function () {
        var data = [];
        if (this.id) {
            data.push('function ' + this.id.toString());
        }
        data.push(this.getParamsString());
        data.push(this.getBodyString());
        return data.join(' ');
    };
    return FunctionDeclaration;
})(Node);
module.exports = FunctionDeclaration;
