window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var ArrayData = ns.ArrayData,
        DataValue = ns.DataValue,
        Data = ns.Data;

    /*var CSVData = function (filename) {

    };*/

    var CSVData = window.jermaine.Model(function () {
        this.isA(ArrayData);
        this.hasA("filename").which.isA("string");
        this.hasA("messageHandler");
        this.hasA("dataIsReady").which.isA("boolean").and.defaultsTo(false);

        this.respondsTo("getIterator", function (columnIds, min, max, buffer) {
            if (this.dataIsReady()) {
                return ArrayData.getArrayDataIterator(this, columnIds, min, max, buffer);
            } else {
                return {
                    "next"    : function () {},
                    "hasNext" : function () { return false; }
                };
            }
        });

        this.respondsTo("_displayError", function (e) {
            if (this.messageHandler()) {
                this.messageHandler().error(e);
            } else {
                throw e;
            }
        });

        this.isBuiltWith("columns", "filename", "%messageHandler", function () {
            var that = this;

            this.init();

            if (that.filename() !== undefined) {
                window.multigraph.jQuery.ajax({
                    url : that.filename(),

                    success : function (data) {
                        var i, j,
                            lines,
                            stringValues,
                            dataValues = [],
                            dataValuesRow;
                        //parse the data
                        dataValues = ArrayData.textToDataValuesArray(that.getColumns(), data);
                        // populate array
                        that.array(dataValues);
                        that.dataIsReady(true);
                        that.emit({type : "dataReady"});
                    },

                    error : function (jqXHR, textStatus, errorThrown) {
                        var message = errorThrown;
                        if (jqXHR.statusCode().status === 404) {
                            message = "File not found: '" + that.filename() + '"';
                        } else {
                            if (textStatus) {
                                message = textStatus + ": " + message;
                            }
                        }
                        that._displayError(new Error(message));
                    }

                });
            }
        });
    });

    ns.CSVData = CSVData;
});
