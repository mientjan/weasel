/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class VariableDeclarator extends Node {

	id:Identifier;
	init:Node;

	constructor(data:Syntax.VariableDeclarator){
		super(data);

		this.id = new Identifier(data.id);
		this.init = this.getObjectByType(data.init);

	}

	public toString():string
	{
		return this.getNodeArrayToStringArray([this.id, this.init]).join(' = ');
	}
}

export = VariableDeclarator;