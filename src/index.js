import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UrlProvider } from './UrlContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UrlProvider>
      <App />
    </UrlProvider>
  </React.StrictMode>
);

