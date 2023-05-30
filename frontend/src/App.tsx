import React, {useEffect, useState} from 'react';
import "mapbox-gl/dist/mapbox-gl.css";

import Map from './components/Map';
import { FeatureCollection } from "geojson";
import AddMarkerButton from './components/AddMarkerButton';
import ColorSelect from './components/ColorSelect';
import { LineString } from "geojson"

import './App.css';
import { Contributor, Path } from './models';

const App = () => {
    // TODO #11: replace markerLocation with actual value from backend
    // Move out into app state from component state
  const [markerLocation, setMarkerLocation] = useState<mapboxgl.LngLatLike | null>(null);
  const [path, setPath] = useState<Path | null>(null);
  const [contributors, setContributors] = useState<Contributor[] | null>(null)

  // TODO: Set up store and move into app state from component state
  useEffect(() => {
    const fetchPath = async () => {
      const response = await fetch("http://localhost:8000/api/path")
      const responseJson: FeatureCollection<LineString> = await response.json()
      const pathJson: Path = {
        name: responseJson.features[0].properties ? responseJson.features[0].properties["name"] : "",
        geometry: responseJson.features[0],
        isActive: responseJson.features[0].properties ? responseJson.features[0].properties["is_active"] : "True",
      }
      setPath(pathJson)
      const startLocation = pathJson.geometry.geometry.coordinates[0] as [number, number]
      setMarkerLocation(startLocation)
    }
    fetchPath().catch(console.error)
  }, [])

  useEffect(() => {
    const fetchContributors = async () => {
      const response = await fetch("http://localhost:8000/api/contributors")
      const responseJson = await response.json()
      setContributors(responseJson)
    }
    fetchContributors().catch(console.error)
  }, [])

  return (
    <div className="App">
      <header className="Swineherd Fitness"></header>
      <main>
        <div className='map-container'>
          <Map currentProgress={markerLocation} path={path} ></Map>
        </div>
        <div className="add-marker-button">
          <AddMarkerButton path={path} setMarker={setMarkerLocation}></AddMarkerButton>
        </div>
        <div>
          <ColorSelect contributors={contributors ? contributors : []}></ColorSelect>
        </div>
      </main>
    </div>
  );
}

export default App;
