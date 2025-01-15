import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './bootstrap-custom.scss';
import './rhap-overrides.scss';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);