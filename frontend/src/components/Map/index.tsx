import mapboxgl from "mapbox-gl";
import React, { useEffect, useState } from "react";
import { Path } from "../../models";

const token: string | undefined = process.env.REACT_APP_MAPBOXKEY
if (token) {mapboxgl.accessToken = token}

const DEFAULT_MAP_CENTER = [28.9784, 41.0082] as mapboxgl.LngLatLike

interface MapProps {
  readonly currentProgress: mapboxgl.LngLatLike | null,
  readonly path: Path | null
}

const Map = ({currentProgress, path}: MapProps) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [currentMarker, setCurrentMarker] = useState<mapboxgl.Marker | null>(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      style: "mapbox://styles/mapbox/streets-v11",
      center: currentProgress ? currentProgress : DEFAULT_MAP_CENTER,
      zoom: 9,
      container: "map-container",
    });
    setMap(map);
  }, []);

  useEffect(() => {
    if (map && path) {
      map.on('load', () => {
        map.addSource('path', {
          'type': 'geojson',
          'data': path.geometry
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
    if (map && path) {
      const marker = new mapboxgl.Marker()
        .setLngLat(currentProgress as mapboxgl.LngLatLike)
        .addTo(map)
      setCurrentMarker(marker)
    }
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