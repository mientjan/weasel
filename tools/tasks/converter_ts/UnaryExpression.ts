/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class UnaryExpression extends Node {

	operator:string;
	argument:Node;
	prefix:boolean;

	constructor(data){
		super(data);

		this.operator = data.operator;
		this.argument = this.getObjectByType(data.argument);
		this.prefix = data.prefix;
	}

	public toString():string
	{
		return this.operator + this.argument.toString();
	}
}

export = UnaryExpression;