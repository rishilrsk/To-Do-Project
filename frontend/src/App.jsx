import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../Components/RootLayout";
import Login from "../Components/Login";
import Register from "../Components/Register";
import UserProfile from "../Components/Userprofile";
import RouterError from "../Components/RouterError"
import Home from "../Components/Home"

function App() {
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <RouterError />,
      children: [
        {
            path:"home",
            element:<Home />
        },
        {
          index: true,
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "user-profile",
          element: <UserProfile />,
        },
      ],
    },
  ]);
  return <RouterProvider router={browserRouterObj} />;
}

export default App;
