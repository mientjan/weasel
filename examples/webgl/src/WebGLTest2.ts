import m4 = require('./../../../src/easelts/geom/Matrix4');
import Shader = require('./webgltest2/Shader');

//import Vector3 = require('../../../src/easelts/geom/Vector3');

class WebGLTest2
{
	gl:WebGLRenderingContext;
	fragmentShader:WebGLShader;
	vertexShader:WebGLShader;

	buffer:WebGLRenderbuffer;
	shaderProgram:WebGLProgram;

	vertexPositionAttribute:any;

	constructor(private canvas:HTMLCanvasElement)
	{

		var gl = this.getGL(canvas);
		gl.viewport(0, 0, canvas.width, canvas.height);

		this.gl = gl;
		this.fragmentShader = Shader.get(gl, "shader-fs");
		this.vertexShader = Shader.get(gl, "shader-vs");

		// Create the shader program

		this.shaderProgram = gl.createProgram();
		gl.attachShader(this.shaderProgram, this.vertexShader);
		gl.attachShader(this.shaderProgram, this.fragmentShader);
		gl.linkProgram(this.shaderProgram);

		// If creating the shader program failed, alert

		if(!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS))
		{
			alert("Unable to initialize the shader program.");
		}

		gl.useProgram(this.shaderProgram);

		this.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
		gl.enableVertexAttribArray(this.vertexPositionAttribute);

		this.initBuffers(gl);
	}

	public getGL(canvas:HTMLCanvasElement)
	{

		var gl;

		try
		{
			// Try to grab the standard context. If it fails, fallback to experimental.
			gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		}
		catch(e)
		{
		}

		// If we don't have a GL context, give up now
		if(!gl)
		{
			alert("Unable to initialize WebGL. Your browser may not support it.");
			gl = null;
		}

		// Only continue if WebGL is available and working

		if(gl)
		{
			gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Set clear color to black, fully opaque
			gl.enable(gl.DEPTH_TEST);                               // Enable depth testing
			gl.depthFunc(gl.LEQUAL);                                // Near things obscure far things
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);      // Clear the color as well as the depth buffer.
		}

		return gl;
	}

	public initBuffers(gl:WebGLRenderingContext)
	{
		this.buffer = gl.createBuffer();

		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

		var vertices = new Float32Array([
			1.0, 1.0, 0.0,
			-1.0, 1.0, 0.0,
			1.0, -1.0, 0.0,
			-1.0, -1.0, 0.0
		]);

		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	}

	public setMatrixUniforms(gl, shaderProgram, perspectiveMatrix:m4.Matrix4, mvMatrix:m4.Matrix4)
	{
//		console.log(perspectiveMatrix.toArray());
//		console.log(mvMatrix.toArray());


		var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
		gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.toArray()));

		var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
		gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.toArray()));
	}

	public drawScene()
	{
		var gl = this.gl;
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		var perspective = new m4.Matrix4().makePerspective(45, 500.0 / 500.0, 0.1, 100.0);
		var mvMatrix = new m4.Matrix4();

		//		var perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);
		//
		//		var m = loadIdentity();
		//		m = mvTranslate(m, [-0.0, 0.0, -6.0]);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.vertexAttribPointer(this.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
//		this.setMatrixUniforms(gl, this.shaderProgram, perspective, mvMatrix);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}

}

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 500;
canvas.height = 500;

var webgl = new WebGLTest2(canvas);

setInterval(() =>
{
	webgl.drawScene();
}, 1000 / 24)