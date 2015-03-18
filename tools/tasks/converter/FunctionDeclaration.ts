/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import Identifier = require('./BlockStatement');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class FunctionDeclaration extends Node
{

	id:Identifier;
	params:Identifier[];
	defaults:any[];
	body:Node[];
	generator:boolean;
	expression:boolean;

	constructor(data)
	{
		super(data);

		this.id = this.getObjectByType(data.id);
		this.params = this.getObjectArrayToNodeArray(data.params);
		this.body = this.getObjectArrayToNodeArray(data.body);
		this.generator = data.generator;
		this.expression = data.expression;
	}

	private getParamsString():string
	{
		var data = [];
		data.push('(');
		data.push(this.getNodeArrayToStringArray(this.params).join(', '));
		data.push(')');

		return data.join(' ');
	}

	private getBodyString():string
	{
		var data = [];
		data.push('{');
		this.getNodeArrayToStringArray(this.body, data);
		data.push('}');

		return data.join("\n");
	}

	public toString():string
	{
		var data = [];
		if(this.id)
		{
			data.push('function ' + this.id.toString());
		}
		data.push(this.getParamsString());
		data.push(this.getBodyString());



		return data.join(' ');
	}
}

export = FunctionDeclaration;