import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../pages/UserContext";

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
      <ul className="booked_navbar-list"
        style={{
          display: "flex",
          gap: "1rem",
          listStyle: "none",
          margin: 0,
        }}
      >
        <img className="logo" alt="booked logo" src="./public/booked_logo.png" />

        <li>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/store" style={{ color: "#fff", textDecoration: "none" }}>
            Store
          </Link>
        </li>
        <li>
          <Link to="/library" style={{ color: "#fff", textDecoration: "none" }}>
            Library
          </Link>
        </li>
        <li>
          <Link to="/cart" style={{ color: "#fff", textDecoration: "none" }}>
            Cart
          </Link>
        </li>
        {!currentUser ? (
          <>
            <li>
              <Link
                to="/login"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
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
