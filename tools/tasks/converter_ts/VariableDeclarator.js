/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var Identifier = require('./Identifier');
var VariableDeclarator = (function (_super) {
    __extends(VariableDeclarator, _super);
    function VariableDeclarator(data) {
        _super.call(this, data);
        this.id = new Identifier(data.id);
        this.init = this.getObjectByType(data.init);
    }
    VariableDeclarator.prototype.toString = function () {
        return this.getNodeArrayToStringArray([this.id, this.init]).join(' = ');
    };
    return VariableDeclarator;
})(Node);
module.exports = VariableDeclarator;
