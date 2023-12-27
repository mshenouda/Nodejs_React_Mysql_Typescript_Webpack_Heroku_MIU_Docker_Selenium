import React from 'react';
import './App.css';
import PersistentDrawerLeft from './components/Drawer';
import TestBackend from './components/TestBackend';

function App() {
  return (
    <div className="App">
      <PersistentDrawerLeft />
      {/* <TestBackend /> */}
    </div>
  );
}

export default App;
