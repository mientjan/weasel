/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import Identifier = require('./BlockStatement');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class MemberExpression extends Node implements Syntax.MemberExpression
{
	object: Syntax.Expression;
	property: Syntax.IdentifierOrExpression // Identifier | Expression
	computed: boolean


	constructor(data)
	{
		super(data);

		this.object = this.getObjectByType(data.object);
		this.property = this.getObjectByType(data.property);
		this.computed = data.computed;
	}

	public toString():string
	{

		var data = [];

		data.push( this.object.toString() );
		data.push( this.property.toString() );

		return data.join('.');
	}
}

export = MemberExpression;