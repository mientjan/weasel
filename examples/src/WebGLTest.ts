var canvas = <HTMLCanvasElement> document.createElement("canvas");
document.body.appendChild(canvas);

var context : any = canvas.getContext("webgl");
var gl = <WebGLRenderingContext> context;

gl.clearColor(.5,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);