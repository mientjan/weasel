define(["require", "exports", "../../src/util/math/Vector3", "../../src/util/math/Matrix4", "../../src/draw/display/Stage"], function (require, exports, Vector3_1, Matrix4_1, Stage_1) {
    var v3_0 = new Vector3_1.default();
    var v3_1 = new Vector3_1.default();
    var v3_2 = new Vector3_1.default();
    var camera = new Matrix4_1.default().makePerspective(1, 4 / 3, 1, 1100);
    var world = new Matrix4_1.default().identity();
    var obj = new Matrix4_1.default().identity();
    var holder = document.getElementById('holder');
    var stage = new Stage_1.default(holder, {});
    var items = [];
    for (var i = 0; i < 50; i++) {
        var obj1 = [i];
    }
    stage.start();
});
