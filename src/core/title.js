var Model = require('../../lib/jermaine/src/core/model.js');

var Text = require('./text.js'),
    RGBColor = require('../math/rgb_color.js'),
    Point = require('../math/point.js'),
    utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.title);

/**
 * Title is a Jermiane model that controls Graph Titles.
 *
 * @class Title
 * @for Title
 * @constructor
 * @param {Text} text
 * @param {Graph} graph
 * @author jrfrimme
 */
var Title = new Model("GraphTitle", function () {
    /**
     * Pointer to the Title's parent Graph Jermaine model.
     *
     * @property graph
     * @type {Graph}
     * @author jrfrimme
     */
    this.hasA("graph").which.validatesWith(function (graph) {
        var Graph = require('./graph.js');
        return graph instanceof Graph;
    });
    /**
     * The text of the title.
     *
     * @property text
     * @type {Text}
     * @author jrfrimme
     */
    this.hasA("text").which.validatesWith(function (text) {
        return text instanceof Text;
    });
    /**
     * Determines if the Title is positioned relative to the Graphs `plot` or `padding`
     * box.
     *
     * @property frame
     * @type {String}
     * @author jrfrimme
     */
    this.hasA("frame").which.isA("string");
    /**
     * The width of the border to be drawn around the title in pixel; use a value of `0`
     * to not draw a border.
     *
     * @property border
     * @type {Integer}
     * @author jrfrimme
     */
    this.hasA("border").which.isAn("integer");
    /**
     * Background color for the Title's region.
     *
     * @property color
     * @type {RGBColor}
     * @author jrfrimme
     */
    this.hasA("color").which.validatesWith(function (color) {
        return color instanceof RGBColor;
    });
    /**
     * Color for the Title's border.
     *
     * @property bordercolor
     * @type {RGBColor}
     * @author jrfrimme
     */
    this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
        return bordercolor instanceof RGBColor;
    });
    /**
     * Opacity of the Title's region.
     *
     * @property opacity
     * @type {Number}
     * @author jrfrimme
     */
    this.hasA("opacity").which.isA("number");
    /**
     * The width of the padding between the Title's text and its border in pixels; use a
     * value of `0` to not draw the padding.
     *
     * @property padding
     * @type {Integer}
     * @author jrfrimme
     */
    this.hasA("padding").which.isAn("integer");
    /**
     * Determines whether the corners of the title appear rounded. If cornerradius is 0,
     * which is the default, the corners are drawn square. If cornerradius > 0, then the
     * corners are rounded off using circles whose radius is cornerradius pixels.
     *
     * @property cornerradius
     * @deprecated
     * @type {Integer}
     * @author jrfrimme
     */
    this.hasA("cornerradius").which.isAn("integer");
    /**
     * A coordinate pair which gives the relative location of the Title's anchor point.
     *
     * @property anchor
     * @type {Point}
     * @author jrfrimme
     */
    this.hasA("anchor").which.validatesWith(function (anchor) {
        return anchor instanceof Point;
    });
    /**
     * A coordinate pair which gives the location of the Title's base point, relative to
     * its Graph's plot or padding box - determined by the `frame` attribute.
     *
     * @property base
     * @type {Point}
     * @author jrfrimme
     */
    this.hasA("base").which.validatesWith(function (base) {
        return base instanceof Point;
    });
    /**
     * A coordinate pair of pixel offsets for the base point.
     *
     * @property position
     * @type {Point}
     * @author jrfrimme
     */
    this.hasA("position").which.validatesWith(function (position) {
        return position instanceof Point;
    });
    /**
     * The font-size of the title. Currently is a constant.
     *
     * @property font-size
     * @type {String}
     * @author jrfrimme
     */
    this.hasA("fontSize").which.isA("string").and.defaultsTo("18px");

    /**
     * Determines the geometry of the Title's text.
     *
     * @method initializeGeometry
     * @chainable
     * @param {Object} graphicsContext
     * @author jrfrimme
     */
    this.respondsTo("initializeGeometry", function (graphicsContext) {
        graphicsContext.fontSize = this.fontSize();
        this.text().initializeGeometry(graphicsContext);
        return this;
    });

    /**
     * Renders the Graph Title. Overridden by implementations in graphics drivers.
     *
     * @method render
     * @private
     * @author jrfrimme
     */
    this.respondsTo("render", function () {});

    this.isBuiltWith("text", "graph");

    utilityFunctions.insertDefaults(this, defaultValues.title, attributes);

});

module.exports = Title;
