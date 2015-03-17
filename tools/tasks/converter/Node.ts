/// <reference path="../node.d.ts" />

import INode = require('./INode');

class Node implements INode {
	type:string;

	constructor(data){
		this.type = data.type;
	}

	protected getNodeArrayToStringArray(arr:Node[]):string[]
	{
		var data = [];
		for(var i = 0; i < arr.length; i++)
		{
			data.push(arr[i].toString());
		}
		return data;
	}

	protected getObjectArrayToNodeArray(arr:any[]):Node[]
	{
		var data = [];
		for(var i = 0; i < arr.length; i++)
		{
			data.push(this.getObjectByType(arr[i]));
		}
		return data;
	}

	public getObjectByType(data:Node):Node
	{
		var Program = require('./Program');
		var VariableDeclaration = require('./VariableDeclaration');
		var VariableDeclarator = require('./VariableDeclarator');
		var Identifier = require('./Identifier');
		var BinaryExpression = require('./BinaryExpression');
		var Literal = require('./Literal');

		switch(data.type){
			case 'Program':{
				return new Program(data);
				break
			}
			case 'VariableDeclaration':{
				return new VariableDeclaration(data);
				break
			}
			case 'VariableDeclarator':{
				return new VariableDeclarator(data);
				break
			}
			case 'Identifier':{
				return new Identifier(data);
				break
			}
			case 'BinaryExpression':{
				return new BinaryExpression(data);
				break
			}
			case 'Literal':{
				return new Literal(data);
				break
			}
			default:{
				throw new Error('unknown type ' + data.type + ' | ' + JSON.stringify(data, null, 2) );
				break
			}
		}
	}


}

export = Node;