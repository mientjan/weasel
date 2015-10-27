import RGBA from "../data/RGBA";
export interface IStageOption
{
	/**
	 * Indicates whether onResize should be called when the window is resized.
	 * @property triggerResizeOnWindowResize
	 * @type {boolean}
	 * @default false
	 */
	webgl?:boolean;
	autoResize?:boolean;
	pixelRatio?:number;
	willAutoClear?:boolean;
	autoClearColor?:string|RGBA;
}