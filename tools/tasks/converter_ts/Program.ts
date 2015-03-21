/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class Program extends Node {

	body:Node[] = [];

	constructor(data){
		super(data);

		for(var i = 0; i < data.body.length; i++)
		{
			this.body.push( this.getObjectByType(data.body[i]) );
		}
	}

	toString():string
	{
		return this.getNodeArrayToStringArray(this.body).join("\n");
	}
}

export = Program;