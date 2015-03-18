/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class ExpressionStatement extends Node {

	expression:Node;

	constructor(data){
		super(data);

//		console.log(data);
		
		this.expression = this.getObjectByType(data.expression);
	}

	public toString():string
	{
		var data = [];
		var expression = this.expression.toString();

//		data.push(super.toString());
		data.push(expression);
		return data.join('');
	}
}

export = ExpressionStatement;