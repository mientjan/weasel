import * as Functional from "./Functional";

export function log(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>)
{
	var originalMethod = descriptor.value; // save a reference to the original method

	// NOTE: Do not use arrow syntax here. Use a function expression in
	// order to use the correct value of `this` in this method (see notes below)
	descriptor.value = function(...args: any[]) {
		console.log("The method args are: " + JSON.stringify(args)); // pre
		var result = originalMethod.apply(this, args);               // run and store the result
		console.log("The return value is: " + result);               // post
		return result;                                               // return the result of the original method
	};

	return descriptor;
}


export function debounce(wait:number)
{
	return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) =>
	{
		var originalMethod = descriptor.value; // save a reference to the original method

		descriptor.value = Functional.debounce(originalMethod, wait);

		return descriptor;
	}
}
export function throttle(threshhold:number)
{
	return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) =>
	{
		var originalMethod = descriptor.value; // save a reference to the original method

		descriptor.value = Functional.throttle(originalMethod, threshhold, target);

		return descriptor;
	}
}