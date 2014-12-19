define(["require", "exports"], function (require, exports) {
    var createShaderProgram = function (ctx) {
        var fragmentShader = this._createShader(ctx, ctx.FRAGMENT_SHADER, "precision mediump float;" + "uniform sampler2D uSampler0;" + "varying vec3 vTextureCoord;" + "void main(void) {" + "vec4 color = texture2D(uSampler0, vTextureCoord.st);" + "gl_FragColor = vec4(color.rgb, color.a * vTextureCoord.z);" + "}");
        var vertexShader = this._createShader(ctx, ctx.VERTEX_SHADER, "attribute vec2 aVertexPosition;" + "attribute vec3 aTextureCoord;" + "uniform mat3 uPMatrix;" + "varying vec3 vTextureCoord;" + "void main(void) {" + "vTextureCoord = aTextureCoord;" + "gl_Position = vec4((uPMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);" + "}");
        if (this._webGLErrorDetected || !fragmentShader || !vertexShader) {
            return;
        }
        var program = ctx.createProgram();
        ctx.attachShader(program, fragmentShader);
        ctx.attachShader(program, vertexShader);
        ctx.linkProgram(program);
        /*if(!ctx.getProgramParameter(program, ctx.LINK_STATUS))
        {
            // alert("Could not link program. " + ctx.getProgramInfoLog(program));
            this._webGLErrorDetected = true;
            return;
        }
    
        program.vertexPositionAttribute = ctx.getAttribLocation(program, "aVertexPosition");
        program.textureCoordAttribute = ctx.getAttribLocation(program, "aTextureCoord");
    
        program.sampler0uniform = ctx.getUniformLocation(program, "uSampler0");
    
        ctx.enableVertexAttribArray(program.vertexPositionAttribute);
        ctx.enableVertexAttribArray(program.textureCoordAttribute);
    
        program.pMatrixUniform = ctx.getUniformLocation(program, "uPMatrix");
    
        ctx.useProgram(program);
    
        this._shaderProgram = program;*/
    };
    return createShaderProgram;
});
