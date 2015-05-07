/*
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import m4 = require('./Matrix4');
import m3 = require('./Matrix3');
import Vector4 = require('./Vector4');
import Quaternion = require('./Quaternion');
import MathUtil = require('../util/MathUtil');

// interface
import IVertex3 = require('../interface/IVector3');
/**
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

class Vector3
{
	public x:number;
	public y:number;
	public z:number;

	constructor(x:number = 0, y:number = 0, z:number = 0)
	{

		this.x = x;
		this.y = y;
		this.z = z;
	}

	public set(x:number, y:number, z:number)
	{

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	}

	public setX(x)
	{

		this.x = x;

		return this;

	}

	public setY(y)
	{

		this.y = y;

		return this;

	}

	public setZ(z)
	{

		this.z = z;

		return this;

	}

	public setComponent(index, value)
	{

		switch(index)
		{

			case 0:
				this.x = value;
				break;
			case 1:
				this.y = value;
				break;
			case 2:
				this.z = value;
				break;
			default:
				throw new Error('index is out of range: ' + index);

		}

	}

	public getComponent(index)
	{

		switch(index)
		{

			case 0:
				return this.x;
			case 1:
				return this.y;
			case 2:
				return this.z;
			default:
				throw new Error('index is out of range: ' + index);

		}

	}

	public copy(v)
	{
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;
	}

	public add(v:Vector3)
	{
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;
	}

	public addScalar(s:number)
	{

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	}

	public addVectors(a:Vector3, b:Vector3):Vector3
	{
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;
	}

	public sub(v:Vector3):Vector3
	{
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;
	}

	public subScalar(s:number)
	{

		this.x -= s;
		this.y -= s;
		this.z -= s;

		return this;

	}

	public subVectors(a:Vector3, b:Vector3):Vector3
	{

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	}

	public multiply(v:Vector3):Vector3
	{

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	}

	public multiplyScalar(scalar):Vector3
	{

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	}

	public multiplyVectors(a, b)
	{

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	}

	private _quaternionApplyEuler = new Quaternion();

	public applyEuler(euler)
	{
		this.applyQuaternion(this._quaternionApplyEuler.setFromEuler(euler));
		return this;
	}

	private _quaternionApplyAxisAngle = new Quaternion();

	public applyAxisAngle(axis:Vector4, angle:number):Vector3
	{
		this.applyQuaternion(this._quaternionApplyAxisAngle.setFromAxisAngle(axis, angle));
		return this;
	}

	public applyMatrix3(m):Vector3
	{

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

		return this;

	}

	public applyMatrix4(m):Vector3
	{

		// input: THREE.Matrix4 affine matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ];
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ];
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ];

		return this;

	}

	public applyProjection(m):Vector3
	{

		// input: THREE.Matrix4 projection matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;
		var d = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] ); // perspective divide

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * d;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * d;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * d;

		return this;

	}

	public applyQuaternion(q):Vector3
	{

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var qx = q.x;
		var qy = q.y;
		var qz = q.z;
		var qw = q.w;

		// calculate quat * vector

		var ix = qw * x + qy * z - qz * y;
		var iy = qw * y + qz * x - qx * z;
		var iz = qw * z + qx * y - qy * x;
		var iw = -qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
		this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
		this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

		return this;

	}

	private _projectMatrix:m4.Matrix4 = new m4.Matrix4();
	public project(camera:any):Vector3
	{
		this._projectMatrix.multiplyMatrices(<m4.Matrix4> camera.projectionMatrix, <m4.Matrix4> this._projectMatrix.getInverse(camera.matrixWorld));
		return this.applyProjection(this._projectMatrix);
	}

	private _unprojectMatrix:m4.Matrix4 = new m4.Matrix4();
	public unproject(camera:any):Vector3
	{
		this._unprojectMatrix.multiplyMatrices(<m4.Matrix4> camera.matrixWorld, <m4.Matrix4> this._unprojectMatrix.getInverse(camera.projectionMatrix));
		return this.applyProjection(this._unprojectMatrix);

	}

	public transformDirection(m):Vector3
	{

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		this.normalize();

		return this;

	}

	public divide(v):Vector3
	{

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	}

	public divideScalar(scalar):Vector3
	{

		if(scalar !== 0)
		{

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;
			this.z *= invScalar;

		}
		else
		{

			this.x = 0;
			this.y = 0;
			this.z = 0;

		}

		return this;

	}

	public min(v:Vector3):Vector3
	{
		if(this.x > v.x)
		{

			this.x = v.x;

		}

		if(this.y > v.y)
		{

			this.y = v.y;

		}

		if(this.z > v.z)
		{

			this.z = v.z;

		}

		return this;

	}

	public max(v):Vector3
	{

		if(this.x < v.x)
		{

			this.x = v.x;

		}

		if(this.y < v.y)
		{

			this.y = v.y;

		}

		if(this.z < v.z)
		{

			this.z = v.z;

		}

		return this;

	}

	/**
	 *
	 * @param {Vector3} min
	 * @param {Vector3} max
	 * @returns {Vector3}
	 */
	public clamp(min:Vector3, max:Vector3):Vector3
	{

		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		if(this.x < min.x)
		{

			this.x = min.x;

		}
		else if(this.x > max.x)
		{

			this.x = max.x;

		}

		if(this.y < min.y)
		{

			this.y = min.y;

		}
		else if(this.y > max.y)
		{

			this.y = max.y;

		}

		if(this.z < min.z)
		{

			this.z = min.z;

		}
		else if(this.z > max.z)
		{

			this.z = max.z;

		}

		return this;
	}


	private _minClampScalar = new Vector3();
	private _maxClampScalar = new Vector3();

	public clampScalar(minVal:number, maxVal)
	{
		this._minClampScalar.set(minVal, minVal, minVal);
		this._maxClampScalar.set(maxVal, maxVal, maxVal);

		return this.clamp(this._minClampScalar, this._maxClampScalar);
	}

	public floor():Vector3
	{
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);

		return this;
	}

	public ceil():Vector3
	{

		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		this.z = Math.ceil(this.z);

		return this;

	}

	public round():Vector3
	{

		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		this.z = Math.round(this.z);

		return this;

	}

	public roundToZero():Vector3
	{

		this.x = ( this.x < 0 ) ? Math.ceil(this.x) : Math.floor(this.x);
		this.y = ( this.y < 0 ) ? Math.ceil(this.y) : Math.floor(this.y);
		this.z = ( this.z < 0 ) ? Math.ceil(this.z) : Math.floor(this.z);

		return this;

	}

	public negate():Vector3
	{

		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;

		return this;

	}

	public dot(v):number
	{

		return this.x * v.x + this.y * v.y + this.z * v.z;

	}

	public lengthSq():number
	{

		return this.x * this.x + this.y * this.y + this.z * this.z;

	}

	public length():number
	{

		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

	}

	public lengthManhattan():number
	{

		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);

	}

	public normalize():Vector3
	{

		return this.divideScalar(this.length());

	}

	public setLength(l):Vector3
	{

		var oldLength = this.length();

		if(oldLength !== 0 && l !== oldLength)
		{

			this.multiplyScalar(l / oldLength);
		}

		return this;

	}

	public lerp(v, alpha):Vector3
	{

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	}

	public lerpVectors(v1, v2, alpha):Vector3
	{

		this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);

		return this;

	}

	public cross(v:Vector3):Vector3
	{

		var x = this.x, y = this.y, z = this.z;

		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;

		return this;

	}

	public crossVectors(a:Vector3, b:Vector3):Vector3
	{

		var ax = a.x, ay = a.y, az = a.z;
		var bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	}


	private _v1ProjectOnVector:Vector3 = new Vector3();
	private _dotProjectOnVector:number = null;

	public projectOnVector(v:Vector3):Vector3
		{
			this._v1ProjectOnVector.copy(v).normalize();

			this._dotProjectOnVector = this.dot(this._v1ProjectOnVector);

			return this.copy(this._v1ProjectOnVector).multiplyScalar(this._dotProjectOnVector);

		}

	private _v1ProjectOnPlane = new Vector3();
	public projectOnPlane(planeNormal:Vector3)
	{
		this._v1ProjectOnPlane.copy(this).projectOnVector(planeNormal);
		return this.sub(this._v1ProjectOnPlane);
	}

	private _v1Reflect = new Vector3();

	/**
	 * reflect incident vector off plane orthogonal to normal
	 * normal is assumed to have unit length
	 * @param normal
	 * @returns {Vector3}
	 */
	public reflect(normal:Vector3):Vector3
	{

		return this.sub(this._v1Reflect.copy(normal).multiplyScalar(2 * this.dot(normal)));

	}


	public angleTo(v:Vector3):number
	{
		var theta = this.dot(v) / ( this.length() * v.length() );

		// clamp, to handle numerical problems
		return Math.acos(MathUtil.clamp(theta, -1, 1));
	}

	public distanceTo(v:Vector3)
	{
		return Math.sqrt(this.distanceToSquared(v));
	}

	public distanceToSquared(v:Vector3):number
	{
		var dx = this.x - v.x;
		var dy = this.y - v.y;
		var dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;
	}

	//	public setEulerFromRotationMatrix( m, order ) {
	//
	//		THREE.error( 'THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.' );
	//
	//	}
	//
	//	public setEulerFromQuaternion( q, order ) {
	//
	//		THREE.error( 'THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.' );
	//
	//	}
	//
	//	public getPositionFromMatrix( m ) {
	//
	//		THREE.warn( 'THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().' );
	//
	//		return this.setFromMatrixPosition( m );
	//
	//	}
	//
	//	public getScaleFromMatrix( m ) {
	//
	//		THREE.warn( 'THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().' );
	//
	//		return this.setFromMatrixScale( m );
	//	}
	//
	//	public getColumnFromMatrix( index, matrix ) {
	//
	//		THREE.warn( 'THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().' );
	//
	//		return this.setFromMatrixColumn( index, matrix );
	//
	//	}

	public setFromMatrixPosition(m:m4.Matrix4):Vector3
	{
		this.x = m.elements[ 12 ];
		this.y = m.elements[ 13 ];
		this.z = m.elements[ 14 ];

		return this;
	}

	public setFromMatrixScale(m:m4.Matrix4):Vector3
	{
		var sx = this.set(m.elements[ 0 ], m.elements[ 1 ], m.elements[  2 ]).length();
		var sy = this.set(m.elements[ 4 ], m.elements[ 5 ], m.elements[  6 ]).length();
		var sz = this.set(m.elements[ 8 ], m.elements[ 9 ], m.elements[ 10 ]).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;
	}

	public setFromMatrixColumn(index, matrix):Vector3
	{
		var offset = index * 4;

		var me = matrix.elements;

		this.x = me[ offset ];
		this.y = me[ offset + 1 ];
		this.z = me[ offset + 2 ];

		return this;
	}

	public equals(v:Vector3)
	{
		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );
	}

	public fromArray(array, offset):Vector3
	{
		if(offset === undefined)
		{
			offset = 0;
		}

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];

		return this;
	}

	public toArray(array = [], offset:number = 0)
	{
		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;

		return array;
	}

//	public fromAttribute(attribute, index, offset:number = 0):Vector3
//	{
//		index = index * attribute.itemSize + offset;
//
//		this.x = attribute.array[ index ];
//		this.y = attribute.array[ index + 1 ];
//		this.z = attribute.array[ index + 2 ];
//
//		return this;
//	}

	public clone():Vector3
	{
		return new Vector3(this.x, this.y, this.z);
	}

}

export = Vector3;