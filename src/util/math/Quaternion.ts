import Matrix4 from "./Matrix4";
import Vector3 from "./Vector3";
import AbstractMath3D from "./AbstractMath3D";

class Quaternion extends AbstractMath3D
{
	public static slerp(qa:Quaternion, qb, qm, t)
	{
		return qm.copy(qa).slerp(qb, t);
	}

	private _x:number;
	private _y:number;
	private _z:number;
	private _w:number;

	constructor(x:number = 0, y:number = 0, z:number = 0, w:number = 1)
	{
		super();

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;
	}

	public get x()
	{
		return this._x;
	}

	public set x(value:number)
	{
		this._x = value;
		this.onChangeCallback();
	}

	public get y()
	{
		return this._y;
	}

	public set y(value:number)
	{

		this._y = value;
		this.onChangeCallback();

	}

	public get z()
	{

		return this._z;

	}

	public set z(value:number)
	{

		this._z = value;
		this.onChangeCallback();

	}

	public get w():number
	{

		return this._w;

	}

	public set w(value:number)
	{

		this._w = value;
		this.onChangeCallback();

	}

	public set(x:number, y:number, z:number, w:number):Quaternion
	{

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

		this.onChangeCallback();

		return this;

	}

	public copy(quaternion:Quaternion):Quaternion
	{

		this._x = quaternion.x;
		this._y = quaternion.y;
		this._z = quaternion.z;
		this._w = quaternion.w;

		this.onChangeCallback();

		return this;

	}

	public setFromEuler(euler:any, update:boolean = false):Quaternion
	{

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//	content/SpinCalc.m

		var c1 = Math.cos(euler._x / 2);
		var c2 = Math.cos(euler._y / 2);
		var c3 = Math.cos(euler._z / 2);
		var s1 = Math.sin(euler._x / 2);
		var s2 = Math.sin(euler._y / 2);
		var s3 = Math.sin(euler._z / 2);

		if(euler.order === 'XYZ')
		{

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		}
		else if(euler.order === 'YXZ')
		{

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		}
		else if(euler.order === 'ZXY')
		{

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		}
		else if(euler.order === 'ZYX')
		{

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		}
		else if(euler.order === 'YZX')
		{

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		}
		else if(euler.order === 'XZY')
		{

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		}

		if(update !== false)
		{
			this.onChangeCallback();
		}

		return this;

	}

	public setFromAxisAngle(axis:any, angle:number)
	{

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

		// assumes axis is normalized

		var halfAngle = angle / 2, s = Math.sin(halfAngle);

		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos(halfAngle);

		this.onChangeCallback();

		return this;

	}

	// Matrix4
	public setFromRotationMatrix(m:any)
	{

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

			trace = m11 + m22 + m33,
			s;

		if(trace > 0)
		{

			s = 0.5 / Math.sqrt(trace + 1.0);

			this._w = 0.25 / s;
			this._x = ( m32 - m23 ) * s;
			this._y = ( m13 - m31 ) * s;
			this._z = ( m21 - m12 ) * s;

		}
		else if(m11 > m22 && m11 > m33)
		{

			s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

			this._w = ( m32 - m23 ) / s;
			this._x = 0.25 * s;
			this._y = ( m12 + m21 ) / s;
			this._z = ( m13 + m31 ) / s;

		}
		else if(m22 > m33)
		{

			s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

			this._w = ( m13 - m31 ) / s;
			this._x = ( m12 + m21 ) / s;
			this._y = 0.25 * s;
			this._z = ( m23 + m32 ) / s;

		}
		else
		{

			s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

			this._w = ( m21 - m12 ) / s;
			this._x = ( m13 + m31 ) / s;
			this._y = ( m23 + m32 ) / s;
			this._z = 0.25 * s;

		}

		this.onChangeCallback();

		return this;

	}

	private _setFromUnitVectors_r:number = 0;

