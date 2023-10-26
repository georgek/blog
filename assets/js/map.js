import * as pmtiles from "pmtiles";
import * as maplibregl from "maplibre-gl";
import layers from 'protomaps-themes-base';

let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles",protocol.tile);

function makeMap({tilesUrl, bounds, maxBounds, container = "map"}) {
    console.log(tilesUrl, bounds, maxBounds, container);
    var map = new maplibregl.Map({
        container: container,
        style: {
            version: 8,
            glyphs: 'https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf',
            sources: {
                "protomaps": {
                    type: "vector",
                    url: `pmtiles://${tilesUrl}`,
                    attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
                }
            },
            layers: layers("protomaps","light")
        },
        bounds: bounds,
        maxBounds: maxBounds,
    });
    return map;
}

document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll("div.map").forEach((e) => {
        makeMap({
            tilesUrl: e.dataset.tilesUrl,
            bounds: e.dataset.bounds.split(",").map(parseFloat),
            maxBounds: e.dataset.maxBounds.split(",").map(parseFloat),
            container: e,
        });
    });
});
