define(["require", "exports"], function (require, exports) {
    var CalculationType;
    (function (CalculationType) {
        CalculationType[CalculationType["UNKOWN"] = 0] = "UNKOWN";
        CalculationType[CalculationType["PERCENT"] = 1] = "PERCENT";
        CalculationType[CalculationType["STATIC"] = 2] = "STATIC";
        CalculationType[CalculationType["CALC"] = 3] = "CALC";
    })(CalculationType || (CalculationType = {}));
});
