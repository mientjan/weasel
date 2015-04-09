define(["require", "exports", './FluidCalculation', '../enum/CalculationType'], function (require, exports, FluidCalculation, CalculationType) {
    /**
     * @todo add more unit types
     * @class ValueCalculation
     * @author Mient-jan Stelling
     */
    var ValueCalculation = (function () {
        function ValueCalculation(value) {
            this.type = CalculationType.UNKOWN;
            this._value_percent = 0;
            /**
             * @property _value_calc
             * @type {Array<FluidMeasurementsUnit|CalculationUnitType>}
             * @protected
             */
            this._value_calc = null;
            this.set(value);
        }
        /**
         * @method determineCalculationType
         * @param {number|string} value
         * @returns {CalculationType}
         */
        ValueCalculation.prototype.determineCalculationType = function (value) {
            var subValue = value;
            var result = CalculationType.STATIC;
            if (typeof subValue == 'string') {
                if (subValue.substr(-1) == '%') {
                    result = CalculationType.PERCENT;
                }
                else {
                    result = CalculationType.CALC;
                }
            }
            return result;
        };
        /**
         * @method get
         * @param {number} relativeValue
         * @returns {number}
         */
        ValueCalculation.prototype.get = function (relativeValue) {
            var value = 0;
            var scopeValue = relativeValue;
            if (this.type == CalculationType.PERCENT) {
                value = this._value * scopeValue;
            }
            else if (this.type == CalculationType.CALC) {
                value = FluidCalculation.calcUnit(scopeValue, this._value_calc);
            }
            else if (this.type == CalculationType.STATIC) {
                value = this._value;
            }
            return value;
        };
        /**
         *
         * @param value
         */
        ValueCalculation.prototype.set = function (value) {
            var numberValue = value;
            var stringValue = value;
            this.type = this.determineCalculationType(value);
            if (this.type == CalculationType.PERCENT) {
                this._value_percent = parseFloat(stringValue.substr(0, stringValue.length - 1)) / 100;
            }
            else if (this.type == CalculationType.CALC) {
                this._value_calc = FluidCalculation.dissolveCalcElements(stringValue);
            }
            else if (this.type == CalculationType.STATIC) {
                this._value = numberValue;
            }
        };
        return ValueCalculation;
    })();
    return ValueCalculation;
});
