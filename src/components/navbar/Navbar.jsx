import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0 }}>
        <li>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/store" style={{ color: '#fff', textDecoration: 'none' }}>
            Store
          </Link>
        </li>
        <li>
          <Link to="/library" style={{ color: '#fff', textDecoration: 'none' }}>
            Library
          </Link>
        </li>
        <li>
          <Link to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>
            Cart
          </Link>
        </li>
        <li>
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
