if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["color", "visible"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Axis.Grid[parse] = function (xml) {
            var grid = new nsObj.Axis.Grid();
            if (xml) {
                grid.color(xml.attr("color"));
                grid.visible(xml.attr("visible"));
            }
            return grid;
        };
        
        nsObj.Axis.Grid.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<grid ',
                i;

            for (i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    attributeStrings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
            }

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
