if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["border", "bordercolor"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Plotarea[parse] = function (xml) {
            var plotarea = new nsObj.Plotarea();
            if (xml) {
                plotarea.margin().bottom(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("marginbottom")));
                plotarea.margin().left(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("marginleft")));
                plotarea.margin().top(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("margintop")));
                plotarea.margin().right(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("marginright")));
                plotarea.border(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("border")));
                plotarea.bordercolor(xml.attr("bordercolor"));
            }
            return plotarea;
        };
        
        nsObj.Plotarea.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<plotarea ',
                i;

            attributeStrings.push('margintop="' + this.margin().top() + '"');
            attributeStrings.push('marginleft="' + this.margin().left() + '"');
            attributeStrings.push('marginbottom="' + this.margin().bottom() + '"');
            attributeStrings.push('marginright="' + this.margin().right() + '"');

            for(i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    attributeStrings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
            }

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
