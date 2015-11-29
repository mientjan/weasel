/*
 * BitmapFont
 *
 * Copyright (c) 2014 Vikram Kumar ( https://github.com/vikramarka )
 * Copyright (c) 2014-2015 Mient-jan Stelling. ( https://github.com/mientjan )
 * Copyright (c) 2015 mediamonks.com
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
define(["require", "exports", "./SpriteSheet", "./Sprite", "./bitmapfont/BitmapChar", "./bitmapfont/CharLocation", "./bitmapfont/VAlign", "./bitmapfont/HAlign", "./Container"], function (require, exports, SpriteSheet_1, Sprite_1, BitmapChar_1, CharLocation_1, VAlign_1, HAlign_1, Container_1) {
    var BitmapFont = (function () {
        function BitmapFont(texture, fontXML, size, _scaleFactor) {
            if (_scaleFactor === void 0) { _scaleFactor = 1; }
            this._scaleFactor = _scaleFactor;
            this.mCharLocationPool = [];
            this.textWidth = 0;
            this.textHeight = 0;
            this.previousWidth = [];
            this._container = null;
            this.hasParsedFontXml = false;
            this.hasCalledCreateSpriteSheet = false;
            this.createSpriteBuffer = [];
            this.mName = 'unknown';
            this.mLineHeight = this.mSize = this.mBaseLine = size * this._scaleFactor;
            this.texture = texture;
            this.chars = [];
            this.mCharLocationPool = [];
            this.textWidth = 0;
            this.textHeight = 0;
            this.previousWidth = [];
            if (fontXML) {
                this.parseFontXml(fontXML);
            }
        }
        BitmapFont.prototype.parseFontXml = function (fontXML) {
            this.hasParsedFontXml = true;
            var charecters = fontXML.childNodes[0].getElementsByTagName('chars')[0].getElementsByTagName('char');
            var arrFrames = [];
            var animations = {};
            var id;
            var allChars = [];
            var allKernings = [];
            for (var i = 0; i < charecters.length; i++) {
                var obj = {};
                obj.id = charecters[i].getAttribute('id');
                id = charecters[i].getAttribute('id');
                obj.x = charecters[i].getAttribute('x') * this._scaleFactor;
                obj.y = charecters[i].getAttribute('y') * this._scaleFactor;
                obj.xAdvance = charecters[i].getAttribute('xadvance') * this._scaleFactor;
                obj.xOffset = charecters[i].getAttribute('xoffset') * this._scaleFactor;
                obj.yOffset = charecters[i].getAttribute('yoffset') * this._scaleFactor;
                obj.width = charecters[i].getAttribute('width') * this._scaleFactor;
                obj.height = charecters[i].getAttribute('height') * this._scaleFactor;
                var arr = [
                    obj.x,
                    obj.y,
                    obj.width,
                    obj.height
                ];
                arrFrames.push(arr);
                animations["frame" + i] = [i];
                allChars.push(obj);
            }
            var spriteSheet = new SpriteSheet_1.default({
                images: [this.texture],
                frames: arrFrames,
                animations: animations
            });
            for (var k = 0; k < allChars.length; k++) {
                var texture = new Sprite_1.default(spriteSheet);
                texture.gotoAndStop(k);
                texture.x = Math.random() * 800;
                texture.y = 100;
                var bitmapChar = new BitmapChar_1.default(allChars[k].id, texture, allChars[k].xOffset, allChars[k].yOffset, allChars[k].xAdvance);
                this.addChar(allChars[k].id, bitmapChar);
            }
            if (fontXML.childNodes[0].getElementsByTagName('kernings')[0] != null) {
                var kernings = fontXML.childNodes[0].getElementsByTagName('kernings')[0].getElementsByTagName('kerning');
                for (var j = 0; j < kernings.length; j++) {
                    var obj = {};
                    obj.first = kernings[j].getAttribute('first');
                    obj.second = kernings[j].getAttribute('second');
                    obj.amount = kernings[j].getAttribute('amount');
                    allKernings.push(obj);
                    if (obj.second in this.chars) {
                        this.getChar(obj.second).addKerning(obj.first, obj.amount);
                    }
                }
            }
            if (this.createSpriteBuffer.length > 0) {
                for (var i = 0; i < this.createSpriteBuffer.length; i++) {
                    var buffer = this.createSpriteBuffer[i];
                    this._container = buffer.container;
                    this.createSprite.apply(this, buffer.arguments);
                }
                this.createSpriteBuffer.length = 0;
            }
        };
        BitmapFont.prototype.getChar = function (charId) {
            return this.chars[charId];
        };
        BitmapFont.prototype.addChar = function (charId, bitmapChar) {
            this.chars[charId] = bitmapChar;
        };
        BitmapFont.prototype.createSprite = function (width, height, text, fontSize, horizantalLetterSpacing, verticalLetterSpacing, hAlign, vAlign, autoScale, kerning) {
            if (fontSize === void 0) { fontSize = -1; }
            if (horizantalLetterSpacing === void 0) { horizantalLetterSpacing = 1; }
            if (verticalLetterSpacing === void 0) { verticalLetterSpacing = 1; }
            if (hAlign === void 0) { hAlign = HAlign_1.default.CENTER; }
            if (vAlign === void 0) { vAlign = VAlign_1.default.CENTER; }
            if (autoScale === void 0) { autoScale = true; }
            if (kerning === void 0) { kerning = true; }
            var container = null;
            if (this.hasParsedFontXml) {
                var charLocations = this.arrangeChars(width, height, text, fontSize, hAlign, vAlign, autoScale, kerning, horizantalLetterSpacing, verticalLetterSpacing);
                var numChars = charLocations.length;
                if (this._container) {
                    container = this._container;
                    this._container = null;
                }
                else {
                    container = new Container_1.default;
                }
                for (var i = 0; i < numChars; i++) {
                    var charLocation = charLocations[i];
                    var char = charLocation.char.createImage();
                    char.x = charLocation.x;
                    char.y = charLocation.y;
                    char.scaleX = char.scaleY = charLocation.scale;
                    container.addChild(char);
                    var charHeight = charLocation.char.getHeight() * charLocation.scale;
                    if (charHeight > this.textHeight) {
                        this.textHeight = charHeight;
                    }
                }
            }
            else {
                container = new Container_1.default();
                var buffer = {
                    container: container,
                    arguments: []
                };
                for (var i = 0; i < arguments.length; i++) {
                    buffer.arguments.push(arguments[i]);
                }
                this.createSpriteBuffer.push(buffer);
            }
            return container;
        };
        BitmapFont.prototype.arrangeChars = function (width, height, text, fontSize, hAlign, vAlign, autoScale, kerning, horizantalLetterSpacing, verticalLetterSpacing) {
            if (text === void 0) { text = ''; }
            if (fontSize === void 0) { fontSize = -1; }
            if (hAlign === void 0) { hAlign = HAlign_1.default.CENTER; }
            if (vAlign === void 0) { vAlign = VAlign_1.default.CENTER; }
            if (autoScale === void 0) { autoScale = true; }
            if (kerning === void 0) { kerning = true; }
            if (horizantalLetterSpacing === void 0) { horizantalLetterSpacing = 1; }
            if (verticalLetterSpacing === void 0) { verticalLetterSpacing = 1; }
            if (text == null || text.length == 0) {
                return [];
            }
            if (fontSize < 0) {
                fontSize *= -this.mSize;
            }
            var lines = [[]];
            var finished = false;
            var charLocation = new CharLocation_1.default(null);
            var numChars = 0;
            var containerWidth = 0;
            var containerHeight = 0;
            var scale = 0;
            while (!finished) {
                scale = fontSize / this.mSize;
                containerWidth = width / scale;
                containerHeight = height / scale;
                lines = [];
                lines.push([]);
                if (this.mLineHeight <= containerHeight) {
                    var lastWhiteSpace = -1;
                    var lastCharID = -1;
                    var currentX = 0;
                    var currentY = 0;
                    var currentLine = [];
                    numChars = text.length;
                    for (var i = 0; i < numChars; ++i) {
                        var lineFull = false;
                        var charID = text.charCodeAt(i);
                        var char = this.getChar(charID);
                        if (charID == BitmapFont.CHAR_NEWLINE || charID == BitmapFont.CHAR_CARRIAGE_RETURN) {
                            lineFull = true;
                        }
                        else if (char == null) {
                            console.log("[BitmapFont] Missing character: " + charID + " (" + String.fromCharCode(charID) + ") (" + text + ")");
                        }
                        else {
                            if (charID == BitmapFont.CHAR_SPACE || charID == BitmapFont.CHAR_TAB) {
                                lastWhiteSpace = i;
                            }
                            if (kerning) {
                                currentX = char.getKerning(lastCharID) / 1 + currentX / 1;
                            }
                            var charLocation = new CharLocation_1.default(char);
                            charLocation.char = char;
                            charLocation.x = currentX / 1 + char.getXOffset() / 1;
                            charLocation.y = currentY / 1 + char.getYOffset() / 1;
                            currentLine.push(charLocation);
                            currentX += char.getXAdvance() / 1;
                            lastCharID = charID;
                            if (charLocation.x + Number(char.getWidth()) > containerWidth) {
                                var numCharsToRemove = lastWhiteSpace == -1 ? 1 : i - lastWhiteSpace;
                                var removeIndex = currentLine.length - numCharsToRemove;
                                currentLine.splice(removeIndex, numCharsToRemove);
                                if (currentLine.length == 0) {
                                    break;
                                }
                                i -= numCharsToRemove;
                                lineFull = true;
                            }
                        }
                        if (i == numChars - 1) {
                            lines.push(currentLine);
                            finished = true;
                        }
                        else if (lineFull) {
                            lines.push(currentLine);
                            if (lastWhiteSpace == i) {
                                currentLine.pop();
                            }
                            if (currentY + 2 * this.mLineHeight <= containerHeight) {
                                currentLine = [];
                                currentX = 0;
                                currentY += this.mLineHeight;
                                lastWhiteSpace = -1;
                                lastCharID = -1;
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
                if (autoScale && !finished) {
                    fontSize -= 1;
                    lines.length = 0;
                }
                else {
                    finished = true;
                }
            }
            var finalLocations = [];
            var numLines = lines.length;
            var bottom = currentY + this.mLineHeight;
            var yOffset = 0;
            if (vAlign == VAlign_1.default.BOTTOM) {
                yOffset = containerHeight - bottom;
            }
            else if (vAlign == VAlign_1.default.CENTER) {
                yOffset = (containerHeight - bottom) / 2;
            }
            this.previousWidth = [];
            for (var lineID = 0; lineID < numLines; ++lineID) {
                var line = lines[lineID];
                numChars = line.length;
                if (numChars == 0) {
                    continue;
                }
                var xOffset = 0;
                var lastLocation = line[line.length - 1];
                var right = lastLocation.x - (lastLocation.char.getXOffset() / 1) + (lastLocation.char.getXAdvance() / 1);
                console.log(horizantalLetterSpacing);
                right += numChars * horizantalLetterSpacing;
                if (hAlign == HAlign_1.default.RIGHT) {
                    xOffset = containerWidth - right;
                }
                else if (hAlign == HAlign_1.default.CENTER) {
                    xOffset = (containerWidth - right) / 2;
                }
                this.width = 0;
                for (var c = 0; c < numChars; ++c) {
                    var charLocation = line[c];
                    var lineIndex = (lineID - 1);
                    this.width += charLocation.char.getXAdvance() / 1 + charLocation.char.getXOffset() / 1 + 1;
                    charLocation.x = scale * (charLocation.x + xOffset + (c * horizantalLetterSpacing));
                    charLocation.y = scale * (charLocation.y + yOffset + (lineIndex * verticalLetterSpacing));
                    charLocation.scale = scale;
                    if (charLocation.char.getWidth() > 0 && charLocation.char.getHeight() > 0) {
                        finalLocations.push(charLocation);
                    }
                    this.mCharLocationPool.push(charLocation);
                }
                this.previousWidth.push(this.width);
            }
            this.width = this.previousWidth[0];
            for (var i = 1; i < this.previousWidth.length; i++) {
                if (this.previousWidth[i] > this.width) {
                    this.width = this.previousWidth[i];
                }
            }
            return finalLocations;
        };
        BitmapFont.prototype.getName = function () {
            return this.mName;
        };
        BitmapFont.prototype.getSize = function () {
            return this.mSize;
        };
        BitmapFont.prototype.getLineHeight = function () {
            return this.mLineHeight;
        };
        BitmapFont.prototype.setLineHeight = function (value) {
            this.mLineHeight = value;
        };
        BitmapFont.prototype.getBaseLine = function () {
            return this.mBaseLine;
        };
        BitmapFont.prototype.getWidth = function () {
            return this.width;
        };
        BitmapFont.prototype.getHeight = function () {
            return this.textHeight;
        };
        BitmapFont.NATIVE_SIZE = -1;
        BitmapFont.MINI = "mini";
        BitmapFont.CHAR_SPACE = 32;
        BitmapFont.CHAR_TAB = 9;
        BitmapFont.CHAR_NEWLINE = 10;
        BitmapFont.CHAR_CARRIAGE_RETURN = 13;
        return BitmapFont;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = BitmapFont;
});
