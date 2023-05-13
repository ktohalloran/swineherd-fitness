import mapboxgl from "mapbox-gl";
import React, { useEffect, useState } from "react";
import { mapPathGeoJSON } from "../constants";

const token: string | undefined = process.env.REACT_APP_MAPBOXKEY
if (token) {mapboxgl.accessToken = token}

const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  // TODO #11: replace currentProgress with actual value from backend
  const currentProgress: [number, number] = [29.016474, 41.021126];

  useEffect(() => {
    const map = new mapboxgl.Map({
      style: "mapbox://styles/mapbox/streets-v11",
      center: currentProgress,
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
        .setLngLat(currentProgress)
        .addTo(map)
    }
  }, [map])


  return <div id="map-container" style={{ height: "800px" }}></div>;
};

export default Map;