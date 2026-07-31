import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { loginContextObj } from "../contexts/LoginContext";
import { FaHome } from "react-icons/fa";

function Header() {
  const { loginStatus, userLogout } = useContext(loginContextObj);

  return (
    <header className="bg-white border-bottom" style={{ borderColor: 'var(--border-color)' }}>
      <div className="container py-3 d-flex justify-content-end align-items-center">
        <ul className="nav align-items-center m-0">
          {loginStatus === false ? (
            <>
              <li className="nav-item me-1">
                <NavLink className="nav-link soft-nav-link d-flex align-items-center gap-2" to="home">
                  <FaHome /> <span>Home</span>
                </NavLink>
              </li>
              <li className="nav-item me-1">
                <NavLink className="nav-link soft-nav-link" to="login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link soft-nav-link" to="register">
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <NavLink className="nav-link soft-nav-link text-danger" to="login" onClick={userLogout}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
