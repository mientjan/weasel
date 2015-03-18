/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Node = require('./Node');
var MemberExpression = (function (_super) {
    __extends(MemberExpression, _super);
    function MemberExpression(data) {
        _super.call(this, data);
        this.object = this.getObjectByType(data.object);
        this.property = this.getObjectByType(data.property);
        this.computed = data.computed;
    }
    MemberExpression.prototype.toString = function () {
        var data = [];
        //		if( this.object instanceof AssignmentExpression
        //			&& this.object.left)
        //		{
        //			console.log(JSON.stringify(this.object, null, 2));
        //
        //		}
        data.push(this.object.toString());
        data.push(this.property.toString());
        return data.join('.');
    };
    return MemberExpression;
})(Node);
module.exports = MemberExpression;
