import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import "mapbox-gl/dist/mapbox-gl.css";

import Map from './components/Map';
import { FeatureCollection } from "geojson";
import {RootState} from './store';
import AddMarkerButton from './components/AddMarkerButton';
import { mapPathGeoJSON } from './constants';

import './App.css';
import { Path } from './models';

const App = () => {
    // TODO #11: replace markerLocation with actual value from backend
    // Move out into app state from component state
  const [markerLocation, setMarkerLocation] = useState<[number, number]>(mapPathGeoJSON.geometry.coordinates[0] as [number, number]);
  const path = useAppSelector((state: RootState) => state.path)
  const dispatch = useAppDispatch()

  // TODO: Move this api call into slice file
  useEffect(() => {
    const fetchPath = async () => {
      const response = await fetch("http://localhost:8000/api/path")
      const responseJson: FeatureCollection = await response.json()
      const pathJson: Path = {
        name: responseJson.features[0].properties ? responseJson.features[0].properties["name"] : "",
        geometry: responseJson.features[0],
        isActive: responseJson.features[0].properties ? responseJson.features[0].properties["is_active"] : "True",
      }
      dispatch({type: 'path/pathfetch', payload: pathJson})
    }
    fetchPath()
  }, [])

  return (
    <div className="App">
      <header className="Swineherd Fitness"></header>
      <main>
        <div className='map-container'>
          <Map currentProgress={markerLocation} path={path} ></Map>
        </div>
        <div className="add-marker-button">
          <AddMarkerButton setMarker={setMarkerLocation}></AddMarkerButton>
        </div>
      </main>
    </div>
  );
}

export default App;
