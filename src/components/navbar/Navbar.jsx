import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { UserContext } from "../../pages/UserContext";
import "./navbar.css";

function Navbar() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        setIsAdmin(decodedToken.is_Admin); // Set admin flag from token
      } catch (error) {
        console.error("Invalid token", error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setCurrentUser(null);
    setIsAdmin(false);
    navigate("/login"); // Redirect to login page
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="booked_navbar">
      <button className="hamburger" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>
      <img className="logo" alt="booked logo" src="./public/booked_logo.png" />

      <ul className={`booked_navbar-list ${isMenuOpen ? "open" : ""}`}>
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

        <li>
          <Link className="booked_navbar-link" to="/borrowings">
            Borrowings
          </Link>
        </li>

        <li>
          <Link className="booked_navbar-link" to="/history">
            History
          </Link>
        </li>



        {isAdmin && (
          <li>
            <Link className="booked_navbar-link" to="/admin">
              Admin
            </Link>
          </li>
        )}
        {!currentUser ? (
          <>
            <li>
              <Link className="booked_navbar-link" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="booked_navbar-link_register" to="/register">
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              className="booked_logout-btn"
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

