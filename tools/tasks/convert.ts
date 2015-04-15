/// <reference path="node.d.ts" />
/// <reference path="esprima.d.ts" />

import fs = require('fs');
import esprima = require('esprima');
import Node = require('./converter_ts/Node');
import Program = require('./converter_ts/Program');

import Syntax = esprima.Syntax;
import Program = Syntax.Program;


var test1 = fs.readFileSync('../../assets/RotatingCube.js', 'utf-8');
var test2 = fs.readFileSync('../../assets/test3.js', 'utf-8');
var syntax = esprima.parse(test2);
//console.log(JSON.stringify(syntax, null, 2));

var node = new Node(syntax);
var data = node.getObjectByType(syntax);
console.log(JSON.stringify(syntax, null, 2));
console.log(data.toString());

