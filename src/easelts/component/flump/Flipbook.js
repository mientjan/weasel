var Flipbook = (function () {
    function Flipbook(name, textures) {
        this.frames = [];
        this.name = name;
        var durationPerFrame = 1 / textures.length;
        for (var i = 0; i < textures.length; i++) {
            var texture = textures[i];
            this.frames.push(new FlipbookFrame(texture, durationPerFrame));
        }
    }
    Flipbook.prototype.setDuration = function (duration) {
        var durationPerFrame = duration / frames.length;
        var frames = this.frames;
        for (var i = 0; i < frames.length; i++) {
            var frame = frames[i];
            frame.duration = durationPerFrame;
        }
        return this;
    };
    Flipbook.prototype.setAnchor = function (x, y) {
        var frames = this.frames;
        for (var i = 0; i < frames.length; i++) {
            var frame = frames[i];
            frame.anchorX = x;
            frame.anchorY = y;
        }
        return this;
    };
    return Flipbook;
})();
var FlipbookFrame = (function () {
    function FlipbookFrame(texture, duration) {
        this.anchorX = 0;
        this.anchorY = 0;
        this.label = null;
        this.texture = texture;
        this.duration = duration;
    }
    FlipbookFrame.prototype.toSymbol = function () {
        return new FrameSymbol(this);
    };
    return FlipbookFrame;
})();
var FrameSymbol = (function () {
    function FrameSymbol(frame) {
        this.name = null;
        this._texture = frame.texture;
        this._anchorX = frame.anchorX;
        this._anchorY = frame.anchorY;
    }
    FrameSymbol.prototype.createSprite = function () {
        var sprite = new ImageSprite(this._texture);
        sprite.setAnchor(this._anchorX, this._anchorY);
        return sprite;
    };
    return FrameSymbol;
})();
