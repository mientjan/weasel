/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class ReturnStatement extends Node {

	argument:Node;

	constructor(data){
		super(data);

		this.argument = this.getObjectByType(data.argument);
	}

	public toString():string
	{
		var data = [];
		var expression = this.argument.toString();

//		data.push(super.toString());
//		data.push('(');
		data.push('return ');
		data.push(this.argument.toString());
		data.push(';');
		return data.join('');
	}
}

export = ReturnStatement;