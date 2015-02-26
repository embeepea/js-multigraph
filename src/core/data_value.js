var NumberValue = require('./number_value.js'),
    DatetimeValue = require('./datetime_value.js');

/*
 * DataValue is a POJSO (plain old javascript object) that simply
 * serves as an ecapsulation for several generic
 * data-value-related constants and functions.  There is no actual
 * DataValue model that can be instantiated; all data values are
 * instances of either the NumberValue or DatetimeValue model.
 */

var DataValue = {};

DataValue.NUMBER = "number";
DataValue.DATETIME = "datetime";
DataValue.UNKNOWN = "unknown";

/*
 * Return a list of the type constants above
 */
DataValue.types = function () {
    return [ DataValue.NUMBER, DataValue.DATETIME, DataValue.UNKNOWN ];
};

/*
 * Create a new DataValue subtype of a given type by parsing a string
 */
DataValue.parseType = function (string) {
    if (string.toLowerCase() === DataValue.NUMBER) { return DataValue.NUMBER; }
    if (string.toLowerCase() === DataValue.DATETIME) { return DataValue.DATETIME; }
    throw new Error("unknown DataValue type: " + string);
};

/*
 * This function converts a "type" enum object to a string.  In reality, the objects ARE
 * the strings, so we just return the object.
 */
DataValue.serializeType = function (type) {
    return type;
};

/*
 * Return true or false depending on whether obj is an instance of a DataValue type
 */
DataValue.isInstance = function (obj) {
    return (obj && (typeof(obj.getRealValue) === "function") && (typeof(obj.compareTo) === "function"));
};

/*
 * Same as DataValue.isInstance, but also allows the null value
 */
DataValue.isInstanceOrNull = function (obj) {
    return ((obj===null) || DataValue.isInstance(obj));
};

/*
 * Create a new DataValue subtype of a given type from a real value
 */
DataValue.create = function (type, realValue) {
    if (type === DataValue.NUMBER) {
        return new NumberValue(realValue);
    } else if (type === DataValue.DATETIME) {
        return new DatetimeValue(realValue);
    }
    throw new Error("attempt to parse an unknown DataValue type");
};

/*
 * Create a new DataValue subtype of a given type by parsing a string
 */
DataValue.parse = function (type, string) {
    if (type === DataValue.NUMBER) {
        return NumberValue.parse(string);
    } else if (type === DataValue.DATETIME) {
        return DatetimeValue.parse(string);
    }
    throw new Error("attempt to parse an unknown DataValue type");
};

/*
 * Enum values for comparison operators.  These should be lowercase strings --- they're used as
 * actual method names below.
 */
DataValue.LT = "lt";
DataValue.LE = "le";
DataValue.EQ = "eq";
DataValue.GE = "ge";
DataValue.GT = "gt";
DataValue.NE = "ne";

var comparatorFuncs = {};
comparatorFuncs[DataValue.LT] = function (x) { return this.compareTo(x)   < 0; };
comparatorFuncs[DataValue.LE] = function (x) { return this.compareTo(x)  <= 0; };
comparatorFuncs[DataValue.EQ] = function (x) { return this.compareTo(x) === 0; };
comparatorFuncs[DataValue.GE] = function (x) { return this.compareTo(x)  >= 0; };
comparatorFuncs[DataValue.GT] = function (x) { return this.compareTo(x)   > 0; };
comparatorFuncs[DataValue.NE] = function (x) { return this.compareTo(x) !== 0; };

/*
 * Mix the 5 comparator function into another object:
 */
DataValue.mixinComparators = function (obj) {
    obj[DataValue.LT] = comparatorFuncs[DataValue.LT];
    obj[DataValue.LE] = comparatorFuncs[DataValue.LE];
    obj[DataValue.EQ] = comparatorFuncs[DataValue.EQ];
    obj[DataValue.GE] = comparatorFuncs[DataValue.GE];
    obj[DataValue.GT] = comparatorFuncs[DataValue.GT];
    obj[DataValue.NE] = comparatorFuncs[DataValue.NE];
};

/*
 * The comparators function returns a list of the 5 comparator
 * functions, to be used like an enum type.
 */
DataValue.comparators = function () {
    return [ DataValue.LT, DataValue.LE, DataValue.EQ, DataValue.GE, DataValue.GT, DataValue.NE ];
};

/*
 * Convert a string to a comparator enum object:
 */
DataValue.parseComparator = function (string) {
    if (typeof(string) === "string") {
        switch (string.toLowerCase()) {
        case "lt": return DataValue.LT;
        case "le": return DataValue.LE;
        case "eq": return DataValue.EQ;
        case "ge": return DataValue.GE;
        case "gt": return DataValue.GT;
        case "ne": return DataValue.NE;
        }
    }
    throw new Error(string + " should be one of 'lt', 'le', 'eq', 'ge', 'gt', 'ne'.");
};

module.exports = DataValue;
