import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/login.css';
import './assets/css/register.css';
import './assets/css/saleProperty.css';
import './assets/css/propertyForm.css';

import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);