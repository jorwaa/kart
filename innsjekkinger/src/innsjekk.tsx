import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CheckIn } from './components/checkin';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CheckIn />
  </React.StrictMode>
);