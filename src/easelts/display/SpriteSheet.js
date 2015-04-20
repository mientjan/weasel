var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../../createts/event/EventDispatcher', '../geom/Rectangle'], function (require, exports, EventDispatcher, Rectangle) {
    var SpriteSheet = (function (_super) {
        __extends(SpriteSheet, _super);
        function SpriteSheet(data) {
            _super.call(this);
            this.complete = true;
            this.framerate = 0;
            this._animations = null;
            this._frames = [];
            this._images = [];
            this._data = null;
            this._loadCount = 0;
            this._frameHeight = 0;
            this._frameWidth = 0;
            this._numFrames = 0;
            this._regX = 0;
            this._regY = 0;
            var i, l, o, a;
            if (data == null) {
                return;
            }
            this.framerate = data.framerate || 0;
            if (data.images && (l = data.images.length) > 0) {
                a = this._images = [];
                for (i = 0; i < l; i++) {
                    var img = data.images[i];
                    if (typeof img == "string") {
                        var src = img;
                        img = document.createElement("img");
                        img.src = src;
                    }
                    a.push(img);
                    if (!img.getContext && !img.complete) {
                        this._loadCount++;
                        this.complete = false;
                        (function (o) {
                            img.onload = function () {
                                o._handleImageLoad();
                            };
                        })(this);
                    }
                }
            }
            if (data.frames == null) {
            }
            else if (data.frames instanceof Array) {
                this._frames = [];
                a = data.frames;
                for (i = 0, l = a.length; i < l; i++) {
                    var arr = a[i];
                    this._frames.push({ image: this._images[arr[4] ? arr[4] : 0], rect: new Rectangle(arr[0], arr[1], arr[2], arr[3]), regX: arr[5] || 0, regY: arr[6] || 0 });
                }
            }
            else {
                o = data.frames;
                this._frameWidth = o.width;
                this._frameHeight = o.height;
                this._regX = o.regX || 0;
                this._regY = o.regY || 0;
                this._numFrames = o.count;
                if (this._loadCount == 0) {
                    this._calculateFrames();
                }
            }
            this._animations = [];
            if ((o = data.animations) != null) {
                this._data = {};
                var name;
                for (name in o) {
                    var anim = { name: name };
                    var obj = o[name];
                    if (typeof obj == "number") {
                        a = anim.frames = [obj];
                    }
                    else if (obj instanceof Array) {
                        if (obj.length == 1) {
                            anim.frames = [obj[0]];
                        }
                        else {
                            anim.speed = obj[3];
                            anim.next = obj[2];
                            a = anim.frames = [];
                            for (i = obj[0]; i <= obj[1]; i++) {
                                a.push(i);
                            }
                        }
                    }
                    else {
                        anim.speed = obj.speed;
                        anim.next = obj.next;
                        var frames = obj.frames;
                        a = anim.frames = (typeof frames == "number") ? [frames] : frames.slice(0);
                    }
                    if (anim.next === true || anim.next === undefined) {
                        anim.next = name;
                    }
                    if (anim.next === false || (a.length < 2 && anim.next == name)) {
                        anim.next = null;
                    }
                    if (!anim.speed) {
                        anim.speed = 1;
                    }
                    this._animations.push(name);
                    this._data[name] = anim;
                }
            }
        }
        SpriteSheet.prototype.getNumFrames = function (animation) {
            if (animation == null) {
                return this._frames ? this._frames.length : this._numFrames;
            }
            else {
                var data = this._data[animation];
                if (data == null) {
                    return 0;
                }
                else {
                    return data.frames.length;
                }
            }
        };
        SpriteSheet.prototype.getAnimations = function () {
            return this._animations.slice(0);
        };
        SpriteSheet.prototype.getAnimation = function (name) {
            return this._data[name];
        };
        SpriteSheet.prototype.getFrame = function (frameIndex) {
            var frame;
            if (this._frames && (frame = this._frames[frameIndex])) {
                return frame;
            }
            return null;
        };
        SpriteSheet.prototype.getFrameBounds = function (frameIndex, rectangle) {
            var frame = this.getFrame(frameIndex);
            return frame ? (rectangle || new Rectangle(-frame.regX, -frame.regY, frame.rect.width, frame.rect.height)) : null;
        };
        SpriteSheet.prototype.toString = function () {
            return "[SpriteSheet]";
        };
        SpriteSheet.prototype.clone = function () {
            var o = new SpriteSheet();
            o.complete = this.complete;
            o._animations = this._animations;
            o._frames = this._frames;
            o._images = this._images;
            o._data = this._data;
            o._frameHeight = this._frameHeight;
            o._frameWidth = this._frameWidth;
            o._numFrames = this._numFrames;
            o._loadCount = this._loadCount;
            return o;
        };
        SpriteSheet.prototype._handleImageLoad = function () {
            if (--this._loadCount == 0) {
                this._calculateFrames();
                this.complete = true;
                this.dispatchEvent("complete");
            }
        };
        SpriteSheet.prototype._calculateFrames = function () {
            if (this._frames || this._frameWidth == 0) {
                return;
            }
            this._frames = [];
            var ttlFrames = 0;
            var fw = this._frameWidth;
            var fh = this._frameHeight;
            for (var i = 0, imgs = this._images; i < imgs.length; i++) {
                var img = imgs[i];
                var cols = img.width / fw | 0;
                var rows = img.height / fh | 0;
                var ttl = this._numFrames > 0 ? Math.min(this._numFrames - ttlFrames, cols * rows) : cols * rows;
                for (var j = 0; j < ttl; j++) {
                    this._frames.push({
                        image: img,
                        rect: new Rectangle(j % cols * fw, (j / cols | 0) * fh, fw, fh),
                        regX: this._regX,
                        regY: this._regY
                    });
                }
                ttlFrames += ttl;
            }
            this._numFrames = ttlFrames;
        };
        return SpriteSheet;
    })(EventDispatcher);
    return SpriteSheet;
});
