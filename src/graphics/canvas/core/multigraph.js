window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function(ns) {

        ns.Multigraph.hasA("$div");    // jQuery object for the Multigraph div
        ns.Multigraph.hasA("canvas");  // canvas object itself (the '<canvas>' tag itself)
        ns.Multigraph.hasA("context"); // canvas context object
        ns.Multigraph.hasA("width").which.isA('number');
        ns.Multigraph.hasA("height").which.isA('number');

        ns.Multigraph.respondsTo("init", function() {
            var canvasid = this.divid() + "-canvas";
            this.$div($('#'+this.divid()));
            this.width(this.$div().width());
            this.height(this.$div().height());
            if (this.width() > 0 && this.height() > 0) {
                // create the canvas; store ref to the canvas object in this.canvas()
                this.canvas($("<canvas id=\""+canvasid+"\" width=\""+this.width()+"\" height=\""+this.height()+"\"/>").appendTo(this.$div().empty())[0]);
                // get the canvas context; store ref to it in this.context()
                this.context(this.canvas().getContext('2d'));
                //NOTE:!!!!!
                window.multigraph.graphics.canvas.globalCanvasContext = this.context();
            }
            this.render();
        });

        ns.Multigraph.respondsTo("render", function() {
            var i;
            this.context().setTransform(1, 0, 0, 1, 0, 0);
            this.context().transform(1,0,0,-1,0,this.height());
            this.context().clearRect(0, 0, this.width(), this.height());
            this.initializeGeometry(this.width(), this.height());
            for (i=0; i<this.graphs().size(); ++i) {
                this.graphs().at(i).render(this.context(), this.width(), this.height());
            }
        });

    });

    window.multigraph.core.Multigraph.createCanvasGraph = function(divid, muglurl) {

        window.multigraph.parser.jquery.mixin.apply(window.multigraph, 'parseXML', 'serialize');
        ns.mixin.apply(window.multigraph.core);

        var muglPromise = $.ajax({
            "url"      : muglurl,
            "dataType" : "text"
        });

        var deferred = $.Deferred();

        muglPromise.done(function(data) {
            var multigraph = window.multigraph.core.Multigraph.parseXML( $(data) );
            multigraph.divid(divid);
            multigraph.init();
            deferred.resolve(multigraph);
        });

        return deferred.promise();

    };



});