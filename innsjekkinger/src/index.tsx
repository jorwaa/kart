import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './components/App';
import { CheckIn } from './components/checkin';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/checkin",
    element: <CheckIn />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

