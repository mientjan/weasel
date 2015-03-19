/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import Identifier = require('./BlockStatement');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class ThisExpression extends Node implements Syntax.ThisExpression
{
	public toString(){
		return 'this';
	}
}

export = ThisExpression;