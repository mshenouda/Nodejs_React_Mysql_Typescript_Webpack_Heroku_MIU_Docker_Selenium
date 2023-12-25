import React from 'react';
import './App.css';
import PersistentDrawerLeft from './components/Drawer';
import TestBackend from './components/TestBackend';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <PersistentDrawerLeft />
      {/* <TestBackend /> */}
      {/* </header> */}
    </div>
  );
}

export default App;
