/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint  laxbreak:true */

describe("Graph parsing", function () {
    "use strict";

    var Axis = window.multigraph.core.Axis,
    Plot = window.multigraph.core.Plot,
    Window = window.multigraph.core.Window,
    UI = window.multigraph.core.UI,
    NetworkMonitor = window.multigraph.core.NetworkMonitor,
    Debugger = window.multigraph.core.Debugger,
    Legend = window.multigraph.core.Legend,
    Background = window.multigraph.core.Background,
    Plotarea = window.multigraph.core.Plotarea,
    Data = window.multigraph.core.Data,
    Graph = window.multigraph.core.Graph,
    g,
    h,
    v,
    w,
    p,
    ui,
    debug,
    legend,
    background,
    plotarea,
    data,
    xmlString =  ''
        + '<graph>'
        +    '<window'
        +        ' margin="1"'
        +        ' padding="10"'
        +        ' bordercolor="0x111223"'
        +        ' width="2"'
        +        ' height="97"'
        +        ' border="0"'
        +    '/>'
        +    '<ui'
        +        ' eventhandler="error"'
        +    '/>'
        +    '<networkmonitor'
        +        ' visible="yes"'
        +        ' fixed="no"'
        +    '/>'
        +    '<debugger'
        +        ' visible="yes"'
        +        ' fixed="no"'
        +    '/>'
        +    '<legend'
        +        ' color="0x56839c"'
        +        ' bordercolor="0x941394"'
        +        ' base="-1,-1"'
        +        ' anchor="0,0"'
        +        ' position="0,0"'
        +        ' visible="true"'
        +        ' frame="padding"'
        +        ' opacity="1"'
        +        ' border="10"'
        +        ' rows="4"'
        +        ' columns="3"'
        +        ' cornerradius="5"'
        +        ' padding="4"'
        +    '/>'
        +    '<background'
        +        ' color="0x123456"'
        +    '/>'
        +    '<plotarea'
        +        ' margintop="5"'
        +        ' marginleft="10"'
        +        ' marginbottom="19"'
        +        ' marginright="5"'
        +        ' bordercolor="0x111223"'
        +        ' border="0"'
        +    '/>'
        +    '<title'
        +        ' color="0xfffaab"'
        +        ' bordercolor="0x127752"'
        +        ' border="2"'
        +        ' opacity="0"'
        +        ' padding="4"'
        +        ' cornerradius="10"'
        +        ' base="0 0"'
        +        ' position="-1 1"'
        +        ' anchor="1 1"'
        +    '>'
        +        'Cool Cats'
        +    '</title>'
        +    '<horizontalaxis'
        +        ' color="0x123456"'
        +        ' id="x"'
        +        ' type="number"'
        +        ' pregap="2"'
        +        ' postgap="4"'
        +        ' anchor="1"'
        +        ' min="0"'
        +        ' minoffset="19"'
        +        ' max="10"'
        +        ' maxoffset="2"'
        +        ' positionbase="0 0"'
        +        ' tickmin="-3"'
        +        ' tickmax="3"'
        +        ' highlightstyle="bold"'
        +        ' linewidth="1"'
        +        ' length="1"'
        +        ' position="1,1"'
        +        ' base="1,-1"'
        +        ' minposition="0"'
        +        ' maxposition="1"'
        +        '>'
        +        '<labels'
        +            ' start="0"'
        +            ' angle="0"'
        +            ' format="%1d"'
        +            ' anchor="0,0"'
        +            ' position="0,0"'
        +            ' spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"'
        +        '/>'
        +    '</horizontalaxis>'
        +    '<horizontalaxis'
        +        ' color="0x000000"'
        +        ' id="x2"'
        +        ' type="number"'
        +        ' pregap="2"'
        +        ' postgap="4"'
        +        ' anchor="1"'
        +        ' min="0"'
        +        ' minoffset="19"'
        +        ' max="10"'
        +        ' maxoffset="2"'
        +        ' positionbase="0 0"'
        +        ' tickmin="-3"'
        +        ' tickmax="3"'
        +        ' highlightstyle="bold"'
        +        ' linewidth="1"'
        +        ' length="1"'
        +        ' position="1,1"'
        +        ' base="1,-1"'
        +        ' minposition="-1"'
        +        ' maxposition="1"'
        +    '>'
        +        '<labels'
        +            ' start="0"'
        +            ' angle="0"'
        +            ' format="%1d"'
        +            ' anchor="0,0"'
        +            ' position="0,0"'
        +            ' spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"'
        +        '/>'
        +    '</horizontalaxis>'
        +    '<verticalaxis'
        +        ' color="0x123456"'
        +        ' id="y"'
        +        ' type="number"'
        +        ' pregap="2"'
        +        ' postgap="4"'
        +        ' anchor="1"'
        +        ' min="0"'
        +        ' minoffset="19"'
        +        ' max="10"'
        +        ' maxoffset="2"'
        +        ' positionbase="0 0"'
        +        ' tickmin="-3"'
        +        ' tickmax="3"'
        +        ' highlightstyle="bold"'
        +        ' linewidth="1"'
        +        ' length="0.5-2"'
        +        ' position="1,1"'
        +        ' base="1,-1"'
        +        ' minposition="1"'
        +        ' maxposition="1"'
        +    '>'
        +        '<labels'
        +            ' start="0"'
        +            ' angle="0"'
        +            ' format="%1d"'
        +            ' anchor="0,0"'
        +            ' position="0,0"'
        +            ' spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"'
        +        '/>'
        +    '</verticalaxis>'
        +    '<verticalaxis'
        +        ' color="0x123456"'
        +        ' id="y2"'
        +        ' type="number"'
        +        ' pregap="2"'
        +        ' postgap="4"'
        +        ' anchor="1"'
        +        ' min="0"'
        +        ' minoffset="19"'
        +        ' max="10"'
        +        ' maxoffset="2"'
        +        ' positionbase="0 0"'
        +        ' tickmin="-3"'
        +        ' tickmax="3"'
        +        ' highlightstyle="bold"'
        +        ' linewidth="1"'
        +        ' length="0.9+20"'
        +        ' position="1,1"'
        +        ' base="1,-1"'
        +        ' minposition="1"'
        +        ' maxposition="1"'
        +    '>'
        +        '<labels'
        +            ' start="0"'
        +            ' angle="0"'
        +            ' format="%1d"'
        +            ' anchor="0,0"'
        +            ' position="0,0"'
        +            ' spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"'
        +        '/>'
        +    '</verticalaxis>'
        +    '<plot>'
        +        '<horizontalaxis'
        +            ' ref="x"'
        +        '/>'
        +        '<verticalaxis'
        +            ' ref="y"'
        +        '/>'
        +    '</plot>'
        +    '<plot>'
        +        '<horizontalaxis'
        +            ' ref="x2"'
        +        '/>'
        +        '<verticalaxis'
        +            ' ref="y2"'
        +        '/>'
        +    '</plot>'
        +    '<data>'
        +         '<variables>'
        +           '<variable id="x" column="0" type="number"/>'
        +           '<variable id="y" column="1" type="number"/>'
        +         '</variables>'
        +         '<values>'
        +             '3,4\n'
        +             '5,6'
        +         '</values>'
        +    '</data>'
        + '</graph>',
    xmlString2 = ''
        + '<graph>'
        +     '<window'
        +         ' margin="1"'
        +         ' padding="10"'
        +         ' bordercolor="0x111223"'
        +         ' width="2"'
        +         ' height="97"'
        +         ' border="0"'
        +     '/>'
        +     '<ui'
        +         ' eventhandler="error"'
        +     '/>'
        +     '<networkmonitor'
        +         ' visible="yes"'
        +         ' fixed="no"'
        +     '/>'
        +     '<debugger'
        +         ' visible="yes"'
        +         ' fixed="no"'
        +     '/>'
        +     '<legend'
        +         ' color="0x56839c"'
        +         ' bordercolor="0x941394"'
        +         ' base="-1,-1"'
        +         ' anchor="0,0"'
        +         ' position="0,0"'
        +         ' visible="true"'
        +         ' frame="padding"'
        +         ' opacity="1"'
        +         ' border="10"'
        +         ' rows="4"'
        +         ' columns="3"'
        +         ' cornerradius="5"'
        +         ' padding="4"'
        +     '/>'
        +     '<background'
        +         ' color="0x123456"'
        +     '/>'
        +     '<plotarea'
        +         ' margintop="5"'
        +         ' marginleft="10"'
        +         ' marginbottom="19"'
        +         ' marginright="5"'
        +         ' bordercolor="0x111223"'
        +         ' border="0"'
        +     '/>'
        +     '<title'
        +         ' color="0xfffaab"'
        +         ' bordercolor="0x127752"'
        +         ' border="2"'
        +         ' opacity="0"'
        +         ' padding="4"'
        +         ' cornerradius="10"'
        +         ' base="0 0"'
        +         ' position="-1 1"'
        +         ' anchor="1 1"'
        +     '>'
        +         ' Cool Cats'
        +     '</title>'
        +     '<horizontalaxis'
        +         ' color="0x123456"'
        +         ' id="x"'
        +         ' type="number"'
        +         ' pregap="2"'
        +         ' postgap="4"'
        +         ' anchor="1"'
        +         ' min="0"'
        +         ' minoffset="19"'
        +         ' max="10"'
        +         ' maxoffset="2"'
        +         ' positionbase="0 0"'
        +         ' tickmin="-3"'
        +         ' tickmax="3"'
        +         ' highlightstyle="bold"'
        +         ' linewidth="1"'
        +         ' length="1"'
        +         ' position="1,1"'
        +         ' base="1,-1"'
        +         ' minposition="-0.3"'
        +         ' maxposition="1"'
        +     '>'
        +         '<labels'
        +             ' start="0"'
        +             ' angle="0"'
        +             ' format="%1d"'
        +             ' anchor="0,0"'
        +             ' position="0,0"'
        +             ' spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"'
        +         '/>'
        +     '</horizontalaxis>'
        +     '<horizontalaxis'
        +         ' color="0x123456"'
        +         ' id="x2"'
        +         ' type="number"'
        +         ' pregap="2"'
        +         ' postgap="4"'
        +         ' anchor="1"'
        +         ' min="0"'
        +         ' minoffset="19"'
        +         ' max="10"'
        +         ' maxoffset="2"'
        +         ' positionbase="0 0"'
        +         ' tickmin="-3"'
        +         ' tickmax="3"'
        +         ' highlightstyle="bold"'
        +         ' linewidth="1"'
        +         ' length="1"'
        +         ' position="1,1"'
        +         ' base="1,-1"'
        +         ' minposition="-0.2"'
        +         ' maxposition="1"'
        +     '>'
        +         '<labels'
        +             ' start="0"'
        +             ' angle="0"'
        +             ' format="%1d"'
        +             ' anchor="0,0"'
        +             ' position="0,0"'
        +             ' spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"'
        +         '/>'
        +     '</horizontalaxis>'
        +     '<verticalaxis'
        +         ' color="0x123456"'
        +         ' id="y"'
        +         ' type="number"'
        +         ' pregap="2"'
        +         ' postgap="4"'
        +         ' anchor="1"'
        +         ' min="0"'
        +         ' minoffset="19"'
        +         ' max="10"'
        +         ' maxoffset="2"'
        +         ' positionbase="0 0"'
        +         ' tickmin="-3"'
        +         ' tickmax="3"'
        +         ' highlightstyle="bold"'
        +         ' linewidth="1"'
        +         ' length="1"'
        +         ' position="1,1"'
        +         ' base="1,-1"'
        +         ' minposition="0.2"'
        +         ' maxposition="1"'
        +     '>'
        +         '<labels'
        +             ' start="0"'
        +             ' angle="0"'
        +             ' format="%1d"'
        +             ' anchor="0,0"'
        +             ' position="0,0"'
        +             ' spacing="10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"'
        +         '/>'
        +     '</verticalaxis>'
        +     '<verticalaxis'
        +         ' color="0x123456"'
        +         ' id="y2"'
        +         ' type="number"'
        +         ' pregap="2"'
        +         ' postgap="4"'
        +         ' anchor="1"'
        +         ' min="0"'
        +         ' minoffset="19"'
        +         ' max="10"'
        +         ' maxoffset="2"'
        +         ' positionbase="0 0"'
        +         ' tickmin="-3"'
        +         ' tickmax="3"'
        +         ' highlightstyle="bold"'
        +         ' linewidth="1"'
        +         ' length="1"'
        +         ' position="1,1"'
        +         ' base="1,-1"'
        +         ' minposition="1"'
        +         ' maxposition="1"'
        +     '>'
        +         '<labels'
        +             ' start="5"'
        +             ' angle="90"'
        +             ' format="%2d"'
        +             ' anchor="0,1"'
        +             ' position="1,0"'
        +             ' spacing="5000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001"'
        +         '/>'
        +     '</verticalaxis>'
        +     '<data>'
        +         '<variables>'
        +           '<variable id="x" column="0" type="number"/>'
        +           '<variable id="y" column="1" type="number"/>'
        +         '</variables>'
        +         '<values>'
        +             '3,4\n'
        +             '5,6'
        +         '</values>'
        +     '</data>'
        + '</graph>',
    $xml;

    beforeEach(function () {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString);
        g = Graph.parseXML($xml);
    });

    it("should be able to parse a graph from XML", function () {
        expect(g).not.toBeUndefined();
        expect(g instanceof Graph).toBe(true);
    });

    it("should be able to parse a graph from XML, then serialize it, and get the same XML as the original", function () {
        expect(g.serialize()).toBe(xmlString);
        $xml = window.multigraph.parser.jquery.stringToJQueryXMLObj(xmlString2);
        g = Graph.parseXML($xml);
        expect(g.serialize()).toBe(xmlString2);
    });

});
