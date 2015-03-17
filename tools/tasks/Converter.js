/// <reference path="node.d.ts" />
/// <reference path="esprima.d.ts" />
var VariableDeclaration = require('./converter/VariableDeclaration');
var Converter = (function () {
    function Converter(data) {
        this.lines = [];
        for (var i = 0; i < data.body.length; i++) {
            this.analise(data.body[i]);
        }
    }
    Converter.prototype.analise = function (data) {
        switch (data.type) {
            case 'VariableDeclaration': {
                this.lines.push(new VariableDeclaration(data));
                break;
            }
        }
    };
    return Converter;
})();
module.exports = Converter;
