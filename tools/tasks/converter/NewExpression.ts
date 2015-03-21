/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import CallExpression = require('./CallExpression');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class NewExpression extends CallExpression implements Syntax.NewExpression
{
	public toString():string
	{
		var data = [];
//		data.push( super.toString() );
		data.push( 'new' );
		data.push( this.callee.toString() );

		data.push( this.getArgumentsString() );

		return data.join(' ') + ';';

	}

}

export = NewExpression;