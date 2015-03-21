/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var Identifier = (function (_super) {
    __extends(Identifier, _super);
    function Identifier(data) {
        _super.call(this, data);
        this.name = data.name;
    }
    Identifier.prototype.toString = function () {
        return this.name;
    };
    return Identifier;
})(Node);
module.exports = Identifier;
