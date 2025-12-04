import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div className="header bg-light p-3 mb-4 border-bottom shadow-sm ">
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Register">
            Register
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;
