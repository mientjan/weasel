//
// Flambe - Rapid game development
// https://github.com/aduros/flambe/blob/master/LICENSE.txt

//package flambe.swf;
//
//import flambe.animation.AnimatedFloat;
//import flambe.display.Sprite;
//import flambe.math.FMath;
//import flambe.swf.MovieSymbol;
//import flambe.util.Signal0;
//
//using flambe.util.Arrays;
//using flambe.util.BitSets;
//using flambe.util.Strings;

/**
 * An instanced Flump animation.
 */
class MovieSprite extends Sprite
{
    /** The symbol this sprite displays. */
    public symbol:MovieSymbol;

    /** The current playback position in seconds. */
    public position:number = 0;

    /**
     * The playback speed multiplier of this movie, defaults to 1.0. Higher values will play faster.
     * This does not affect the speed of nested child movies, use `flambe.SpeedAdjuster` if you need
     * that.
     */
    public speed:number;

    /** Whether this movie is currently paused. */
    public paused:boolean;

    /** Emitted when this movie loops back to the beginning. */
    public looped:Signal;

    constructor(symbol:MovieSymbol)
    {
        super();
        this.symbol = symbol;

        this.speed = 1;

        _animators = Arrays.create(symbol.layers.length);
        for (ii in 0..._animators.length) {
            var layer = symbol.layers[ii];
            _animators[ii] = new LayerAnimator(layer);
        }

        _frame = 0;
        _position = 0;

        this.goto(1);
    }

    /**
     * Retrieves a named layer from this movie. Children can be added to the returned entity to add
     * sprites that move with the layer, which for example, can be used to add equipment sprites to
     * an avatar.
     * @param required If true and the layer is not found, an error is thrown.
     */
    public getLayer (name :String, required :Bool = true) :Entity
    {
        for (animator in _animators) {
            if (animator.layer.name == name) {
                return animator.content;
            }
        }
        if (required) {
            throw "Missing layer".withFields(["name", name]);
        }
        return null;
    }

    public onAdded ()
    {
        super.onAdded();

        for (animator in _animators) {
            owner.addChild(animator.content);
        }
    }

    public onRemoved ()
    {
        super.onRemoved();

        // Detach the animator content layers so they don't get disconnected during a disposal. This
        // may be a little hacky as it prevents child components from ever being formally removed.
        for (animator in _animators) {
            owner.removeChild(animator.content);
        }
    }

    public onTick(dt:number)
    {
        super.onTick(dt);

        speed.update(dt);

        switch (_flags & (PAUSED | SKIP_NEXT)) {
        case 0:
            // Neither paused nor skipping set, advance time
            _position += speed._*dt;
            if (_position > symbol.duration) {
                _position = _position % symbol.duration;

                if (_looped != null) {
                    _looped.emit();
                }
            }
        case SKIP_NEXT:
            // Not paused, but skip this time step
            _flags = _flags.remove(SKIP_NEXT);
        }

        var newFrame = _position * symbol.frameRate;
        this.goto(newFrame);
    }

    private goto(newFrame:number)
    {
        if (_frame == newFrame) {
            return; // No change
        }

        var wrapped = newFrame < _frame;
        if (wrapped) {
            for (animator in _animators) {
                animator.needsKeyframeUpdate = true;
                animator.keyframeIdx = 0;
            }
        }
        for (animator in _animators) {
            animator.composeFrame(newFrame);
        }

        _frame = newFrame;
    }

    private get_position () :Float
    {
        return _position;
    }

    private function set_position (position :Float) :Float
    {
        return _position = FMath.clamp(position, 0, symbol.duration);
    }

    private get_paused () :Bool
    {
        return _flags.contains(PAUSED);
    }

    private set_paused (paused :Bool)
    {
        _flags = _flags.set(PAUSED, paused);
        return paused;
    }

    private get_looped () :Signal0
    {
        if (_looped == null) {
            _looped = new Signal0();
        }
        return _looped;
    }

    private set_pixelSnapping (pixelSnapping :Bool) :Bool
    {
        for (layer in _animators) {
            layer.setPixelSnapping(pixelSnapping);
        }
        return super.set_pixelSnapping(pixelSnapping);
    }

    /**
     * Internal method to set the position to 0 and skip the next update. This is required to modify
     * the playback position of child movies during an update step, so that after the update
     * trickles through the children, they end up at position=0 instead of position=dt.
     */
    public rewind ()
    {
        this._position = 0;
        this._flags = _flags.add(SKIP_NEXT);
    }

    // Component flags
    private static PAUSED = Sprite.NEXT_FLAG << 0;
    private static SKIP_NEXT = Sprite.NEXT_FLAG << 1;
    private static NEXT_FLAG = Sprite.NEXT_FLAG << 2; // Must be last!

