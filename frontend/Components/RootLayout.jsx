import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function RootLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container flex-grow-1 mb-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
