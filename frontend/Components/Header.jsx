import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { loginContextObj } from "../contexts/LoginContext";

function Header() {
  const { loginStatus, userLogout } = useContext(loginContextObj);

  return (
    <div>
      <div className="header bg-light p-3 mb-4 border-bottom shadow-sm">
        <ul className="nav justify-content-end">
          {loginStatus === false ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="register">
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <NavLink className="nav-link" to="register" onClick={userLogout}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
