import React from 'react';
// import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav } from './styled';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <Nav>
        <Link to="/">
          <p>Home</p>
        </Link>
        <span className="user">
          <Link to="/login">
            <p>Login</p>
          </Link>
          <Link to="/register">
            <p>Register</p>
          </Link>
        </span>
      </Nav>
    );
  }
  return (
    <Nav>
      <Link to="/">
        <p>Home</p>
      </Link>
      <span className="user">
        <Link to="/register">
          <p>Edit Account</p>
        </Link>
        <Link to="/logout">
          <p>Logout</p>
        </Link>
      </span>
    </Nav>
  );
}
