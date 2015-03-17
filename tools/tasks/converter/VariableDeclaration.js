/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var VariableDeclaration = (function (_super) {
    __extends(VariableDeclaration, _super);
    function VariableDeclaration(data) {
        _super.call(this, data);
        this.spacing = ' ';
        this.kind = data.kind;
        this.declarations = this.getObjectArrayToNodeArray(data.declarations);
    }
    VariableDeclaration.prototype.toString = function () {
        return this.kind + this.spacing + this.getNodeArrayToStringArray(this.declarations).join(' ` ');
    };
    return VariableDeclaration;
})(Node);
module.exports = VariableDeclaration;
