/*
 * Scroller
 * http://github.com/zynga/scroller
 *
 * Copyright 2015 Mient-jan Stelling.
 * Copyright 2015 MediaMonks B.V.
 * rewrite to typescript from zynga / scroller
 * Licensed under the MIT License.
 *
 * Copyright 2011, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
 *
 * Based on the work of: Unify Project (unify-project.org)
 * http://unify-project.org
 * Copyright 2011, Deutsche Telekom AG
 * License: MIT + Apache (V2)
 */
define(["require", "exports", "./Animate"], function (require, exports, Animate_1) {
    var easeOutCubic = function (pos) {
        return (Math.pow((pos - 1), 3) + 1);
    };
    var easeInOutCubic = function (pos) {
        if ((pos /= 0.5) < 1) {
            return 0.5 * Math.pow(pos, 3);
        }
        return 0.5 * (Math.pow((pos - 2), 3) + 2);
    };
    var NOOP = function () {
    };
    var Scroller = (function () {
        function Scroller(callback, options) {
            if (options === void 0) { options = {}; }
            this.options = {
                "scrollingX": true,
                "scrollingY": true,
                "animating": true,
                "animationDuration": 250,
                "bouncing": true,
                "locking": true,
                "paging": false,
                "snapping": false,
                "zooming": false,
                "minZoom": 1,
                "maxZoom": 1,
                "speedMultiplier": 1,
                "scrollingComplete": NOOP,
                "penetrationDeceleration": 0.03,
                "penetrationAcceleration": 0.08
            };
            this.__isSingleTouch = false;
            this.__isTracking = false;
            this.__didDecelerationComplete = false;
            this.__isGesturing = false;
            this.__isDragging = false;
            this.__isDecelerating = false;
            this.__isAnimating = false;
            this.__isAnimatingId = -1;
            this.__clientLeft = 0;
            this.__clientTop = 0;
            this.__clientWidth = 0;
            this.__clientHeight = 0;
            this.__contentWidth = 0;
            this.__contentHeight = 0;
            this.__snapWidth = 100;
            this.__snapHeight = 100;
            this.__refreshHeight = null;
            this.__refreshActive = false;
            this.__refreshActivate = null;
            this.__refreshDeactivate = null;
            this.__refreshStart = null;
            this.__zoomLevel = 1;
            this.__scrollLeft = 0;
            this.__scrollTop = 0;
            this.__maxScrollLeft = 0;
            this.__maxScrollTop = 0;
            this.__scheduledLeft = 0;
            this.__scheduledTop = 0;
            this.__scheduledZoom = 0;
            this.__lastTouchLeft = null;
            this.__lastTouchTop = null;
            this.__lastTouchMove = null;
            this.__positions = null;
            this.__minDecelerationScrollLeft = null;
            this.__minDecelerationScrollTop = null;
            this.__maxDecelerationScrollLeft = null;
            this.__maxDecelerationScrollTop = null;
            this.__decelerationVelocityX = null;
            this.__decelerationVelocityY = null;
            this.__callback = callback;
            var key;
            for (key in options) {
                if (options.hasOwnProperty(key)) {
                    this.options[key] = options[key];
                }
            }
        }
        Scroller.prototype.setDimensions = function (clientWidth, clientHeight, contentWidth, contentHeight) {
            var self = this;
            if (clientWidth === +clientWidth) {
                self.__clientWidth = clientWidth;
            }
            if (clientHeight === +clientHeight) {
                self.__clientHeight = clientHeight;
            }
            if (contentWidth === +contentWidth) {
                self.__contentWidth = contentWidth;
            }
            if (contentHeight === +contentHeight) {
                self.__contentHeight = contentHeight;
            }
            self.__computeScrollMax();
            self.scrollTo(self.__scrollLeft, self.__scrollTop, true);
        };
        Scroller.prototype.setPosition = function (left, top) {
            var self = this;
            self.__clientLeft = left || 0;
            self.__clientTop = top || 0;
        };
        Scroller.prototype.setSnapSize = function (width, height) {
            this.__snapWidth = width;
            this.__snapHeight = height;
        };
        Scroller.prototype.activatePullToRefresh = function (height, activateCallback, deactivateCallback, startCallback) {
            var self = this;
            self.__refreshHeight = height;
            self.__refreshActivate = activateCallback;
            self.__refreshDeactivate = deactivateCallback;
            self.__refreshStart = startCallback;
        };
        Scroller.prototype.triggerPullToRefresh = function () {
            this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, true);
            if (this.__refreshStart) {
                this.__refreshStart();
            }
        };
        Scroller.prototype.finishPullToRefresh = function () {
            var self = this;
            self.__refreshActive = false;
            if (self.__refreshDeactivate) {
                self.__refreshDeactivate();
            }
            self.scrollTo(self.__scrollLeft, self.__scrollTop, true);
        };
        Scroller.prototype.getValues = function () {
            var self = this;
            return {
                left: self.__scrollLeft,
                top: self.__scrollTop,
                zoom: self.__zoomLevel
            };
        };
        Scroller.prototype.getScrollMax = function () {
            var self = this;
            return {
                left: self.__maxScrollLeft,
                top: self.__maxScrollTop
            };
        };
        Scroller.prototype.zoomTo = function (level, animate, originLeft, originTop, callback) {
            var self = this;
            if (!self.options.zooming) {
                throw new Error("Zooming is not enabled!");
            }
            if (callback) {
                self.__zoomComplete = callback;
            }
            if (self.__isDecelerating) {
                Animate_1.default.stop(self.__isDecelerating);
                self.__isDecelerating = false;
            }
            var oldLevel = self.__zoomLevel;
            if (originLeft == null) {
                originLeft = self.__clientWidth / 2;
            }
            if (originTop == null) {
                originTop = self.__clientHeight / 2;
            }
            level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);
            self.__computeScrollMax(level);
            var left = ((originLeft + self.__scrollLeft) * level / oldLevel) - originLeft;
            var top = ((originTop + self.__scrollTop) * level / oldLevel) - originTop;
            if (left > self.__maxScrollLeft) {
                left = self.__maxScrollLeft;
            }
            else if (left < 0) {
                left = 0;
            }
            if (top > self.__maxScrollTop) {
                top = self.__maxScrollTop;
            }
            else if (top < 0) {
                top = 0;
            }
            self.__publish(left, top, level, animate);
        };
        Scroller.prototype.zoomBy = function (factor, animate, originLeft, originTop, callback) {
            var self = this;
            self.zoomTo(self.__zoomLevel * factor, animate, originLeft, originTop, callback);
        };
        Scroller.prototype.scrollTo = function (left, top, animate, zoom) {
            var self = this;
            if (self.__isDecelerating) {
                Animate_1.default.stop(self.__isDecelerating);
                self.__isDecelerating = false;
            }
            if (zoom != null && zoom !== self.__zoomLevel) {
                if (!self.options.zooming) {
                    throw new Error("Zooming is not enabled!");
                }
                left *= zoom;
                top *= zoom;
                self.__computeScrollMax(zoom);
            }
            else {
                zoom = self.__zoomLevel;
            }
            if (!self.options.scrollingX) {
                left = self.__scrollLeft;
            }
            else {
                if (self.options.paging) {
                    left = Math.round(left / self.__clientWidth) * self.__clientWidth;
                }
                else if (self.options.snapping) {
                    left = Math.round(left / self.__snapWidth) * self.__snapWidth;
                }
            }
            if (!self.options.scrollingY) {
                top = self.__scrollTop;
            }
            else {
                if (self.options.paging) {
                    top = Math.round(top / self.__clientHeight) * self.__clientHeight;
                }
                else if (self.options.snapping) {
                    top = Math.round(top / self.__snapHeight) * self.__snapHeight;
                }
            }
            left = Math.max(Math.min(self.__maxScrollLeft, left), 0);
            top = Math.max(Math.min(self.__maxScrollTop, top), 0);
            if (left === self.__scrollLeft && top === self.__scrollTop) {
                animate = false;
            }
            self.__publish(left, top, zoom, animate);
        };
        Scroller.prototype.scrollBy = function (left, top, animate) {
            var self = this;
            var startLeft = self.__isAnimating ? self.__scheduledLeft : self.__scrollLeft;
            var startTop = self.__isAnimating ? self.__scheduledTop : self.__scrollTop;
            self.scrollTo(startLeft + (left || 0), startTop + (top || 0), animate);
        };
        Scroller.prototype.doMouseZoom = function (wheelDelta, timeStamp, pageX, pageY) {
            var self = this;
            var change = wheelDelta > 0 ? 0.97 : 1.03;
            return self.zoomTo(self.__zoomLevel * change, false, pageX - self.__clientLeft, pageY - self.__clientTop);
        };
        Scroller.prototype.doTouchStart = function (touches, timeStamp) {
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }
            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }
            var self = this;
            self.__interruptedAnimation = true;
            if (self.__isDecelerating) {
                Animate_1.default.stop(self.__isDecelerating);
                self.__isDecelerating = false;
                self.__interruptedAnimation = true;
            }
            if (self.__isAnimating) {
                Animate_1.default.stop(self.__isAnimatingId);
                self.__isAnimating = false;
                self.__isAnimatingId = -1;
                self.__interruptedAnimation = true;
            }
            var currentTouchLeft, currentTouchTop;
            var isSingleTouch = touches.length === 1;
            if (isSingleTouch) {
                currentTouchLeft = touches[0].pageX;
                currentTouchTop = touches[0].pageY;
            }
            else {
                currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }
            self.__initialTouchLeft = currentTouchLeft;
            self.__initialTouchTop = currentTouchTop;
            self.__zoomLevelStart = self.__zoomLevel;
            self.__lastTouchLeft = currentTouchLeft;
            self.__lastTouchTop = currentTouchTop;
            self.__lastTouchMove = timeStamp;
            self.__lastScale = 1;
            self.__enableScrollX = !isSingleTouch && self.options.scrollingX;
            self.__enableScrollY = !isSingleTouch && self.options.scrollingY;
            self.__isTracking = true;
            self.__didDecelerationComplete = false;
            self.__isDragging = !isSingleTouch;
            self.__isSingleTouch = isSingleTouch;
            self.__positions = [];
        };
        Scroller.prototype.doTouchMove = function (touches, timeStamp, scale) {
            if (scale === void 0) { scale = null; }
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }
            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }
            var self = this;
            if (!self.__isTracking) {
                return;
            }
            var currentTouchLeft, currentTouchTop;
            if (touches.length === 2) {
                currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }
            else {
                currentTouchLeft = touches[0].pageX;
                currentTouchTop = touches[0].pageY;
            }
            var positions = self.__positions;
            if (self.__isDragging) {
                var moveX = currentTouchLeft - self.__lastTouchLeft;
                var moveY = currentTouchTop - self.__lastTouchTop;
                var scrollLeft = self.__scrollLeft;
                var scrollTop = self.__scrollTop;
                var level = self.__zoomLevel;
                if (scale != null && self.options.zooming) {
                    var oldLevel = level;
                    level = level / self.__lastScale * scale;
                    level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);
                    if (oldLevel !== level) {
                        var currentTouchLeftRel = currentTouchLeft - self.__clientLeft;
                        var currentTouchTopRel = currentTouchTop - self.__clientTop;
                        scrollLeft = ((currentTouchLeftRel + scrollLeft) * level / oldLevel) - currentTouchLeftRel;
                        scrollTop = ((currentTouchTopRel + scrollTop) * level / oldLevel) - currentTouchTopRel;
                        self.__computeScrollMax(level);
                    }
                }
                if (self.__enableScrollX) {
                    scrollLeft -= moveX * this.options.speedMultiplier;
                    var maxScrollLeft = self.__maxScrollLeft;
                    if (scrollLeft > maxScrollLeft || scrollLeft < 0) {
                        if (self.options.bouncing) {
                            scrollLeft += (moveX / 2 * this.options.speedMultiplier);
                        }
                        else if (scrollLeft > maxScrollLeft) {
                            scrollLeft = maxScrollLeft;
                        }
                        else {
                            scrollLeft = 0;
                        }
                    }
                }
                if (self.__enableScrollY) {
                    scrollTop -= moveY * this.options.speedMultiplier;
                    var maxScrollTop = self.__maxScrollTop;
                    if (scrollTop > maxScrollTop || scrollTop < 0) {
                        if (self.options.bouncing) {
                            scrollTop += (moveY / 2 * this.options.speedMultiplier);
                            if (!self.__enableScrollX && self.__refreshHeight != null) {
                                if (!self.__refreshActive && scrollTop <= -self.__refreshHeight) {
                                    self.__refreshActive = true;
                                    if (self.__refreshActivate) {
                                        self.__refreshActivate();
                                    }
                                }
                                else if (self.__refreshActive && scrollTop > -self.__refreshHeight) {
                                    self.__refreshActive = false;
                                    if (self.__refreshDeactivate) {
                                        self.__refreshDeactivate();
                                    }
                                }
                            }
                        }
                        else if (scrollTop > maxScrollTop) {
                            scrollTop = maxScrollTop;
                        }
                        else {
                            scrollTop = 0;
                        }
                    }
                }
                if (positions.length > 60) {
                    positions.splice(0, 30);
                }
                positions.push(scrollLeft, scrollTop, timeStamp);
                self.__publish(scrollLeft, scrollTop, level);
            }
            else {
                var minimumTrackingForScroll = self.options.locking ? 3 : 0;
                var minimumTrackingForDrag = 5;
                var distanceX = Math.abs(currentTouchLeft - self.__initialTouchLeft);
                var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);
                self.__enableScrollX = self.options.scrollingX && distanceX >= minimumTrackingForScroll;
                self.__enableScrollY = self.options.scrollingY && distanceY >= minimumTrackingForScroll;
                positions.push(self.__scrollLeft, self.__scrollTop, timeStamp);
                self.__isDragging = (self.__enableScrollX || self.__enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag);
                if (self.__isDragging) {
                    self.__interruptedAnimation = false;
                }
            }
            self.__lastTouchLeft = currentTouchLeft;
            self.__lastTouchTop = currentTouchTop;
            self.__lastTouchMove = timeStamp;
            self.__lastScale = scale;
        };
        Scroller.prototype.doTouchEnd = function (timeStamp) {
            //if(timeStamp instanceof Date)
            //{
            //	timeStamp = timeStamp.valueOf();
            //}
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }
            var self = this;
            if (!self.__isTracking) {
                return;
            }
            self.__isTracking = false;
            if (self.__isDragging) {
                self.__isDragging = false;
                if (self.__isSingleTouch && self.options.animating && (timeStamp - self.__lastTouchMove) <= 100) {
                    var positions = self.__positions;
                    var endPos = positions.length - 1;
                    var startPos = endPos;
                    for (var i = endPos; i > 0 && positions[i] > (self.__lastTouchMove - 100); i -= 3) {
                        startPos = i;
                    }
                    if (startPos !== endPos) {
                        var timeOffset = positions[endPos] - positions[startPos];
                        var movedLeft = self.__scrollLeft - positions[startPos - 2];
                        var movedTop = self.__scrollTop - positions[startPos - 1];
                        self.__decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
                        self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60);
                        var minVelocityToStartDeceleration = self.options.paging || self.options.snapping ? 4 : 1;
                        if (Math.abs(self.__decelerationVelocityX) > minVelocityToStartDeceleration || Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {
                            if (!self.__refreshActive) {
                                self.__startDeceleration(timeStamp);
                            }
                        }
                    }
                    else {
                        self.options.scrollingComplete();
                    }
                }
                else if ((timeStamp - self.__lastTouchMove) > 100) {
                    self.options.scrollingComplete();
                }
            }
            if (!self.__isDecelerating) {
                if (self.__refreshActive && self.__refreshStart) {
                    self.__publish(self.__scrollLeft, -self.__refreshHeight, self.__zoomLevel, true);
                    if (self.__refreshStart) {
                        self.__refreshStart();
                    }
                }
                else {
                    if (self.__interruptedAnimation || self.__isDragging) {
                        self.options.scrollingComplete();
                    }
                    self.scrollTo(self.__scrollLeft, self.__scrollTop, true, self.__zoomLevel);
                    if (self.__refreshActive) {
                        self.__refreshActive = false;
                        if (self.__refreshDeactivate) {
                            self.__refreshDeactivate();
                        }
                    }
                }
            }
            self.__positions.length = 0;
        };
        Scroller.prototype.__publish = function (left, top, zoom, animate) {
            if (animate === void 0) { animate = false; }
            var self = this;
            var wasAnimating = self.__isAnimatingId;
            if (wasAnimating) {
                Animate_1.default.stop(wasAnimating);
                self.__isAnimatingId = -1;
                self.__isAnimating = !!self.__isAnimatingId;
            }
            if (animate && self.options.animating) {
                self.__scheduledLeft = left;
                self.__scheduledTop = top;
                self.__scheduledZoom = zoom;
                var oldLeft = self.__scrollLeft;
                var oldTop = self.__scrollTop;
                var oldZoom = self.__zoomLevel;
                var diffLeft = left - oldLeft;
                var diffTop = top - oldTop;
                var diffZoom = zoom - oldZoom;
                var step = function (percent, now, render) {
                    if (render) {
                        self.__scrollLeft = oldLeft + (diffLeft * percent);
                        self.__scrollTop = oldTop + (diffTop * percent);
                        self.__zoomLevel = oldZoom + (diffZoom * percent);
                        if (self.__callback) {
                            self.__callback(self.__scrollLeft, self.__scrollTop, self.__zoomLevel);
                        }
                    }
                };
                var verify = function (id) {
                    return self.__isAnimatingId === id;
                };
                var completed = function (renderedFramesPerSecond, animationId, wasFinished) {
                    if (animationId === self.__isAnimatingId) {
                        self.__isAnimatingId = -1;
                        self.__isAnimating = !!self.__isAnimatingId;
                    }
                    if (self.__didDecelerationComplete || wasFinished) {
                        self.options.scrollingComplete();
                    }
                    if (self.options.zooming) {
                        self.__computeScrollMax();
                        if (self.__zoomComplete) {
                            self.__zoomComplete();
                            self.__zoomComplete = null;
                        }
                    }
                };
                self.__isAnimatingId = Animate_1.default.start(step, verify, completed, 1000, wasAnimating ? easeOutCubic : easeInOutCubic);
                self.__isAnimating = !!self.__isAnimatingId;
            }
            else {
                self.__scheduledLeft = self.__scrollLeft = left;
                self.__scheduledTop = self.__scrollTop = top;
                self.__scheduledZoom = self.__zoomLevel = zoom;
                if (self.__callback) {
                    self.__callback(left, top, zoom);
                }
                if (self.options.zooming) {
                    self.__computeScrollMax();
                    if (self.__zoomComplete) {
                        self.__zoomComplete();
                        self.__zoomComplete = null;
                    }
                }
            }
        };
        Scroller.prototype.__computeScrollMax = function (zoomLevel) {
            if (zoomLevel === void 0) { zoomLevel = this.__zoomLevel; }
            var self = this;
            self.__maxScrollLeft = Math.max((self.__contentWidth * zoomLevel) - self.__clientWidth, 0);
            self.__maxScrollTop = Math.max((self.__contentHeight * zoomLevel) - self.__clientHeight, 0);
        };
        Scroller.prototype.__startDeceleration = function (timeStamp) {
            var self = this;
            if (self.options.paging) {
                var scrollLeft = Math.max(Math.min(self.__scrollLeft, self.__maxScrollLeft), 0);
                var scrollTop = Math.max(Math.min(self.__scrollTop, self.__maxScrollTop), 0);
                var clientWidth = self.__clientWidth;
                var clientHeight = self.__clientHeight;
                self.__minDecelerationScrollLeft = Math.floor(scrollLeft / clientWidth) * clientWidth;
                self.__minDecelerationScrollTop = Math.floor(scrollTop / clientHeight) * clientHeight;
                self.__maxDecelerationScrollLeft = Math.ceil(scrollLeft / clientWidth) * clientWidth;
                self.__maxDecelerationScrollTop = Math.ceil(scrollTop / clientHeight) * clientHeight;
            }
            else {
                self.__minDecelerationScrollLeft = 0;
                self.__minDecelerationScrollTop = 0;
                self.__maxDecelerationScrollLeft = self.__maxScrollLeft;
                self.__maxDecelerationScrollTop = self.__maxScrollTop;
            }
            var step = function (percent, now, render) {
                self.__stepThroughDeceleration(render);
            };
            var minVelocityToKeepDecelerating = self.options.snapping ? 4 : 0.1;
            var verify = function () {
                var shouldContinue = Math.abs(self.__decelerationVelocityX) >= minVelocityToKeepDecelerating || Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
                if (!shouldContinue) {
                    self.__didDecelerationComplete = true;
                }
                return shouldContinue;
            };
            var completed = function (renderedFramesPerSecond, animationId, wasFinished) {
                self.__isDecelerating = false;
                if (self.__didDecelerationComplete) {
                    self.options.scrollingComplete();
                }
                self.scrollTo(self.__scrollLeft, self.__scrollTop, self.options.snapping);
            };
            self.__isDecelerating = !!Animate_1.default.start(step, verify, completed);
        };
        Scroller.prototype.__stepThroughDeceleration = function (render) {
            var self = this;
            var scrollLeft = self.__scrollLeft + self.__decelerationVelocityX;
            var scrollTop = self.__scrollTop + self.__decelerationVelocityY;
            if (!self.options.bouncing) {
                var scrollLeftFixed = Math.max(Math.min(self.__maxDecelerationScrollLeft, scrollLeft), self.__minDecelerationScrollLeft);
                if (scrollLeftFixed !== scrollLeft) {
                    scrollLeft = scrollLeftFixed;
                    self.__decelerationVelocityX = 0;
                }
                var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
                if (scrollTopFixed !== scrollTop) {
                    scrollTop = scrollTopFixed;
                    self.__decelerationVelocityY = 0;
                }
            }
            if (render) {
                self.__publish(scrollLeft, scrollTop, self.__zoomLevel);
            }
            else {
                self.__scrollLeft = scrollLeft;
                self.__scrollTop = scrollTop;
            }
            if (!self.options.paging) {
                var frictionFactor = 0.95;
                self.__decelerationVelocityX *= frictionFactor;
                self.__decelerationVelocityY *= frictionFactor;
            }
            if (self.options.bouncing) {
                var scrollOutsideX = 0;
                var scrollOutsideY = 0;
                var penetrationDeceleration = self.options.penetrationDeceleration;
                var penetrationAcceleration = self.options.penetrationAcceleration;
                if (scrollLeft < self.__minDecelerationScrollLeft) {
                    scrollOutsideX = self.__minDecelerationScrollLeft - scrollLeft;
                }
                else if (scrollLeft > self.__maxDecelerationScrollLeft) {
                    scrollOutsideX = self.__maxDecelerationScrollLeft - scrollLeft;
                }
                if (scrollTop < self.__minDecelerationScrollTop) {
                    scrollOutsideY = self.__minDecelerationScrollTop - scrollTop;
                }
                else if (scrollTop > self.__maxDecelerationScrollTop) {
                    scrollOutsideY = self.__maxDecelerationScrollTop - scrollTop;
                }
                if (scrollOutsideX !== 0) {
                    if (scrollOutsideX * self.__decelerationVelocityX <= 0) {
                        self.__decelerationVelocityX += scrollOutsideX * penetrationDeceleration;
                    }
                    else {
                        self.__decelerationVelocityX = scrollOutsideX * penetrationAcceleration;
                    }
                }
                if (scrollOutsideY !== 0) {
                    if (scrollOutsideY * self.__decelerationVelocityY <= 0) {
                        self.__decelerationVelocityY += scrollOutsideY * penetrationDeceleration;
                    }
                    else {
                        self.__decelerationVelocityY = scrollOutsideY * penetrationAcceleration;
                    }
                }
            }
        };
        return Scroller;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Scroller;
});
