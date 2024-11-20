import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { UserContext } from "../../pages/UserContext";
import "./navbar.css"

function Navbar() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and user details
    localStorage.removeItem("token");
    setCurrentUser(null);

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="booked_navbar">
      <img className="logo" alt="booked logo" src="./public/booked_logo.png" />

      <ul className="booked_navbar-list">
        <li>
          <Link className="booked_navbar-link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="booked_navbar-link" to="/store">
            Store
          </Link>
        </li>
        <li>
          <Link className="booked_navbar-link" to="/library">
            Library
          </Link>
        </li>
        <li>
          <Link className="booked_navbar-link" to="/cart">
          <FaCartShopping />
          </Link>
        </li>
        {!currentUser ? (
          <>
            <li>
              <Link
                className="booked_navbar-link" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link
                className="booked_navbar-link_register" to="/register">
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button className="booked_logout-btn"
              onClick={handleLogout}
              style={{
                color: "#fff",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
