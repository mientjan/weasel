/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class BinaryExpression extends Node {

	operator:string;
	left:Node;
	right:Node;

	constructor(data){
		super(data);

		this.operator = data.operator;
		this.left = this.getObjectByType(data.left);
		this.right = this.getObjectByType(data.right);
	}

	public toString():string
	{
		return this.getNodeArrayToStringArray([this.left, this.right])
			.join(' ' + this.operator + ' ');
	}
}

export = BinaryExpression; 