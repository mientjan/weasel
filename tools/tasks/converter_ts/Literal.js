/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var Literal = (function (_super) {
    __extends(Literal, _super);
    function Literal(data) {
        _super.call(this, data);
        this.value = data.value;
        this.raw = data.raw;
    }
    Literal.prototype.toString = function () {
        var value = '';
        if (typeof this.value == 'string') {
            value = "'" + this.value + "'";
        }
        else {
            value += "" + this.value;
        }
        return value;
    };
    return Literal;
})(Node);
module.exports = Literal;