	public setFromUnitVectors(vFrom, vTo)
	{


		// http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final
		// assumes direction vectors vFrom and vTo are normalized
		var v1 = this.getVector3('_setFromUnitVectors_v1'),
			r = this._setFromUnitVectors_r;

		var EPS = 0.000001;
		r = vFrom.dot(vTo) + 1;

		if(r < EPS)
		{

			r = 0;

			if(Math.abs(vFrom.x) > Math.abs(vFrom.z))
			{

				v1.set(-vFrom.y, vFrom.x, 0);

			}
			else
			{

				v1.set(0, -vFrom.z, vFrom.y);

			}

		}
		else
		{

			v1.crossVectors(vFrom, vTo);

		}

		this._x = v1.x;
		this._y = v1.y;
		this._z = v1.z;
		this._w = r;

		this.normalize();

		return this;

	}

	public inverse()
	{

		this.conjugate().normalize();

		return this;

	}

	public conjugate()
	{

		this._x *= -1;
		this._y *= -1;
		this._z *= -1;

		this.onChangeCallback();

		return this;

	}

	public dot(v)
	{

		return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

	}

	public lengthSq()
	{

		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

	}

	public length()
	{

		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);

	}

	public normalize()
	{

		var l = this.length();

		if(l === 0)
		{

			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;

		}
		else
		{

			l = 1 / l;

			this._x = this._x * l;
			this._y = this._y * l;
			this._z = this._z * l;
			this._w = this._w * l;

		}

		this.onChangeCallback();

		return this;

	}

	public multiply(q)
	{
		return this.multiplyQuaternions(this, q);

	}

	public multiplyQuaternions(a, b)
	{

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
		var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		this.onChangeCallback();

		return this;

	}

	public slerp(qb, t)
	{

		if(t === 0)
		{
			return this;
		}
		if(t === 1)
		{
			return this.copy(qb);
		}

		var x = this._x, y = this._y, z = this._z, w = this._w;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

		if(cosHalfTheta < 0)
		{

			this._w = -qb._w;
			this._x = -qb._x;
			this._y = -qb._y;
			this._z = -qb._z;

			cosHalfTheta = -cosHalfTheta;

		}
		else
		{

			this.copy(qb);

		}

		if(cosHalfTheta >= 1.0)
		{

			this._w = w;
			this._x = x;
			this._y = y;
			this._z = z;

			return this;

		}

		var halfTheta = Math.acos(cosHalfTheta);
		var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

		if(Math.abs(sinHalfTheta) < 0.001)
		{

			this._w = 0.5 * ( w + this._w );
			this._x = 0.5 * ( x + this._x );
			this._y = 0.5 * ( y + this._y );
			this._z = 0.5 * ( z + this._z );

			return this;

		}

		var ratioA = Math.sin(( 1 - t ) * halfTheta) / sinHalfTheta,
			ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

		this._w = ( w * ratioA + this._w * ratioB );
		this._x = ( x * ratioA + this._x * ratioB );
		this._y = ( y * ratioA + this._y * ratioB );
		this._z = ( z * ratioA + this._z * ratioB );

		this.onChangeCallback();

		return this;

	}

	public equals(quaternion:Quaternion)
	{

		return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

	}

	public fromArray(array, offset)
	{

		if(offset === undefined)
		{
			offset = 0;
		}

		this._x = array[ offset ];
		this._y = array[ offset + 1 ];
		this._z = array[ offset + 2 ];
		this._w = array[ offset + 3 ];

		this.onChangeCallback();

		return this;

	}

	public toArray(array, offset)
	{

		if(array === undefined)
		{
			array = [];
		}
		if(offset === undefined)
		{
			offset = 0;
		}

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._w;

		return array;

	}

	public onChange(callback)
	{

		this.onChangeCallback = callback;

		return this;

	}

	onChangeCallback()
	{
	}

	public clone()
	{
		return new Quaternion(this._x, this._y, this._z, this._w);
	}

}

export default Quaternion;