/*
 * DOMElement
 *
 * Copyright (c) 2010 gskinner.com, inc.
 * Copyright (c) 2015 Mient-jan Stelling
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

import DisplayObject from "./DisplayObject";
import Point from "../geom/Point";
import TimeEvent from "../../util/event/TimeEvent";

class DOMElement<T extends HTMLElement> extends DisplayObject
{

	// public properties:
	/**
	 * The DOM object to manage.
	 * @property htmlElement
	 * @type HTMLElement
	 */
	public htmlElement:T;

	// private properties:
	/**
	 * @property _oldMtx
	 * @type Matrix2D
	 * @protected
	 */
	public _oldMtx = null;

	/**
	 * @property _visible
	 * @type Boolean
	 * @protected
	 */
	public _visible = false;

	/**
	 * Initialization method.
	 * @method initialize
	 * @param {HTMLElement} htmlElement A reference or id for the DOM element to manage.
	 * @protected
	 */
	constructor(htmlElement:string|T, x?:string|number, y?:string|number, regX?:string|number, regY?:string|number)
	{
		super(x, y, regX, regY);

		var domElement:T;
		if(typeof htmlElement == 'string')
		{
			domElement = <T> document.getElementById(<string> htmlElement);
		}
		else
		{
			domElement = <T> htmlElement;
		}

		this.mouseEnabled = false;
		this.htmlElement = domElement;
		var style = domElement.style;
		// this relies on the _tick method because draw isn't called if a parent is not visible.
		style.position = "absolute";
		style.transformOrigin = style['WebkitTransformOrigin'] = style['msTransformOrigin'] = style['MozTransformOrigin'] = style['OTransformOrigin'] = "0% 0%";
	}

	// public methods:
	/**
	 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
	 * This does not account for whether it would be visible within the boundaries of the stage.
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method isVisible
	 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
	 */
	public isVisible()
	{
		return this.htmlElement != null;
	}

	/**
	 * Draws the display object into the specified context ignoring its visible, alpha, shadow, and transform.
	 * Returns true if the draw was handled (useful for overriding functionality).
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method draw
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 * @param {Boolean} ignoreCache Indicates whether the draw operation should ignore any current cache.
	 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
	 * into itself).
	 * @return {Boolean}
	 */
	public draw(ctx:CanvasRenderingContext2D, ignoreCache:boolean):boolean
	{
		// this relies on the _tick method because draw isn't called if a parent is not visible.
		// the actual update happens in _handleDrawEnd

		var o = this.htmlElement;
		if(!o)
		{
			return;
		}
		var style = o.style;

		var mtx = this.getConcatenatedMatrix(this._matrix);

		var visibility = mtx.visible ? "visible" : "hidden";
		if(visibility != style.visibility)
		{
			style.visibility = visibility;
		}
		if(!mtx.visible)
		{
			return;
		}

		var oMtx = this._oldMtx;
		var n = 10000; // precision
		if(!oMtx || oMtx.alpha != mtx.alpha)
		{
			style.opacity = "" + (mtx.alpha * n | 0) / n;
			if(oMtx)
			{
				oMtx.alpha = mtx.alpha;
			}
		}
		if(!oMtx || oMtx.tx != mtx.tx || oMtx.ty != mtx.ty || oMtx.a != mtx.a || oMtx.b != mtx.b || oMtx.c != mtx.c || oMtx.d != mtx.d)
		{
			var str = "matrix(" + (mtx.a * n | 0) / n + "," + (mtx.b * n | 0) / n + "," + (mtx.c * n | 0) / n + "," + (mtx.d * n | 0) / n + "," + (mtx.tx + 0.5 | 0);
			style.transform = style['WebkitTransform'] = style['OTransform'] = style['msTransform'] = str + "," + (mtx.ty + 0.5 | 0) + ")";
			style['MozTransform'] = str + "px," + (mtx.ty + 0.5 | 0) + "px)";
			this._oldMtx = oMtx ? oMtx.copy(mtx) : mtx.clone();
		}

		return true;
	}

	/**
	 * Not applicable to DOMElement.
	 * @method cache
	 */
	public cache()
	{
	}

	/**
	 * Not applicable to DOMElement.
	 * @method uncache
	 */
	public uncache()
	{
	}

	/**
	 * Not applicable to DOMElement.
	 * @method updateCache
	 */
	public updateCache()
	{
	}

	/**
	 * Not applicable to DOMElement.
	 * @method hitTest
	 */
	public hitTest(x:number, y:number):boolean
	{
		throw 'hitTest Not applicable to DOMElement.';
	}

	/**
	 * Not applicable to DOMElement.
	 * @method localToGlobal
	 */
	public localToGlobal(x:number, y:number):Point
	{
		throw 'localToGlobal Not applicable to DOMElement.';
	}

	/**
	 * Not applicable to DOMElement.
	 * @method globalToLocal
	 */
	public globalToLocal(x:number, y:number):Point
	{
		throw 'globalToLocal Not applicable to DOMElement.';
	}

	/**
	 * Not applicable to DOMElement.
	 * @method localToLocal
	 */
	public localToLocal(x:number, y:number):Point
	{
		throw 'localToLocal Not applicable to DOMElement.';
	}

	/**
	 * DOMElement cannot be cloned. Throws an error.
	 * @method clone
	 */
	public clone():DisplayObject
	{
		throw("DOMElement cannot be cloned.")
	}

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 */
	public toString()
	{
		return "[DOMElement (name=" + this.name + ")]";
	}

	/**
	 * @method _tick
	 * @param {Object} props Properties to copy to the DisplayObject {{#crossLink "DisplayObject/tick"}}{{/crossLink}} event object.
	 * function.
	 * @protected
	 */
	public onTick(delta:number)
	{
		// Do nothing, prevent super class from having onTick called
	}

