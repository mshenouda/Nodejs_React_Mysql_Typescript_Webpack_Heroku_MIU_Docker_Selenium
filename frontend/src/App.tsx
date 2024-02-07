import React, {FC} from 'react';
import './App.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import PersistentDrawerLeft from './components/Utility/Drawer';
import TestBackend from './components/Utility/TestBackend';
import Register from './components/Credentials/Register';
import Login from './components/Credentials/Login';
import Logout from './components/Credentials/Logout';
import ForgetPassword from './components/Credentials/Forget';
import TestBackEnd from './components/Utility/TestBackend';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Login />}/>
      <Route path='register' element={<Register />}/>
      <Route path='forget' element={<ForgetPassword />}/>
      <Route path='logout' element={<Logout />}/>
      <Route path='main' element={<PersistentDrawerLeft />}/>
      <Route path="*" element={<Navigate to="/" />}
    />
    </Route>
  )
); 



function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
