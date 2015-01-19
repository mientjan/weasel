define(["require", "exports", '../../lib/Shader', '../../lib/Rectangle'], function (require, exports, Shader, Rectangle) {
    function main(id) {
        // Get A WebGL context
        var canvas = document.getElementById("canvas");
        var gl = canvas.getContext("experimental-webgl");
        // setup a GLSL program
        var vertexShader = Shader.get(gl, "2d-vertex-shader");
        var fragmentShader = Shader.get(gl, "2d-fragment-shader");
        var program = Shader.program(gl, vertexShader, fragmentShader);
        gl.useProgram(program);
        setInterval(function () {
            draw(canvas, gl, program);
        }, 1000 / 10);
    }
    function draw(canvas, gl, program) {
        // look up where the vertex data needs to go.
        var positionLocation = gl.getAttribLocation(program, "a_position");
        var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        var colorLocation = gl.getUniformLocation(program, "u_color");
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        for (var i = 0; i < 50; i++) {
            var rect = new Rectangle(Math.floor(500 * Math.random()), Math.floor(500 * Math.random()), 100, 100);
            gl.bufferData(gl.ARRAY_BUFFER, rect.toTriangleArray(), gl.STATIC_DRAW);
            gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
        // i do not know wtf this actualy does
        // draw
    }
    main('canvas');
});
