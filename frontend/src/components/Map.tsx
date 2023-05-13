import mapboxgl from "mapbox-gl";
import React, { useEffect, useState } from "react";

const token: string | undefined = process.env.REACT_APP_MAPBOXKEY
if (token) {mapboxgl.accessToken = token}

const phillyCoordinates: [number, number] = [-76.6122, 39.2904];

const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      style: "mapbox://styles/mapbox/streets-v11",
      center: phillyCoordinates,
      zoom: 11.5,
      container: "map-container",
    });
    setMap(map);
  }, []);


  return <div id="map-container" style={{ height: "800px" }}></div>;
};

export default Map;