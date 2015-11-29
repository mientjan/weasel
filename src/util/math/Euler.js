/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */
define(["require", "exports", "../MathUtil", "./Quaternion"], function (require, exports, MathUtil_1, Quaternion_1) {
    var Euler = (function () {
        function Euler(x, y, z, order) {
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._order = Euler.DefaultOrder;
            this._reorder_q = new Quaternion_1.default(0, 0, 0);
            this._x = x || 0;
            this._y = y || 0;
            this._z = z || 0;
            this._order = order || Euler.DefaultOrder;
        }
        Object.defineProperty(Euler.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Euler.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Euler.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (value) {
                this._z = value;
                this.onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Euler.prototype, "order", {
            get: function () {
                return this._order;
            },
            set: function (value) {
                this._order = value;
                this.onChangeCallback();
            },
            enumerable: true,
            configurable: true
        });
        Euler.prototype.set = function (x, y, z, order) {
            this._x = x;
            this._y = y;
            this._z = z;
            this._order = order || this._order;
            this.onChangeCallback();
            return this;
        };
        Euler.prototype.copy = function (euler) {
            this._x = euler._x;
            this._y = euler._y;
            this._z = euler._z;
            this._order = euler._order;
            this.onChangeCallback();
            return this;
        };
        Euler.prototype.setFromRotationMatrix = function (m, order) {
            var clamp = MathUtil_1.default.clamp;
            var te = m.elements;
            var m11 = te[0], m12 = te[4], m13 = te[8];
            var m21 = te[1], m22 = te[5], m23 = te[9];
            var m31 = te[2], m32 = te[6], m33 = te[10];
            order = order || this._order;
            if (order === 'XYZ') {
                this._y = Math.asin(clamp(m13, -1, 1));
                if (Math.abs(m13) < 0.99999) {
                    this._x = Math.atan2(-m23, m33);
                    this._z = Math.atan2(-m12, m11);
                }
                else {
                    this._x = Math.atan2(m32, m22);
                    this._z = 0;
                }
            }
            else if (order === 'YXZ') {
                this._x = Math.asin(-clamp(m23, -1, 1));
                if (Math.abs(m23) < 0.99999) {
                    this._y = Math.atan2(m13, m33);
                    this._z = Math.atan2(m21, m22);
                }
                else {
                    this._y = Math.atan2(-m31, m11);
                    this._z = 0;
                }
            }
            else if (order === 'ZXY') {
                this._x = Math.asin(clamp(m32, -1, 1));
                if (Math.abs(m32) < 0.99999) {
                    this._y = Math.atan2(-m31, m33);
                    this._z = Math.atan2(-m12, m22);
                }
                else {
                    this._y = 0;
                    this._z = Math.atan2(m21, m11);
                }
            }
            else if (order === 'ZYX') {
                this._y = Math.asin(-clamp(m31, -1, 1));
                if (Math.abs(m31) < 0.99999) {
                    this._x = Math.atan2(m32, m33);
                    this._z = Math.atan2(m21, m11);
                }
                else {
                    this._x = 0;
                    this._z = Math.atan2(-m12, m22);
                }
            }
            else if (order === 'YZX') {
                this._z = Math.asin(clamp(m21, -1, 1));
                if (Math.abs(m21) < 0.99999) {
                    this._x = Math.atan2(-m23, m22);
                    this._y = Math.atan2(-m31, m11);
                }
                else {
                    this._x = 0;
                    this._y = Math.atan2(m13, m33);
                }
            }
            else if (order === 'XZY') {
                this._z = Math.asin(-clamp(m12, -1, 1));
                if (Math.abs(m12) < 0.99999) {
                    this._x = Math.atan2(m32, m22);
                    this._y = Math.atan2(m13, m11);
                }
                else {
                    this._x = Math.atan2(-m23, m33);
                    this._y = 0;
                }
            }
            else {
                console.warn('THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order);
            }
            this._order = order;
            this.onChangeCallback();
            return this;
        };
        Euler.prototype.setFromQuaternion = function (q, order, update) {
            if (order === void 0) { order = this._order; }
            if (update === void 0) { update = false; }
            var clamp = MathUtil_1.default.clamp;
            var sqx = q.x * q.x;
            var sqy = q.y * q.y;
            var sqz = q.z * q.z;
            var sqw = q.w * q.w;
            if (order === 'XYZ') {
                this._x = Math.atan2(2 * (q.x * q.w - q.y * q.z), (sqw - sqx - sqy + sqz));
                this._y = Math.asin(clamp(2 * (q.x * q.z + q.y * q.w), -1, 1));
                this._z = Math.atan2(2 * (q.z * q.w - q.x * q.y), (sqw + sqx - sqy - sqz));
            }
            else if (order === 'YXZ') {
                this._x = Math.asin(clamp(2 * (q.x * q.w - q.y * q.z), -1, 1));
                this._y = Math.atan2(2 * (q.x * q.z + q.y * q.w), (sqw - sqx - sqy + sqz));
                this._z = Math.atan2(2 * (q.x * q.y + q.z * q.w), (sqw - sqx + sqy - sqz));
            }
            else if (order === 'ZXY') {
                this._x = Math.asin(clamp(2 * (q.x * q.w + q.y * q.z), -1, 1));
                this._y = Math.atan2(2 * (q.y * q.w - q.z * q.x), (sqw - sqx - sqy + sqz));
                this._z = Math.atan2(2 * (q.z * q.w - q.x * q.y), (sqw - sqx + sqy - sqz));
            }
            else if (order === 'ZYX') {
                this._x = Math.atan2(2 * (q.x * q.w + q.z * q.y), (sqw - sqx - sqy + sqz));
                this._y = Math.asin(clamp(2 * (q.y * q.w - q.x * q.z), -1, 1));
                this._z = Math.atan2(2 * (q.x * q.y + q.z * q.w), (sqw + sqx - sqy - sqz));
            }
            else if (order === 'YZX') {
                this._x = Math.atan2(2 * (q.x * q.w - q.z * q.y), (sqw - sqx + sqy - sqz));
                this._y = Math.atan2(2 * (q.y * q.w - q.x * q.z), (sqw + sqx - sqy - sqz));
                this._z = Math.asin(clamp(2 * (q.x * q.y + q.z * q.w), -1, 1));
            }
            else if (order === 'XZY') {
                this._x = Math.atan2(2 * (q.x * q.w + q.y * q.z), (sqw - sqx + sqy - sqz));
                this._y = Math.atan2(2 * (q.x * q.z + q.y * q.w), (sqw + sqx - sqy - sqz));
                this._z = Math.asin(clamp(2 * (q.z * q.w - q.x * q.y), -1, 1));
            }
            else {
                console.warn('THREE.Euler: .setFromQuaternion() given unsupported order: ' + order);
            }
            this._order = order;
            if (update !== false)
                this.onChangeCallback();
            return this;
        };
        Euler.prototype.reorder = function (newOrder) {
            var q = this._reorder_q;
            q.setFromEuler(this);
            this.setFromQuaternion(q, newOrder);
        };
        Euler.prototype.equals = function (euler) {
            return (euler._x === this._x) && (euler._y === this._y) && (euler._z === this._z) && (euler._order === this._order);
        };
        Euler.prototype.fromArray = function (array) {
            this._x = array[0];
            this._y = array[1];
            this._z = array[2];
            if (array[3] !== undefined)
                this._order = array[3];
            this.onChangeCallback();
            return this;
        };
        Euler.prototype.toArray = function () {
            return [this._x, this._y, this._z, this._order];
        };
        Euler.prototype.onChange = function (callback) {
            this.onChangeCallback = callback;
            return this;
        };
        Euler.prototype.onChangeCallback = function () { };
        Euler.prototype.clone = function () {
            return new Euler(this._x, this._y, this._z, this._order);
        };
        Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
        Euler.DefaultOrder = 'XYZ';
        return Euler;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Euler;
});
