/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import BlockStatement = require('./BlockStatement');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class BlockStatement extends Node {

	body:any[];

	constructor(data){
		super(data);

		this.body = this.getObjectArrayToNodeArray(data.body);
	}

	public toString():string
	{
		return this.getNodeArrayToStringArray(this.body).join("\n\t");
	}
}

export = BlockStatement;