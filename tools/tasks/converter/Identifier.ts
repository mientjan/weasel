/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class Identifier extends Node {

	name:string;

	constructor(data){
		super(data);

		this.name = data.name;
	}

	public toString():string
	{
		return this.name;
	}
}

export = Identifier;