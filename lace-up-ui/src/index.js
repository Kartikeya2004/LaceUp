/* File: src/index.js */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom'; // <-- 1. IMPORT THE ROUTER
import './index.css'; // <-- 2. IMPORT OUR NEW TAILWIND STYLES

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter> {/* <-- 3. WRAP YOUR APP IN THE ROUTER */}
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);