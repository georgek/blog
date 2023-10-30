import * as pmtiles from "pmtiles";
import * as maplibregl from "maplibre-gl";
import layers from 'protomaps-themes-base';
import { VectorTextProtocol } from "maplibre-gl-vector-text-protocol";

let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
maplibregl.addProtocol("gpx", VectorTextProtocol);

const attr = '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>';

function makeMap({tilesUrl, bounds, maxBounds, container = "map"}) {
    const map = new maplibregl.Map({
        container: container,
        style: {
            version: 8,
            glyphs: 'https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf',
            sources: {
                protomaps: {
                    type: "vector",
                    url: `pmtiles://${tilesUrl}`,
                    attribution: attr,
                },
            },
            layers: [
                ...layers("protomaps","light"),
            ],
        },
        bounds: bounds,
        maxBounds: maxBounds,
    });
    return map;
}

document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll("div.map").forEach((e) => {
        const map = makeMap({
            tilesUrl: e.dataset.tilesUrl,
            bounds: e.dataset.bounds.split(",").map(parseFloat),
            maxBounds: e.dataset.maxBounds.split(",").map(parseFloat),
            container: e,
        });

        map.on("load", () => {
            if ("tracks" in e.dataset) {
                const colours = ["red", "green", "blue", "orange"];
                var i = 0;
                e.dataset.tracks.split(",").forEach((track) => {
                    map.addSource(track, {
                        type: "geojson",
                        data: `gpx://${track}`,
                    });
                    map.addLayer({
                        id: track,
                        type: 'line',
                        source: track,
                        minzoom: 0,
                        maxzoom: 20,
                        paint: {
                            'line-color': colours[i],
                            'line-width': 3,
                        }
                    });
                    i = (i+1) % colours.length;
                });
            }
            if ("reliefTilesUrl" in e.dataset) {
                map.addSource("relief", {
                    type: "raster-dem",
                    url: `pmtiles://${e.dataset.reliefTilesUrl}`,
                    encoding: "terrarium",
                });
                map.addLayer({
                    id: "relief",
                    source: "relief",
                    type: "hillshade",
                    paint: {
                        "hillshade-accent-color": "#004400",
                        "hillshade-highlight-color": "#ddffdd",
                        "hillshade-exaggeration": 0.3,
                    },
                }, "water");
            }
        });
    });
});
