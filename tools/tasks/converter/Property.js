/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var Property = (function (_super) {
    __extends(Property, _super);
    function Property(data) {
        _super.call(this, data);
        this.key = this.getObjectByType(data.key);
        this.value = this.getObjectByType(data.value);
        this.kind = data.kind;
        this.method = data.method;
        this.shorthand = data.shorthand;
    }
    Property.prototype.toString = function () {
        var data = [];
        data.push(this.key.toString());
        data.push(this.value.toString());
        return data.join(':');
    };
    return Property;
})(Node);
module.exports = Property;
