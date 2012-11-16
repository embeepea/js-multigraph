/*global Raphael */

window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Multigraph.hasA("paper"); // Raphael paper object

        ns.Multigraph.hasA("$div");  // jQuery object for the Raphael paper's div

        ns.Multigraph.hasA("width").which.isA("number");
        ns.Multigraph.hasA("height").which.isA("number");

        ns.Multigraph.hasA("baseX").which.isA("number");
        ns.Multigraph.hasA("baseY").which.isA("number");
        ns.Multigraph.hasA("mouseLastX").which.isA("number");
        ns.Multigraph.hasA("mouseLastY").which.isA("number");

        ns.Multigraph.respondsTo("redraw", function () {
            var that = this;
            window.requestAnimationFrame(function () {
                that.render();
            });
        });

        ns.Multigraph.respondsTo("init", function () {
            this.$div(window.multigraph.jQuery(this.div()));
            this.$div().on("mousedown", { "mg": this }, this.setupEvents);
            this.registerTouchEvents(this.$div());
            this.width(this.$div().width());
            this.height(this.$div().height());
            if (this.paper()) {
                this.paper().remove();
            }
            this.paper(new window.Raphael(this.div(), this.width(), this.height()));
            this.render();
        });

        ns.Multigraph.respondsTo("render", function () {
            var i;
            this.paper().clear();
            var text = this.paper().text(-8000, -8000, "foo");
            this.initializeGeometry(this.width(), this.height(), { "elem" : text });
            for (i=0; i<this.graphs().size(); ++i) {
                this.graphs().at(i).render(this.paper(), this.width(), this.height());
            }
            text.remove();
        });

        ns.Multigraph.respondsTo("setupEvents", function (mouseDownEvent) {
            var mg = mouseDownEvent.data.mg;

            mg.baseX(mouseDownEvent.pageX - mg.$div().offset().left);
            mg.baseY(mg.$div().height() - (mouseDownEvent.pageY - mg.$div().offset().top));
            mg.mouseLastX(mouseDownEvent.pageX - mg.$div().offset().left);
            mg.mouseLastY(mg.$div().height() - (mouseDownEvent.pageY - mg.$div().offset().top));

            mg.graphs().at(0).doDragReset();

            mg.$div().on("mousemove", { "mg": mg }, mg.triggerEvents);
            mg.$div().on("mouseup", { "mg": mg }, mg.unbindEvents);
            mg.$div().on("mouseleave", { "mg": mg }, mg.unbindEvents);
        });

        ns.Multigraph.respondsTo("triggerEvents", function (mouseMoveEvent) {
            var mg = mouseMoveEvent.data.mg,
                eventX = mouseMoveEvent.pageX - mg.$div().offset().left,
                eventY = mg.$div().height() - (mouseMoveEvent.pageY - mg.$div().offset().top),
                dx = eventX - mg.mouseLastX(),
                dy = eventY - mg.mouseLastY(),
                i;

            mg.mouseLastX(eventX);
            mg.mouseLastY(eventY);

            for (i = 0; i < mg.graphs().size(); ++i) {
                mg.graphs().at(i).doDrag(mg, mg.baseX(), mg.baseY(), dx, dy, mouseMoveEvent.shiftKey);
            }

        });

        ns.Multigraph.respondsTo("unbindEvents", function (e) {
            var mg = e.data.mg;
            mg.$div().off("mousemove", mg.triggerEvents);
            mg.$div().off("mouseup", mg.unbindEvents);
            mg.$div().off("mouseleave", mg.unbindEvents);
        });

    });

    window.multigraph.core.Multigraph.createRaphaelGraph = function (options) {
        var muglPromise,
            deferred;
        
        try {
            window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
            ns.mixin.apply(window.multigraph.core);
            window.multigraph.normalizer.mixin.apply(window.multigraph.core);
            window.multigraph.events.jquery.draggable.mixin.apply(window.multigraph);
            window.multigraph.events.jquery.mouse.mixin.apply(window.multigraph);
            window.multigraph.events.jquery.touch.mixin.apply(window.multigraph);

            muglPromise = window.multigraph.jQuery.ajax({
                "url"      : options.mugl,
                "dataType" : "text"
            }),

            deferred = window.multigraph.jQuery.Deferred();
        } catch (e) {
            options.messageHandler.error(e);
        }

        muglPromise.done(function (data) {
            try {
                var multigraph = window.multigraph.core.Multigraph.parseXML( window.multigraph.parser.jquery.stringToJQueryXMLObj(data), options.messageHandler );
                multigraph.normalize();
                multigraph.div(options.div);
                window.multigraph.jQuery(options.div).css('cursor' , 'pointer');
                multigraph.init();
                multigraph.registerCommonDataCallback(function () {
                    multigraph.redraw();
                });
                deferred.resolve(multigraph);
            }
            catch (e) {
                options.messageHandler.error(e);
            }
        });

        return deferred.promise();

    };

});
