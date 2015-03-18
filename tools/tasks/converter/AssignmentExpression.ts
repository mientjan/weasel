/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import BinaryExpression = require('./BinaryExpression');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class AssignmentExpression extends BinaryExpression
{
	constructor(data){
		super(data);
	}
}

export = AssignmentExpression;