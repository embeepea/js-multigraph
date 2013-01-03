window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Background,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.background);

    Background = new window.jermaine.Model("Background", function () {
        this.hasA("color").which.validatesWith(function (color) {
            return color instanceof window.multigraph.math.RGBColor;
        }).defaultsTo(window.multigraph.math.RGBColor.parse(defaultValues.background.color));
        this.hasA("img").which.validatesWith(function (img) {
            return img instanceof ns.Img;
        });
    });

    ns.Background = Background;

});
