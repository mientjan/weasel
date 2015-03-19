/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class VariableDeclaration extends Node {

	spacing = ' ';

	kind:string;
	declarations:Node[];

	constructor(data){
		super(data);

		this.kind = data.kind;
		this.declarations = this.getObjectArrayToNodeArray(data.declarations);
	}

	public toString():string
	{
		return this.kind + this.spacing + this.getNodeArrayToStringArray(this.declarations).join(', ') + ';';
	}
}

export = VariableDeclaration;