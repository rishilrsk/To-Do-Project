import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout  from "../Components/RootLayout";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import RouterError from "../Components/RouterError";

function App() {
  const router = createBrowserRouter([
    {
      path: "/*",
      element: <RootLayout />,
      errorElement: <RouterError />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "Login",
          element: <Login />,
        },
        {
          path: "Register",
          element: <Register />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;