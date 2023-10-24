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
                url: `pmtiles://${params.pmtiles}`,
                attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
            }
        },
        layers: layers("protomaps","light")
    },
    bounds: params.bounds.split(",").map(parseFloat),
    maxBounds: params.maxBounds.split(",").map(parseFloat),
});
