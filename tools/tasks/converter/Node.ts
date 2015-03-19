/// <reference path="../node.d.ts" />

import INode = require('./INode');

class Node implements INode {
	type:string;

	constructor(data){
		this.type = data.type;
	}

	protected getNodeArrayToStringArray(arr:Node[], data = []):string[]
	{
		for(var i = 0; i < arr.length; i++)
		{
			if( arr[i] ){
				data.push(arr[i].toString());
			}
		}
		return data;
	}

	protected getObjectArrayToNodeArray(arr:any[]|any, data = []):Node[]
	{
		var arrData:any[];

		if(arr instanceof Array){
			arrData = <any[]> arr;
		} else {
			arrData = [<any> arr];
		}

		for(var i = 0; i < arrData.length; i++)
		{
			data.push(this.getObjectByType(arrData[i]));
		}

		return data;
	}

	public getObjectByType(data:any):Node
	{
		if( data == null ){
			return data;
		}



		var Program = require('./Program');
		var Identifier = require('./Identifier');
		var Literal = require('./Literal');
		var Property = require('./Property');

		var VariableDeclaration = require('./VariableDeclaration');
		var VariableDeclarator = require('./VariableDeclarator');
		var FunctionDeclaration = require('./FunctionDeclaration');

		var BinaryExpression = require('./BinaryExpression');
		var AssignmentExpression = require('./AssignmentExpression');
		var FunctionExpression = require('./FunctionExpression');
		var LogicalExpression = require('./LogicalExpression');
		var ObjectExpression = require('./ObjectExpression');
		var CallExpression = require('./CallExpression');
		var MemberExpression = require('./MemberExpression');
		var ThisExpression = require('./ThisExpression');
		var NewExpression = require('./NewExpression');
		var UnaryExpression = require('./UnaryExpression');


		var ExpressionStatement = require('./ExpressionStatement');
		var ReturnStatement = require('./ReturnStatement');
		var BlockStatement = require('./BlockStatement');


		switch(data.type){
			case 'Program':{
				return new Program(data);
				break
			}
			case 'FunctionDeclaration':{
				return new FunctionDeclaration(data);
				break
			}
			case 'ExpressionStatement':{
				return new ExpressionStatement(data);
				break
			}
			case 'BlockStatement':{
				return new BlockStatement(data);
				break
			}
			case 'ReturnStatement':{
				return new ReturnStatement(data);
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

			case 'Literal':{
				return new Literal(data);
				break
			}


			case 'CallExpression':{
				return new CallExpression(data);
				break
			}

			case 'NewExpression':{
				return new NewExpression(data);
				break
			}
			case 'FunctionExpression':{
				return new FunctionExpression(data);
				break
			}
			case 'BinaryExpression':{
				return new BinaryExpression(data);
				break
			}
			case 'AssignmentExpression':{
				return new AssignmentExpression(data);
				break
			}

			case 'LogicalExpression':{
				return new LogicalExpression(data);
				break
			}

			case 'ObjectExpression':{
				return new ObjectExpression(data);
				break
			}

			case 'MemberExpression':{
				return new MemberExpression(data);
				break
			}

			case 'ThisExpression':{
				return new ThisExpression(data);
				break
			}

			case 'UnaryExpression':{
				return new UnaryExpression(data);
				break
			}

			case 'Property':{
				return new Property(data);
				break
			}

			default:{
				throw new Error('unknown type ' + data.type + ' | ' + JSON.stringify(data, null, 2) );
				break
			}
		}
	}

	public toString():string
	{
		return '['+this.type+']';
	}
}

export = Node;