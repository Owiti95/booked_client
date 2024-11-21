// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../../pages/UserContext";
// import "./navbar.css"; // Import the CSS file

// function Navbar() {
//   const { currentUser, setCurrentUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setCurrentUser(null);
//     navigate("/login");
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   return (
//     <nav className="navbar">
//       {/* Hamburger Icon */}
//       <button className="hamburger" onClick={toggleMenu}>
//         <span className="line"></span>
//         <span className="line"></span>
//         <span className="line"></span>
//       </button>

//       {/* Navbar List */}
//       <ul className={`menu ${isMenuOpen ? "open" : ""}`}>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/store">Store</Link>
//         </li>
//         <li>
//           <Link to="/library">Library</Link>
//         </li>
//         <li>
//           <Link to="/cart">Cart</Link>
//         </li>
//         {!currentUser ? (
//           <>
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//             <li>
//               <Link to="/register">Register</Link>
//             </li>
//           </>
//         ) : (
//           <li>
//             <button onClick={handleLogout}>Logout</button>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;


import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <button className="hamburger" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>
      <ul className={`menu ${isMenuOpen ? "open" : ""}`}> {/* Fixed */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/store">Store</Link></li>
        <li><Link to="/library">Library</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        {/* Conditionally render Admin link */}
        <li><Link to="/admin">Admin</Link></li>
        {!currentUser ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <li><button onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

