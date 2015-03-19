/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import FunctionExpression = require('./FunctionExpression');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class CallExpression extends Node implements Syntax.CallExpression
{

	callee:Node;
	arguments:Syntax.Expression[];

	constructor(data)
	{
		super(data);

		this.callee = this.getObjectByType(data.callee);
		this.arguments = this.getObjectArrayToNodeArray(data.arguments);
	}

	protected getArgumentsString():string
	{
		var data = [];
		data.push('(');
		data.push(this.getNodeArrayToStringArray(this.arguments).join(', '));
		data.push(')');
		return data.join('')
	}

	public toString():string
	{
		//		console.log('1',JSON.stringify(this.callee, null, 2));
		//		console.log('2',JSON.stringify(this.arguments, null, 2));

		var data = [];


		if( this.callee instanceof FunctionExpression ){

			data.push('(');
			data.push( this.callee.toString() );
			data.push(')');
		} else {
			data.push( this.callee.toString() );
		}

		data.push(this.getArgumentsString());

		return data.join('');
	}
}

export = CallExpression;