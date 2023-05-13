import React, {useState} from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import Map from './components/Map';
import AddMarkerButton from './components/AddMarkerButton';
import { mapPathGeoJSON } from './constants';

import './App.css';

const App = () => {
    // TODO #11: replace markerLocation with actual value from backend
  const [markerLocation, setMarkerLocation] = useState<[number, number]>(mapPathGeoJSON.geometry.coordinates[0] as [number, number]);

  return (
    <div className="App">
      <header className="Swineherd Fitness"></header>
      <main>
        <div className='map-container'>
          <Map currentProgress={markerLocation}></Map>
        </div>
        <div className="add-marker-button">
          <AddMarkerButton setMarker={setMarkerLocation}></AddMarkerButton>
        </div>
      </main>
    </div>
  );
}

export default App;
