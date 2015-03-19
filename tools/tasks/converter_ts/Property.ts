/// <reference path="../node.d.ts" />
/// <reference path="../esprima.d.ts" />


import Node = require('./Node');
import Identifier = require('./Identifier');
import CallExpression = require('./CallExpression');
import esprima = require('esprima');
import Syntax = esprima.Syntax;

class Property extends Node implements Syntax.NewExpression
{

//"key": {
//"type": "Identifier",
//"name": "rotation"
//},
//"computed": false,
//	"value": {
//	"type": "Literal",
//		"value": 90,
//		"raw": "90"
//},
//"kind": "init",
//	"method": false,
//	"shorthand": false

	key:Node;
	value:Node;
	kind:string;
	method:boolean;
	shorthand:boolean;

	constructor(data)
	{
		super(data);

		this.key = this.getObjectByType( data.key );
		this.value = this.getObjectByType( data.value );
		this.kind  = data.kind;
		this.method = data.method;
		this.shorthand = data.shorthand;
	}

	public toString():string
	{
		var data = [];
		data.push(this.key.toString());
		data.push(this.value.toString());
		return data.join(':')
	}
}

export = Property;