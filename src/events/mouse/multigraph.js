window.multigraph.util.namespace("window.multigraph.events.jquery.mouse", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var math = window.multigraph.util.namespace("window.multigraph.math");

        ns.core.Multigraph.respondsTo("registerMouseEvents", function (target) {
            var base,
                mouseLast,
                mouseIsDown = false,
                dragStarted = false,
                multigraph = this,
                $target = window.multigraph.jQuery(target);

            var eventLocationToGraphCoords = function (event) {
                return new math.Point((event.pageX - $target.offset().left) - multigraph.graphs().at(0).x0(),
                                      $target.height() - (event.pageY - $target.offset().top) - multigraph.graphs().at(0).y0());
            };

            $target.mousedown(function (event) {
                event.preventDefault();
                mouseLast = base = eventLocationToGraphCoords(event);
                mouseIsDown = true;
                dragStarted = false;
            });

            $target.mouseup(function (event) {
                mouseIsDown = false;
                multigraph.graphs().at(0).doDragDone();
            });

            $target.mousemove(function (event) {
                var eventLoc = eventLocationToGraphCoords(event);
                if (mouseIsDown) {
                    var dx = eventLoc.x() - mouseLast.x(),
                        dy = eventLoc.y() - mouseLast.y();
                    if (multigraph.graphs().size() > 0) {
                        if (!dragStarted ) {
                            multigraph.graphs().at(0).doDragReset();
                        }
                        multigraph.graphs().at(0).doDrag(multigraph, base.x(), base.y(), dx, dy, event.shiftKey);
                    }
                    dragStarted = true;
                }
                mouseLast = eventLoc;
            });

            $target.mousewheel(function (event, delta) {
                var eventLoc = eventLocationToGraphCoords(event);
                if (multigraph.graphs().size() > 0) {
                    multigraph.graphs().at(0).doWheelZoom(multigraph, eventLoc.x(), eventLoc.y(), delta);
                }
                event.preventDefault();
            });

            $target.mouseenter(function (event) {
                mouseLast = eventLocationToGraphCoords(event);
                mouseIsDown = false;
                multigraph.graphs().at(0).doDragDone();
            });

            $target.mouseleave(function (event) {
                mouseIsDown = false;
                multigraph.graphs().at(0).doDragDone();
            });

        });

    });

});

