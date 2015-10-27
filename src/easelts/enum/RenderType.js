define(["require", "exports"], function (require, exports) {
    var RenderType;
    (function (RenderType) {
        RenderType[RenderType["UNKNOWN"] = 0] = "UNKNOWN";
        RenderType[RenderType["CANVAS"] = 1] = "CANVAS";
        RenderType[RenderType["WEBGL"] = 2] = "WEBGL";
    })(RenderType || (RenderType = {}));
});
