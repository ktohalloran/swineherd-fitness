import mapboxgl from "mapbox-gl";
import React, { useEffect, useState } from "react";
import { PathState } from "../../pathSlice";

const token: string | undefined = process.env.REACT_APP_MAPBOXKEY
if (token) {mapboxgl.accessToken = token}

interface MapProps {
  readonly currentProgress: [number, number],
  readonly path: PathState
}

const Map = ({currentProgress, path}: MapProps) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [currentMarker, setCurrentMarker] = useState<mapboxgl.Marker | null>(null);

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
    if (map && path) {
      console.log(path.geometry)
      map.on('load', () => {
        map.addSource('path', {
          'type': 'geojson',
          'data': path.geometry?.geometry
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
      const marker = new mapboxgl.Marker()
        .setLngLat(currentProgress as mapboxgl.LngLatLike)
        .addTo(map)
      setCurrentMarker(marker)
    }
  }, [map, currentProgress, path])

  useEffect(() => {
    if (map && currentProgress && currentMarker) {
      currentMarker.setLngLat(currentProgress)
      map.flyTo({center: currentProgress})
    }
  }, [map, currentProgress])


  return <div id="map-container" style={{ height: "800px" }}></div>;
};

export default Map;