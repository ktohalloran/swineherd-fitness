import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";

import store from "./store";
import Map from './components/Map';
import AddMarkerButton from './components/AddMarkerButton';
import { mapPathGeoJSON } from './constants';
import { PathState } from './reducers/pathFetch';
import { State } from "./reducers";

import './App.css';
import { pathFetch } from './actions/pathFetch';

interface StateProps {
  readonly path: PathState;
}

const App = ({path}: StateProps) => {
    // TODO #11: replace markerLocation with actual value from backend
    // Move out into app state from component state
  const [markerLocation, setMarkerLocation] = useState<[number, number]>(mapPathGeoJSON.geometry.coordinates[0] as [number, number]);

  useEffect(() => {
    store.dispatch(pathFetch())
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

function mapStateToProps(state: State): StateProps {
  return {
    path: state.path
  }
}

export default connect(mapStateToProps)(App);
