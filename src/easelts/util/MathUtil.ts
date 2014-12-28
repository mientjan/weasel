class MathUtil
{

	private static degreeToRadiansFactor = Math.PI / 180;
	private static radianToDegreesFactor = 180 / Math.PI;

	// Clamp value to range <a, b>
	public static clamp(x:number, a:number, b:number)
	{

		return ( x < a ) ? a : ( ( x > b ) ? b : x );

	}

	// Clamp value to range <a, inf)
	public static clampBottom(x:number, a:number):number
	{

		return x < a ? a : x;

	}

	// Linear mapping from range <a1, a2> to range <b1, b2>
	public static mapLinear(x:number, a1:number, a2:number, b1:number, b2:number):number
	{

		return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

	}

	// http://en.wikipedia.org/wiki/Smoothstep
	public static smoothstep(x:number, min:number, max:number):number
	{

		if(x <= min)
		{
			return 0;
		}
		if(x >= max)
		{
			return 1;
		}

		x = ( x - min ) / ( max - min );

		return x * x * ( 3 - 2 * x );

	}

	public static smootherstep(x:number, min:number, max:number):number
	{

		if(x <= min)
		{
			return 0;
		}
		if(x >= max)
		{
			return 1;
		}

		x = ( x - min ) / ( max - min );

		return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

	}

	// Random float from <0, 1> with 16 bits of randomness
	// (standard Math.random() creates repetitive patterns when applied over larger space)

	public static random16():number
	{

		return ( 65280 * Math.random() + 255 * Math.random() ) / 65535;

	}

	// Random integer from <low, high> interval

	public static randInt(low:number, high:number):number
	{

		return low + Math.floor(Math.random() * ( high - low + 1 ));

	}

	// Random float from <low, high> interval

	public static randFloat(low:number, high:number)
	{

		return low + Math.random() * ( high - low );

	}

	// Random float from <-range/2, range/2> interval

	public static randFloatSpread(range:number)
	{

		return range * ( 0.5 - Math.random() );

	}

	public static degToRad(degrees)
	{

		return degrees * MathUtil.degreeToRadiansFactor;

	}

	public static radToDeg(radians)
	{

		return radians * MathUtil.radianToDegreesFactor;

	}

	public static isPowerOfTwo(value)
	{

		return ( value & ( value - 1 ) ) === 0 && value !== 0;
	}

}

export = MathUtil;