    private _animators:Array<LayerAnimator>;

    private _position:number;
    private _frame:number;

    private var _looped :Signal0 = null;
}

class LayerAnimator
{
    //public var content (default, null) :Entity;

    public needsKeyframeUpdate :Bool = false;
    public keyframeIdx :Int = 0;

    public layer :MovieLayer;

    constructor(layer:MovieLayer)
    {
        this.layer = layer;

        content = new Entity();
        if (layer.empty) {
            _sprites = null;

        } else {
            // Populate _sprites with the Sprite at each keyframe, reusing consecutive symbols
            _sprites = Arrays.create(layer.keyframes.length);
            for (ii in 0..._sprites.length) {
                var kf = layer.keyframes[ii];
                if (ii > 0 && layer.keyframes[ii-1].symbol == kf.symbol) {
                    _sprites[ii] = _sprites[ii-1];
                } else if (kf.symbol == null) {
                    _sprites[ii] = new Sprite();
                } else {
                    _sprites[ii] = kf.symbol.createSprite();
                }
            }
            content.add(_sprites[0]);
        }
    }

    public composeFrame(frame:number)
    {
        if (_sprites == null) {
            // TODO(bruno): Test this code path
            // Don't animate empty layers
            return;
        }

        var keyframes = layer.keyframes;
        var finalFrame = keyframes.length - 1;

        if (frame > layer.frames) {
            // TODO(bruno): Test this code path
            // Not enough frames on this layer, hide it
            content.get(Sprite).visible = false;
            keyframeIdx = finalFrame;
            needsKeyframeUpdate = true;
            return;
        }

        while (keyframeIdx < finalFrame && keyframes[keyframeIdx+1].index <= frame) {
            ++keyframeIdx;
            needsKeyframeUpdate = true;
        }

        var sprite;
        if (needsKeyframeUpdate) {
            needsKeyframeUpdate = false;
            // Switch to the next instance if this is a multi-layer symbol
            sprite = _sprites[keyframeIdx];
            if (sprite != content.get(Sprite)) {
                if (Type.getClass(sprite) == MovieSprite) {
                    var movie :MovieSprite = cast sprite;
                    movie.rewind();
                }
                content.add(sprite);
            }
        } else {
            sprite = content.get(Sprite);
        }

        var kf = keyframes[keyframeIdx];
        var visible = kf.visible && kf.symbol != null;
        sprite.visible = visible;
        if (!visible) {
            return; // Don't bother animating invisible layers
        }

        var x = kf.x;
        var y = kf.y;
        var scaleX = kf.scaleX;
        var scaleY = kf.scaleY;
        var skewX = kf.skewX;
        var skewY = kf.skewY;
        var alpha = kf.alpha;

        if (kf.tweened && keyframeIdx < finalFrame) {
            var interp = (frame-kf.index) / kf.duration;
            var ease = kf.ease;
            if (ease != 0) {
                var t;
                if (ease < 0) {
                    // Ease in
                    var inv = 1 - interp;
                    t = 1 - inv*inv;
                    ease = -ease;
                } else {
                    // Ease out
                    t = interp*interp;
                }
                interp = ease*t + (1 - ease)*interp;
            }

            var nextKf = keyframes[keyframeIdx + 1];
            x += (nextKf.x-x) * interp;
            y += (nextKf.y-y) * interp;
            scaleX += (nextKf.scaleX-scaleX) * interp;
            scaleY += (nextKf.scaleY-scaleY) * interp;
            skewX += (nextKf.skewX-skewX) * interp;
            skewY += (nextKf.skewY-skewY) * interp;
            alpha += (nextKf.alpha-alpha) * interp;
        }

        // From an identity matrix, append the translation, skew, and scale
        var matrix = sprite.getLocalMatrix();
        var sinX = 0.0, cosX = 1.0;
        var sinY = 0.0, cosY = 1.0;
        if (skewX != 0) {
            sinX = Math.sin(skewX);
            cosX = Math.cos(skewX);
        }
        if (skewY != 0) {
            sinY = Math.sin(skewY);
            cosY = Math.cos(skewY);
        }
        matrix.set(cosY*scaleX, sinY*scaleX, -sinX*scaleY, cosX*scaleY, x, y);

        // Append the pivot
        matrix.translate(-kf.pivotX, -kf.pivotY);

        sprite.alpha._ = alpha;
    }

    public setPixelSnapping (pixelSnapping :Bool) :Void
    {
        if (_sprites != null) {        
            for (sprite in _sprites) {
                sprite.pixelSnapping = pixelSnapping;
            }
        }
    }

    // The sprite to show at each keyframe index, or null if this layer has no symbol instances
    private _sprites:Array<Sprite>;
}
