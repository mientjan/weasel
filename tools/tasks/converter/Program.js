/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var Program = (function (_super) {
    __extends(Program, _super);
    function Program(data) {
        _super.call(this, data);
        this.body = [];
        for (var i = 0; i < data.body.length; i++) {
            this.body.push(this.getObjectByType(data.body[i]));
        }
    }
    Program.prototype.toString = function () {
        return this.getNodeArrayToStringArray(this.body).join("\n");
    };
    return Program;
})(Node);
module.exports = Program;
