/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var ObjectExpression = (function (_super) {
    __extends(ObjectExpression, _super);
    function ObjectExpression(data) {
        _super.call(this, data);
        this.properties = this.getObjectArrayToNodeArray(data.properties);
    }
    ObjectExpression.prototype.toString = function () {
        var data = [];
        data.push('{');
        data.push(this.getNodeArrayToStringArray(this.properties).join(','));
        data.push('}');
        return data.join('');
    };
    return ObjectExpression;
})(Node);
module.exports = ObjectExpression;
