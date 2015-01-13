class Shader
{
	public static get(gl:WebGLRenderingContext, id:string):WebGLShader
	{
		var shaderScript, theSource, currentChild, shader;

		shaderScript = document.getElementById(id);

		if(!shaderScript)
		{
			return null;
		}

		theSource = "";
		currentChild = shaderScript.firstChild;

		while(currentChild)
		{
			if(currentChild.nodeType == currentChild.TEXT_NODE)
			{
				theSource += currentChild.textContent;
			}

			currentChild = currentChild.nextSibling;
		}

		if (shaderScript.type == "x-shader/x-fragment") {
			shader = gl.createShader(gl.FRAGMENT_SHADER);
		} else if (shaderScript.type == "x-shader/x-vertex") {
			shader = gl.createShader(gl.VERTEX_SHADER);
		} else {
			// Unknown shader type
			return null;
		}

		gl.shaderSource(shader, theSource);

		// Compile the shader program
		gl.compileShader(shader);

		// See if it compiled successfully
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
			return null;
		}

		return shader;
	}

	public static programfunction(gl:WebGLRenderingContext, vertexShader:WebGLShader, fragmentShader:WebGLShader, opt_attribs = [], opt_locations = [], opt_errorCallback:Function = function(){} ) {
		var errFn = opt_errorCallback;
		var program = gl.createProgram();

		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);

		if (opt_attribs) {
			for (var ii = 0; ii < opt_attribs.length; ++ii) {
				gl.bindAttribLocation(
					program,
					opt_locations ? opt_locations[ii] : ii,
					opt_attribs[ii]);
			}
		}
		gl.linkProgram(program);

		// Check the link status
		var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
		if (!linked) {
			// something went wrong with the link
			var lastError = gl.getProgramInfoLog (program);
			errFn("Error in program linking:" + lastError);

			gl.deleteProgram(program);
			return null;
		}
		return program;
	}

}

export = Shader;