import Promise from "../util/Promise";

interface ILoadable<T>
{
	/**
	 * Set to true once the class has successfully loaded.
	 *
	 * @member {boolean}
	 * @readOnly
	 */
	hasLoaded():boolean;

	/**
	 *
	 * @param onProgress
	 */
	load(onProgress?:(progress:number) => any):Promise<T>
}

export default ILoadable;