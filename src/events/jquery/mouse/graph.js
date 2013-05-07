window.multigraph.util.namespace("window.multigraph.events.jquery.mouse", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, errorHandler) {
        var Graph = ns.core.Graph;

        Graph.hasA("mouseWheelTimer").which.defaultsTo(null);

        Graph.respondsTo("doWheelZoom", function (multigraph, x, y, delta) {
            var that = this;
            try {
                this.pauseAllData();
                var axis = this.findNearestAxis(x, y);
                if (axis.orientation() === ns.core.Axis.HORIZONTAL) {
                    axis.doZoom(x, 4*delta);
                } else {
                    axis.doZoom(y, 4*delta);
                }
                multigraph.redraw();

                // resume data fetching after .5 seconds of no mouse wheel motion:
                var mouseWheelTimer = this.mouseWheelTimer;
                if (mouseWheelTimer() !== null) {
                    clearTimeout(mouseWheelTimer());
                    mouseWheelTimer(null);
                }
                mouseWheelTimer(setTimeout(function () {
                    that.resumeAllData();
                }, 500)); 
            } catch (e) {
                errorHandler(e);
            }
        });


        Graph.hasA("existingDatatips").which.defaultsTo(function () { return []; });
        Graph.respondsTo("handleDatatips", function (loc, width, height, $target, div) {
            var $                = window.multigraph.jQuery,
                plots            = this.plots(),
                existingDatatips = this.existingDatatips(),
                plot,
                datatipsData,
                datatipIndex,
                i;

            var temp = $("<span></span>")
                .css({
                    "display"          : "hidden",
                    "padding-left"     : "2px",
                    "padding-right"    : "2px",
                })
                .appendTo(div);

            // find first available bit of data
            for (i = 0; i < plots.size(); i++) {
                datatipsData = plots.at(i).getDatatipsData(loc, width, height, this, temp);
                if (datatipsData !== undefined) {
                    datatipIndex = i;
                    break;
                }
            }

            temp.remove();

            // don't do anything if there is no data
            if (datatipsData === undefined) {
                this.removeDatatips();
                return;
            }

            // flag all datatips for removal
            for (i = 0; i < existingDatatips.length; i++) {
                existingDatatips[i].flag = true;
            }

            // remove flags from datatips that don't need to be redrawn
            checkDatatipExistence(datatipsData, existingDatatips);

            this.removeFlaggedDatatips();

            // don't do anything if datatip already exists
            if (datatipsData.flag === false) {
                return;
            }

            var arrowLength = 10;
            var datatip = plots.at(datatipIndex).createDatatip(datatipsData, arrowLength);

            datatip.appendTo(div);

            datatip.mousedown(function (event) {
                $target.trigger("mousedown", event);
            });

            datatipsData.elem = datatip;
            existingDatatips.push(datatipsData);
        });

        var checkDatatipExistence = function (datatipData, existingData) {
            var i, l;
            for (i = 0, l = existingData.length; i < l; i++) {
                if (
                    datatipData.content   === existingData[i].content   &&
                    datatipData.type      === existingData[i].type      &&
                    datatipData.pixelp[0] === existingData[i].pixelp[0] &&
                    datatipData.pixelp[1] === existingData[i].pixelp[1]
                ) {
                    existingData[i].flag = false;
                    datatipData.flag = false; // do not redraw
                    return;
                }
            }
            datatipData.flag = true; // needs to be drawn
        };

        Graph.respondsTo("removeDatatips", function () {
            var existingDatatips = this.existingDatatips(),
                i;
            if (existingDatatips.length > 0) {
                for (i = 0; i < existingDatatips.length; i++) {
                    existingDatatips[i].elem.remove();
                }
                existingDatatips = [];
            }
        });

        Graph.respondsTo("removeFlaggedDatatips", function () {
            var existingDatatips = this.existingDatatips(),
                i;
            if (existingDatatips.length > 0) {
                for (i = 0; i < existingDatatips.length; i++) {
                    if (existingDatatips[i].flag === true) {
                        existingDatatips[i].elem.remove();
                        existingDatatips.splice(i, 1);
                    }
                }
            }
        });

    });

});
