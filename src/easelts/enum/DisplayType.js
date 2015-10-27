define(["require", "exports"], function (require, exports) {
    var DisplayType;
    (function (DisplayType) {
        DisplayType[DisplayType["UNKNOWN"] = 1] = "UNKNOWN";
        DisplayType[DisplayType["STAGE"] = 2] = "STAGE";
        DisplayType[DisplayType["CONTAINER"] = 4] = "CONTAINER";
        DisplayType[DisplayType["DISPLAYOBJECT"] = 8] = "DISPLAYOBJECT";
        DisplayType[DisplayType["SHAPE"] = 16] = "SHAPE";
        DisplayType[DisplayType["GRAPHICS"] = 32] = "GRAPHICS";
        DisplayType[DisplayType["MOVIECLIP"] = 64] = "MOVIECLIP";
        DisplayType[DisplayType["BITMAP"] = 128] = "BITMAP";
        DisplayType[DisplayType["SPRITESHEET"] = 256] = "SPRITESHEET";
        DisplayType[DisplayType["BITMAPVIDEO"] = 512] = "BITMAPVIDEO";
        DisplayType[DisplayType["BITMAPTEXT"] = 1024] = "BITMAPTEXT";
        DisplayType[DisplayType["TEXTURE"] = 2048] = "TEXTURE";
    })(DisplayType || (DisplayType = {}));
});
