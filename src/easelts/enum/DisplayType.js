define(["require", "exports"], function (require, exports) {
    /**
     * @enum ValueType
     */
    var DisplayType;
    (function (DisplayType) {
        DisplayType[DisplayType["UNKNOWN"] = 0] = "UNKNOWN";
        DisplayType[DisplayType["STAGE"] = 1] = "STAGE";
        DisplayType[DisplayType["CONTAINER"] = 2] = "CONTAINER";
        DisplayType[DisplayType["DISPLAYOBJECT"] = 3] = "DISPLAYOBJECT";
        DisplayType[DisplayType["SHAPE"] = 4] = "SHAPE";
        DisplayType[DisplayType["GRAPHICS"] = 5] = "GRAPHICS";
        DisplayType[DisplayType["MOVIECLIP"] = 6] = "MOVIECLIP";
        DisplayType[DisplayType["BITMAP"] = 7] = "BITMAP";
        DisplayType[DisplayType["BITMAPVIDEO"] = 8] = "BITMAPVIDEO";
    })(DisplayType || (DisplayType = {}));
    return DisplayType;
});
