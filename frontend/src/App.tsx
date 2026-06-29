import React, { useMemo, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from '@mui/material';
import { getTheme } from './theme';
import { ColorModeContext } from './contexts/ColorModeContext';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import PersistentDrawerLeft from './components/Utility/Drawer';
import Register from './components/Credentials/Register';
import Login from './components/Credentials/Login';
import Logout from './components/Credentials/Logout';
import ForgetPassword from './components/Credentials/Forget';
import {UserNameProvider} from './contexts/UserNameContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={
        <UserNameProvider>
          <Login />
        </UserNameProvider>}/>
      <Route path='register' element={<Register />}/>
      <Route path='forget' element={<ForgetPassword />}/>
      <Route path='logout' element={<Logout />}/>
      <Route path='main' element={
        <UserNameProvider>
          <PersistentDrawerLeft />
        </UserNameProvider>}/>
      <Route path="*" element={<Navigate to="/" />}
    />
    </Route>
  )
); 



const COLOR_MODE_KEY = 'colorMode';

function getInitialMode(): PaletteMode {
  const saved = localStorage.getItem(COLOR_MODE_KEY);
  return saved === 'dark' || saved === 'light' ? saved : 'light';
}

function App() {
  const [mode, setMode] = useState<PaletteMode>(getInitialMode);
  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () =>
        setMode((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem(COLOR_MODE_KEY, next);
          return next;
        }),
    }),
    [mode]
  );
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
