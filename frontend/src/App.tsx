import React from 'react';
import './App.css';
import PersistentDrawerLeft from './components/Utility/Drawer';
import TestBackend from './components/Utility/TestBackend';
//import Register from './components/Credentials/Register';
//import Login from './components/Credentials/Login';
//import Logout from './components/Credentials/Logout';
import ForgetPassword from './components/Credentials/Forget';

function App() {
  return (
    <div className="App">
      {/* <PersistentDrawerLeft /> */}
      {/* <TestBackend /> */}
      {/* <Login /> */}
      {/* <Logout /> */}
      <ForgetPassword />
    </div>
  );
}

export default App;
