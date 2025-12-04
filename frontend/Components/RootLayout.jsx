import { Outlet } from "react-router-dom";
import Header from "./Header";

function RootLayout() {
  return (
    <div>
      <Header />
      {}
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
