import React from 'react';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from './components/Map';

import './App.css';

const App = () => {

  return (
    <div className="App">
      <header className="Swineherd Fitness"></header>
      <main>
        <div className='map-container'>
          <Map></Map>
          </div>
      </main>
    </div>
  );
}

export default App;
