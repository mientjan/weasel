define(["require", "exports", "./FluidMeasurementsUnit", "../enum/MeasurementUnitType"], function (require, exports, FluidMeasurementsUnit_1, MeasurementUnitType_1) {
    var FluidCalculation = (function () {
        function FluidCalculation() {
        }
        FluidCalculation.dissolveCalcElements = function (statement) {
            statement = statement.replace('*', ' * ').replace('/', ' / ');
            var arr = statement.split(FluidCalculation._spaceSplit);
            var calculationElements = [];
            for (var i = 0; i < arr.length; i++) {
                var d = FluidCalculation.dissolveElement(arr[i]);
                calculationElements.push(d);
            }
            return calculationElements;
        };
        FluidCalculation.dissolveElement = function (val) {
            var index = FluidCalculation._calculationUnitypeString.indexOf(val);
            if (index >= 0) {
                return FluidCalculation._calculationUnitType[index];
            }
            var unit;
            var match = FluidCalculation._valueUnitDisolvement.exec(val);
            var mesUnitTypeString = match.length >= 3 ? match[2] : MeasurementUnitType_1.default[MeasurementUnitType_1.default.PIXEL];
            var mesUnitType = FluidCalculation._measurementUnitTypeString.indexOf(mesUnitTypeString);
            if (match) {
                var v = match.length >= 2 ? match[1] : match[0];
                unit = new FluidMeasurementsUnit_1.default(FluidCalculation.toFloat(v), mesUnitType);
            }
            else {
                unit = new FluidMeasurementsUnit_1.default(FluidCalculation.toFloat(val), mesUnitType);
            }
            return unit;
        };
        FluidCalculation.calcUnit = function (size, data) {
            var sizea = FluidCalculation.getCalcUnitSize(size, data[0]);
            for (var i = 2, l = data.length; i < l; i = i + 2) {
                sizea = FluidCalculation.getCalcUnit(sizea, data[i - 1], FluidCalculation.getCalcUnitSize(size, data[i]));
            }
            return sizea;
        };
        FluidCalculation.getCalcUnit = function (unit1, math, unit2) {
            switch (math) {
                case 0:
                    {
                        return unit1 + unit2;
                        break;
                    }
                case 1:
                    {
                        return unit1 - unit2;
                        break;
                    }
                case 2:
                    {
                        return unit1 * unit2;
                        break;
                    }
                case 3:
                    {
                        return unit1 / unit2;
                        break;
                    }
                default:
                    {
                        return 0;
                        break;
                    }
            }
        };
        FluidCalculation.getCalculationTypeByValue = function (value) {
            if (typeof (value) == 'string') {
                if (value.substr(-1) == '%') {
                    return 1;
                }
                else {
                    return 3;
                }
            }
            return 2;
        };
        FluidCalculation.getPercentageParcedValue = function (value) {
            return parseFloat(value.substr(0, value.length - 1)) / 100;
        };
        FluidCalculation.getCalcUnitSize = function (size, data) {
            switch (data.unit) {
                case MeasurementUnitType_1.default.PROCENT:
                    {
                        return size * (data.value / 100);
                        break;
                    }
                default:
                    {
                        return data.value;
                        break;
                    }
            }
        };
        FluidCalculation.toFloat = function (value) {
            return parseFloat(value) || 0.0;
        };
        FluidCalculation._calculationUnitType = [
            0,
            1,
            2,
            3
        ];
        FluidCalculation._measurementUnitTypeString = [
            '%', 'px', 'pt', 'in', 'cm', 'mm', 'vw', 'vh'
        ];
        FluidCalculation._calculationUnitypeString = '+-*/';
        FluidCalculation._valueUnitDisolvement = /([\+\-]?[0-9\.]+)(%|px|pt|in|cm|mm|vw|vh)?/;
        FluidCalculation._spaceSplit = /\s+/;
        return FluidCalculation;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = FluidCalculation;
});
