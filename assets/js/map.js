import * as pmtiles from "pmtiles";
import * as maplibregl from "maplibre-gl";
import { VectorTextProtocol } from "maplibre-gl-vector-text-protocol";

let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
maplibregl.addProtocol("gpx", VectorTextProtocol);

const attr = '© <a href="https://openstreetmap.org">OpenStreetMap</a>';

async function makeMap({ tilesUrl, bounds, maxBounds, container = "map" }) {
  const response = await fetch("/osm-bright-gl-style/style.json");
  const style = await response.json();
  const map = new maplibregl.Map({
    container: container,
    style: {
      version: 8,
      sprite: `${window.location.origin}/osm-bright-gl-style/sprite`,
      glyphs: `${window.location.origin}/osm-bright-gl-style/{fontstack}/{range}.pbf`,
      sources: {
        openmaptiles: {
          type: "vector",
          url: `pmtiles://${tilesUrl}`,
          attribution: attr,
        },
      },
      layers: style.layers,
    },
    bounds: bounds,
    maxBounds: maxBounds,
  });
  return map;
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("div.map").forEach(async (e) => {
    const map = await makeMap({
      tilesUrl: e.dataset.tilesUrl,
      bounds: e.dataset.bounds.split(",").map(parseFloat),
      maxBounds: e.dataset.maxBounds.split(",").map(parseFloat),
      container: e,
    });

    map.on("load", () => {
      if ("tracks" in e.dataset) {
        const colours = ["#25874c", "#4c2587", "#874c25"];
        var i = 0;
        e.dataset.tracks.split(",").forEach((track) => {
          map.addSource(track, {
            type: "geojson",
            data: `gpx://${track}`,
          });
          map.addLayer({
            id: track,
            type: "line",
            source: track,
            minzoom: 0,
            maxzoom: 20,
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": colours[i],
              "line-width": 6,
              "line-opacity": 0.8,
            },
          });
          i = (i + 1) % colours.length;
        });
      }
      if ("points" in e.dataset) {
        const features = e.dataset.points.split(",").map((point) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: point.split(":"),
          },
        }));
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: features,
          },
        });
        map.addLayer({
          id: "points",
          type: "circle",
          source: "points",
          paint: {
            "circle-radius": 3,
            "circle-color": "white",
            "circle-stroke-color": "#005522",
            "circle-stroke-width": 3,
          },
        });
      }
      if ("reliefTilesUrl" in e.dataset) {
        map.addSource("relief", {
          type: "raster-dem",
          url: `pmtiles://${e.dataset.reliefTilesUrl}`,
          encoding: "terrarium",
        });
        map.addLayer(
          {
            id: "relief",
            source: "relief",
            type: "hillshade",
            paint: {
              "hillshade-accent-color": "#004400",
              "hillshade-highlight-color": "#ddffdd",
              "hillshade-exaggeration": 0.3,
            },
          },
          "water",
        );
      }
    });
  });
});
