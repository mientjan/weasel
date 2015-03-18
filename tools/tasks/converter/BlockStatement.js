/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var BlockStatement = require('./BlockStatement');
var BlockStatement = (function (_super) {
    __extends(BlockStatement, _super);
    function BlockStatement(data) {
        _super.call(this, data);
        this.body = this.getObjectArrayToNodeArray(data.body);
    }
    BlockStatement.prototype.toString = function () {
        return this.getNodeArrayToStringArray(this.body).join("\n\t");
    };
    return BlockStatement;
})(Node);
module.exports = BlockStatement;
