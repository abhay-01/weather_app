import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Weather Monitoring</h1>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/alerts">Alert Settings</Link>
      </div>
    </nav>
  );
}

export default Navbar;
