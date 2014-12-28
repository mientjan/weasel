define(["require", "exports"], function(require, exports)
{
	var MathUtil = (function()
	{
		function MathUtil()
		{
		}

		// Clamp value to range <a, b>
		MathUtil.clamp = function(x, a, b)
		{
			return (x < a) ? a : ((x > b) ? b : x);
		};
		// Clamp value to range <a, inf)
		MathUtil.clampBottom = function(x, a)
		{
			return x < a ? a : x;
		};
		// Linear mapping from range <a1, a2> to range <b1, b2>
		MathUtil.mapLinear = function(x, a1, a2, b1, b2)
		{
			return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
		};
		// http://en.wikipedia.org/wiki/Smoothstep
		MathUtil.smoothstep = function(x, min, max)
		{
			if(x <= min)
			{
				return 0;
			}
			if(x >= max)
			{
				return 1;
			}
			x = (x - min) / (max - min);
			return x * x * (3 - 2 * x);
		};
		MathUtil.smootherstep = function(x, min, max)
		{
			if(x <= min)
			{
				return 0;
			}
			if(x >= max)
			{
				return 1;
			}
			x = (x - min) / (max - min);
			return x * x * x * (x * (x * 6 - 15) + 10);
		};
		// Random float from <0, 1> with 16 bits of randomness
		// (standard Math.random() creates repetitive patterns when applied over larger space)
		MathUtil.random16 = function()
		{
			return (65280 * Math.random() + 255 * Math.random()) / 65535;
		};
		// Random integer from <low, high> interval
		MathUtil.randInt = function(low, high)
		{
			return low + Math.floor(Math.random() * (high - low + 1));
		};
		// Random float from <low, high> interval
		MathUtil.randFloat = function(low, high)
		{
			return low + Math.random() * (high - low);
		};
		// Random float from <-range/2, range/2> interval
		MathUtil.randFloatSpread = function(range)
		{
			return range * (0.5 - Math.random());
		};
		MathUtil.degToRad = function(degrees)
		{
			return degrees * MathUtil.degreeToRadiansFactor;
		};
		MathUtil.radToDeg = function(radians)
		{
			return radians * MathUtil.radianToDegreesFactor;
		};
		MathUtil.isPowerOfTwo = function(value)
		{
			return (value & (value - 1)) === 0 && value !== 0;
		};
		MathUtil.degreeToRadiansFactor = Math.PI / 180;
		MathUtil.radianToDegreesFactor = 180 / Math.PI;
		return MathUtil;
	})();
	return MathUtil;
});
