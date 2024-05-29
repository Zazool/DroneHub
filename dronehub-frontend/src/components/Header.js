// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import DHLogoNoBG from '../Media/DHLogoNoBG.png';

const Header = () => {
  return (
    <header className="header">
      <img src={DHLogoNoBG} alt="Drone Hub Logo" style={{ height: '50px' }} />
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;