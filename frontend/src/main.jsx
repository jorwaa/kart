import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { React } from "react";

import CheckIn from "./checkin";
import App from "./App";

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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
