var jermaine = require('../../lib/jermaine/src/jermaine.js');

var utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plot.datatips.variable);

var DatatipsVariable = new jermaine.Model("DatatipsVariable", function () {
    this.hasA("format").which.validatesWith(function (format) {
        return typeof(format) === "string";
    });

    utilityFunctions.insertDefaults(this, defaultValues.plot.datatips.variable, attributes);
});

module.exports = DatatipsVariable;
