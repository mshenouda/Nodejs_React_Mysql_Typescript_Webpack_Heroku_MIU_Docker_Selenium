import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme(
//  {
//   palette: {
//     primary: "#256356",
//   }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

// <React.StrictMode>
//  render twice
// </React.StrictMode>