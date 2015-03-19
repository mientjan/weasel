/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import BinaryExpression = require('./BinaryExpression');
import MemberExpression = require('./MemberExpression');
import FunctionExpression = require('./FunctionExpression');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class AssignmentExpression extends BinaryExpression
{
	constructor(data){
		super(data);
	}

	public toString():string
	{

		var result = '';
		var left = this.left.toString();
		var right  = this.right.toString();

		if( this.left instanceof MemberExpression
			&& this.right instanceof FunctionExpression ){
			result = ['(',left,this.operator,this.right,')'].join(' ');
		} else {
			result = this.getNodeArrayToStringArray([this.left, this.right])
				.join(' ' + this.operator + ' ');
		}




		return result;

	}
}

export = AssignmentExpression;