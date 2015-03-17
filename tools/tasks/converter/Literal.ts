/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class Literal extends Node {

	value:string|number;
	init:Node;

	constructor(data:Syntax.Literal){
		super(data);

		this.value = data.value;
	}

	public toString():string
	{
		return '' + this.value;
	}
}

export = Literal;