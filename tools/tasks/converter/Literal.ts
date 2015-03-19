/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class Literal extends Node {

	value:string|number;
	raw:string|number;
	init:Node;

	constructor(data:Syntax.Literal){
		super(data);

		this.value = data.value;
		this.raw = data.raw;
	}

	public toString():string
	{
		var value = '';

		if(typeof this.value == 'string'){
			value = "'" + this.value + "'";
		} else {
			value += "" + this.value;
		}

		return value
	}
}

export = Literal;