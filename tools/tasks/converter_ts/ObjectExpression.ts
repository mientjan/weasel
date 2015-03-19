/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import BinaryExpression = require('./BinaryExpression');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class ObjectExpression extends Node implements Syntax.ObjectExpression {

	properties:Node[];

	constructor(data){
		super(data);

		this.properties = this.getObjectArrayToNodeArray(data.properties);
	}

	public toString():string
	{
		var data = [];
		data.push('{');
		data.push( this.getNodeArrayToStringArray(this.properties).join(',') );
		data.push('}');

		return data.join('');
	}
}

export = ObjectExpression;