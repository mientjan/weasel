define(["require", "exports", '../../src/util/MathUtil', '../../src/util/Interval', "../../src/draw/display/Stage", "../../src/draw/display/Bitmap", "../../src/util/math/Matrix4", "../../src/util/math/Vector3", "../../src/util/math/Quaternion"], function (require, exports, MathUtil_1, Interval_1, Stage_1, Bitmap_1, Matrix4_1, Vector3_1, Quaternion_1) {
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, true);
    var image = new Bitmap_1.default('../assets/image/ninepatch_red.png', 0, 0, '50%', '50%', '50%', '50%');
    stage.addChild(image);
    var m = new Matrix4_1.default();
    var x = new Matrix4_1.default();
    var y = new Matrix4_1.default();
    var z = new Matrix4_1.default();
    var alpha = 0;
    var beta = Math.PI;
    var gamma = Math.PI / 2;
    var position = new Vector3_1.default();
    var rotation = new Quaternion_1.default();
    var scale = new Vector3_1.default();
    var test = function () {
        alpha += .01;
        beta += .01;
        x.makeRotationX(alpha);
        y.makeRotationY(beta);
        z.makeRotationZ(gamma);
        m.multiplyMatrices(x, y);
        m.multiply(z);
        m.setPosition(new Vector3_1.default(300, 250, 10));
        m.decompose(position, rotation, scale);
        image.x = position.x;
        image.y = position.y;
        image.rotation = MathUtil_1.default.radToDeg(rotation.z);
    };
    var inter = new Interval_1.default(60).attach(test);
    stage.start();
});
