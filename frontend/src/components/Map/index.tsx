import mapboxgl from "mapbox-gl";
import React, { useEffect, useState } from "react";
import { mapPathGeoJSON } from "../../constants";
import {Position} from "geojson"

const token: string | undefined = process.env.REACT_APP_MAPBOXKEY
if (token) {mapboxgl.accessToken = token}

const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  // TODO #11: replace currentProgress with actual value from backend
  const currentProgress: Position = mapPathGeoJSON.geometry.coordinates[0];

  useEffect(() => {
    const map = new mapboxgl.Map({
      style: "mapbox://styles/mapbox/streets-v11",
      center: currentProgress as [number, number],
      zoom: 9,
      container: "map-container",
    });
    setMap(map);
  }, []);

  useEffect(() => {
    if (map) {
      map.on('load', () => {
        map.addSource('path', {
          'type': 'geojson',
          'data': mapPathGeoJSON
        })
      
      map.addLayer({
        'id': 'path',
        'type': 'line',
        'source': 'path',
        'paint': {
          'line-color': '#CDC1BF',
          'line-width': 4
        }
      })
    })
      new mapboxgl.Marker()
        .setLngLat(currentProgress as mapboxgl.LngLatLike)
        .addTo(map)
    }
  }, [map])


  return <div id="map-container" style={{ height: "800px" }}></div>;
};

export default Map;