//	public onStageSet():void
//	{
//		this._drawEndConnection = this.stage.drawendSignal.connect(this._handleDrawEnd.bind(this));
//	}

	/**
	 * @method _handleDrawEnd
	 * @param {Event} evt
	 * @protected
	 */
	/*public _handleDrawEnd()
	{
		var o = this.htmlElement;
		if(!o)
		{
			return;
		}
		var style = o.style;

		var mtx = this.getConcatenatedMatrix(this._matrix);

		var visibility = mtx.visible ? "visible" : "hidden";
		if(visibility != style.visibility)
		{
			style.visibility = visibility;
		}
		if(!mtx.visible)
		{
			return;
		}

		var oMtx = this._oldMtx;
		var n = 10000; // precision
		if(!oMtx || oMtx.alpha != mtx.alpha)
		{
			style.opacity = "" + (mtx.alpha * n | 0) / n;
			if(oMtx)
			{
				oMtx.alpha = mtx.alpha;
			}
		}
		if(!oMtx || oMtx.tx != mtx.tx || oMtx.ty != mtx.ty || oMtx.a != mtx.a || oMtx.b != mtx.b || oMtx.c != mtx.c || oMtx.d != mtx.d)
		{
			var str = "matrix(" + (mtx.a * n | 0) / n + "," + (mtx.b * n | 0) / n + "," + (mtx.c * n | 0) / n + "," + (mtx.d * n | 0) / n + "," + (mtx.tx + 0.5 | 0);
			style.transform = style['WebkitTransform'] = style['OTransform'] = style['msTransform'] = str + "," + (mtx.ty + 0.5 | 0) + ")";
			style['MozTransform'] = str + "px," + (mtx.ty + 0.5 | 0) + "px)";
			this._oldMtx = oMtx ? oMtx.copy(mtx) : mtx.clone();
		}

		if(this._drawEndConnection)
		{
			this._drawEndConnection.dispose();
			this._drawEndConnection = null;
		}
	}*/

}
export default DOMElement;