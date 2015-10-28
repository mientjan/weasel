//import Renderer from "../Renderer";
import DisplayObject from "../../display/DisplayObject";
import RenderType from "../../enum/RenderType";
import Matrix2 from "../../geom/Matrix2";
import RendererOptions from "../RendererOptions";
import CanvasBuffer from "../../display/buffer/CanvasBuffer";

	//CanvasMaskManager = require('./utils/CanvasMaskManager'),
	//utils = require('../../utils'),
	//math = require('../../math'),
	//CONST = require('../../const');

class CanvasRenderer extends CanvasBuffer
{
	public type:RenderType = RenderType.CANVAS;

	public transparent:boolean;
	public resolution:number;
	public autoResize:boolean;
	public clearBeforeRender:boolean;
	public roundPixels:boolean;

	public smoothProperty:string = null;
	public context:CanvasRenderingContext2D;
	public refresh:boolean = true;

	constructor(width, height, options:RendererOptions)
	{
		super(width, height, options.view);

		this.type = RenderType.CANVAS;

		this.transparent = options.transparent;
		this.autoResize = options.autoResize;
		// this.antialias = options.antialias;
		this.resolution = options.resolution;
		this.clearBeforeRender = options.clearBeforeRender;
		this.roundPixels = options.roundPixels;

		this.context = <CanvasRenderingContext2D> this.element.getContext('2d', {alpha: this.transparent});

		/**
		 * Instance of a CanvasMaskManager, handles masking when using the canvas renderer.
		 *
		 * @member {PIXI.CanvasMaskManager}
		 */
		// this.maskManager = new CanvasMaskManager();

		//this.initPlugins();

		this._mapBlendModes();

		/**
		 * This temporary display object used as the parent of the currently being rendered item
		 *
		 * @member {PIXI.DisplayObject}
		 * @private
		 */
		//this._tempDisplayObjectParent = {
		//	worldTransform: new Matrix2(),
		//	worldAlpha: 1
		//};


		this.resize(width, height);
	}

	// constructor
	//CanvasRenderer.prototype = Object.create(SystemRenderer.prototype);
	//CanvasRenderer.prototype.constructor = CanvasRenderer;
	//module.exports = CanvasRenderer;
	//utils.pluginTarget.mixin(CanvasRenderer);

	/**
	 * Renders the object to this canvas view
	 *
	 * @param object {PIXI.DisplayObject} the object to be rendered
	 */
	public render(object:DisplayObject)
	{
		var cacheParent = object.parent;

		//this._lastObjectRendered = object;

		// object.parent = this._tempDisplayObjectParent;

		// update the scene graph
		// object.updateTransform();

		// object.parent = cacheParent;

		this.context.setTransform(1, 0, 0, 1, 0, 0);
		this.context.globalAlpha = 1;
		this.context.globalCompositeOperation = DisplayObject.COMPOSITE_OPERATION_SOURCE_OVER; //this.blendModes[CONST.BLEND_MODES.NORMAL];

		if(this.clearBeforeRender)
		{
			this.clear();
		}

		this.renderDisplayObject(object, this.context);
	}

	/**
	 * Renders a display object
	 *
	 * @param displayObject {PIXI.DisplayObject} The displayObject to render
	 * @private
	 */
	public renderDisplayObject(displayObject:DisplayObject, context:CanvasRenderingContext2D)
	{
		var tempContext = this.context;

		this.context = context;
		//displayObject.renderCanvas(this);
		this.context = tempContext;
	}

	/**
	 * @extends PIXI.SystemRenderer#resize
	 *
	 * @param {number} w
	 * @param {number} h
	 */
	public resize(width:number, height:number)
	{
		//this.super(width, height);

		//reset the scale mode.. oddly this seems to be reset when the canvas is resized.
		//surely a browser bug?? Let pixi fix that for you..
		if(this.smoothProperty)
		{
			this.context[this.smoothProperty] = true;
		}

	}

	/**
	 * Maps Pixi blend modes to canvas blend modes.
	 *
	 * @private
	 */
	public _mapBlendModes()
	{
		//if(!this.blendModes)
		//{
		//	this.blendModes = {};

		//	if(utils.canUseNewCanvasBlendModes())
		//	{
		//		this.blendModes[CONST.BLEND_MODES.NORMAL] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.ADD] = 'lighter'; //IS THIS OK???
		//		this.blendModes[CONST.BLEND_MODES.MULTIPLY] = 'multiply';
		//		this.blendModes[CONST.BLEND_MODES.SCREEN] = 'screen';
		//		this.blendModes[CONST.BLEND_MODES.OVERLAY] = 'overlay';
		//		this.blendModes[CONST.BLEND_MODES.DARKEN] = 'darken';
		//		this.blendModes[CONST.BLEND_MODES.LIGHTEN] = 'lighten';
		//		this.blendModes[CONST.BLEND_MODES.COLOR_DODGE] = 'color-dodge';
		//		this.blendModes[CONST.BLEND_MODES.COLOR_BURN] = 'color-burn';
		//		this.blendModes[CONST.BLEND_MODES.HARD_LIGHT] = 'hard-light';
		//		this.blendModes[CONST.BLEND_MODES.SOFT_LIGHT] = 'soft-light';
		//		this.blendModes[CONST.BLEND_MODES.DIFFERENCE] = 'difference';
		//		this.blendModes[CONST.BLEND_MODES.EXCLUSION] = 'exclusion';
		//		this.blendModes[CONST.BLEND_MODES.HUE] = 'hue';
		//		this.blendModes[CONST.BLEND_MODES.SATURATION] = 'saturate';
		//		this.blendModes[CONST.BLEND_MODES.COLOR] = 'color';
		//		this.blendModes[CONST.BLEND_MODES.LUMINOSITY] = 'luminosity';
		//	}
		//else
		//	{
		//		// this means that the browser does not support the cool new blend modes in canvas 'cough' ie 'cough'
		//		this.blendModes[CONST.BLEND_MODES.NORMAL] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.ADD] = 'lighter'; //IS THIS OK???
		//		this.blendModes[CONST.BLEND_MODES.MULTIPLY] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.SCREEN] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.OVERLAY] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.DARKEN] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.LIGHTEN] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.COLOR_DODGE] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.COLOR_BURN] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.HARD_LIGHT] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.SOFT_LIGHT] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.DIFFERENCE] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.EXCLUSION] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.HUE] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.SATURATION] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.COLOR] = 'source-over';
		//		this.blendModes[CONST.BLEND_MODES.LUMINOSITY] = 'source-over';
		//	}
		//}
	}


	/**
	 * Removes everything from the renderer and optionally removes the Canvas DOM element.
	 *
	 * @param [removeView=false] {boolean} Removes the Canvas element from the DOM.
	 */
	public destruct()
	{
		// this.destroyPlugins();

		// this.super(removeView);

		this.context = null;

		this.refresh = true;

		//this.maskManager.destroy();
		//this.maskManager = null;

		this.smoothProperty = null;
	}
}