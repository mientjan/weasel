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

	public toString():string
	{
		var str = this.getNodeArrayToStringArray([this.left, this.right])
			.join(' ' + this.operator + ' ');



		return str;
		return '(' + str + ')';

	}
}

export = AssignmentExpression;