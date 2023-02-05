import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_LOCAL_API;
axios.defaults.contentType = 'application/json';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) config.headers['x-access-token'] = token;
  return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

