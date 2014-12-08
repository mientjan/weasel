var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var context = canvas.getContext("webgl");
var gl = context;
gl.clearColor(.5, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
