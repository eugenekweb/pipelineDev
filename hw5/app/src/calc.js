"use strict";
var Calculator = /** @class */ (function () {
    function Calculator(a, b, operation) {
        var _this = this;
        this._calculation = {
            sum: function () { return _this._a + _this._b; },
            sub: function () { return _this._a - _this._b; },
            mul: function () { return _this._a * _this._b; },
            div: function () {
                var res = _this._a / _this._b;
                if (!Number.isFinite(res)) {
                    return NaN;
                }
                return res;
            },
            pow: function () { return Math.pow(_this._a, _this._b); },
        };
        this._a = this._validate(a);
        this._b = this._validate(b);
        this._operation =
            this._calculation[operation];
        this._result = this._operation();
    }
    Calculator.prototype._recalculate = function () {
        this._result = this._operation();
    };
    Calculator.prototype._validate = function (arg) {
        if (!Number.isSafeInteger(+arg)) {
            return NaN;
        }
        return +arg;
    };
    Object.defineProperty(Calculator.prototype, "result", {
        get: function () {
            this._recalculate();
            return this._result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "a", {
        set: function (value) {
            this._a = this._validate(value);
            this._recalculate();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Calculator.prototype, "b", {
        set: function (value) {
            this._b = this._validate(value);
            this._recalculate();
        },
        enumerable: false,
        configurable: true
    });
    Calculator.prototype.ab = function (val_a, val_b) {
        this._a = this._validate(val_a);
        this._b = this._validate(val_b);
        this._recalculate();
        return this;
    };
    return Calculator;
}());
module.exports = Calculator;
