define(["require", "exports", "../Vector3", "../Quaternion", "../Matrix4"], function (require, exports, Vector3_1, Quaternion_1, Matrix4_1) {
    var AbstractMath3d = (function () {
        function AbstractMath3d() {
            this._quaternion = {};
            this._vector3 = {};
            this._matrix4 = {};
        }
        AbstractMath3d.prototype.getQuaternion = function (value) {
            if (!this._quaternion[value]) {
                this._quaternion[value] = new Quaternion_1.default();
            }
            return this._quaternion[value];
        };
        AbstractMath3d.prototype.getVector3 = function (value) {
            if (!this._vector3[value]) {
                this._vector3[value] = new Vector3_1.default();
            }
            return this._vector3[value];
        };
        AbstractMath3d.prototype.getMatrix4 = function (value) {
            if (!this._matrix4[value]) {
                this._matrix4[value] = new Matrix4_1.default();
            }
            return this._matrix4[value];
        };
        return AbstractMath3d;
    })();
    exports.AbstractMath3d = AbstractMath3d;
});
