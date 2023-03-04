import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { registerSW } from "virtual:pwa-register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import Home from "./pages/home";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Protected from "./components/protected";
import Settings from "./pages/settings";

registerSW({ immediate: true });

const router = createBrowserRouter([
  {
    path: routes.home.href,
    element: <App />,
    children: [
      {
        element: <Protected />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: routes.settings.href,
            element: <Settings />,
          },
        ],
      },
      {
        path: routes.login.href,
        element: <Login />,
      },
      {
        path: routes.logout.href,
        element: <Logout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
