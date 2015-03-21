/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import BinaryExpression = require('./BinaryExpression');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class LogicalExpression extends BinaryExpression {

}

export = LogicalExpression;