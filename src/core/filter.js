var Model = require('../../lib/jermaine/src/core/model.js');

var FilterOption = require('./filter_option.js');

var utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plot.filter);

var Filter = new Model("Filter", function () {
    this.hasMany("options").eachOfWhich.validatesWith(function (option) {
        return option instanceof FilterOption;
    });
    this.hasA("type").which.validatesWith(function (type) {
        return typeof(type) === "string";
    });

    utilityFunctions.insertDefaults(this, defaultValues.plot.filter, attributes);
});

module.exports = Filter;
