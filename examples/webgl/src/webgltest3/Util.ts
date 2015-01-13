interface UtilFunction {
	(): any;
	getShader:Function;
}

var Util = <UtilFunction> function(){}
Util.getShader = function(){}
//
//module Util {
//	function getShader(gl:WebGLRenderingContext, id:string)
//	{
//		var shaderScript, theSource, currentChild, shader;
//
//		shaderScript = document.getElementById(id);
//
//		if(!shaderScript)
//		{
//			return null;
//		}
//
//		theSource = "";
//		currentChild = shaderScript.firstChild;
//
//		while(currentChild)
//		{
//			if(currentChild.nodeType == currentChild.TEXT_NODE)
//			{
//				theSource += currentChild.textContent;
//			}
//
//			currentChild = currentChild.nextSibling;
//		}
//
//	}
//}

//Util.getShader = getShader;
//export = Util;

export = Util;