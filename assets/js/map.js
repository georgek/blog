import * as pmtiles from "pmtiles";
import * as maplibregl from "maplibre-gl";
import layers from 'protomaps-themes-base';
import * as params from '@params';

let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles",protocol.tile);

var map = new maplibregl.Map({
    container: 'map', // container id
    style: {
        version: 8,
        glyphs: 'https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf',
        sources: {
            "protomaps": {
                type: "vector",
                url: `pmtiles:///blog/${params.pmtiles}`,
                attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
            }
        },
        layers: layers("protomaps","light")
    },
    bounds: [-15.923996,27.713926,-15.308075,28.205793], // gran-canaria
    maxBounds: [-16.273499,27.508271,-14.889221,28.386568], // should be same as pmtiles extract
});
