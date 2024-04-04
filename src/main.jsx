import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./app";
import { Cart } from "./pages/cart/cart";
import { Protected } from "./pages/protected/protected";
import { Login } from "./pages/login/login";
import { Order } from "./pages/order/order";
import Pedido from "./pages/pedido/Pedido.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/protected",
    element: <Protected />,
  },
  {
    path: "/order",
    element: <Order />,
  },

  {
    path: "/pedido",
    element: <Pedido />,
  },



]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
