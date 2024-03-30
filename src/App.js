import React from 'react';
import './App.css';
import GetZip from './components/GetZip'
import ResponsiveAppBar from './components/ResponsiveAppBar';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar/>
      <div>
        <h1 id="heading">Consumption Calculator</h1>
        <h2>Enter Zip Codes and find out power consumption details about those regions.</h2>
        <p>Please enter each Zip Code only once.</p>
      </div>
      <GetZip/>
    </div>
  );
}

export default App;
