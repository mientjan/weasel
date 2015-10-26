class Flag<T>
{
	public value:number = 0;

	public isPowerOfTwo(n:number)
	{
		return n !== 0 && (n & (n - 1)) === 0;
	}

	public contains(val:number)
	{
		return (this.value & val) === val;
	}

	public add(val:number)
	{
		this.value |= val;
		return this.contains(val);
	}

	public remove(val:number)
	{
		this.value = (this.value ^ val) & this.value;
		return !this.contains(val);
	}

	public equals(val:number)
	{
		return this.value === (val + 0);
	}

	public valueOf()
	{
		return this.value;
	}

}
export default Flag;
