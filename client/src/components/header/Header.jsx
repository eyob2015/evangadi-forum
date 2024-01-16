import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import "./header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // console.log(user);
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <header>
      <nav>
        <div>
          <div className="logo">
            <img
              src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
              alt="Logo"
            />
          </div>
        </div>
        <div className="menu">
          <div
            className="menu-btn__burger"
            onClick={() => {
              handleMenuClick();
            }}
          >
            <AiOutlineMenu />
          </div>
          {menuOpen && (
            <ul className="nav-links">
              <li>
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "#f68402" : "",
                  })}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/how"
                  style={({ isActive }) => ({
                    color: isActive ? "#f68402" : "",
                  })}
                >
                  How it works
                </NavLink>
              </li>
              <li className="btn">
                <NavLink
                  to="/signin"
                  style={({ isActive }) => ({
                    color: isActive ? "#f68402" : "",
                  })}
                >
                  Sign In
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className="submenu">
          <ul className="nav-links">
            <li>
              <NavLink
                to={token ? "/forum" : "/"}
                style={({ isActive }) => ({
                  color: isActive ? "#fe8402" : "",
                })}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="./">How it works</NavLink>
            </li>
            <li className="btn">
              <NavLink
                to="/signin"
                style={({ isActive }) => ({
                  color: isActive ? "#fe8402" : "",
                })}
                onClick={() => {
                  if (token) {
                    localStorage.removeItem("token");
                    setToken(null);
                  }
                }}
              >
                {token ? "Sign Out" : "Sign In"}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
