import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import searchIcon from '../assets/search.png';
import profilePic from '../assets/profile-pic.png';
import'../components/Navbar.css';

export default function Navbar() {
  return (
    <>
      <div className="nav-bar-container">
        <nav className="navbar custom-color">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src={logo} id="logo" alt="Culinova Logo" />
            </a>

            <form className="d-flex" role="search">
              <input
                className="form-control search-bar"
                type="search"
                placeholder="Search for recipes..."
              />

              <button className="btn btn-outline-success" type="submit">
                <img src={searchIcon} id="search-icon" alt="Search" />
              </button>

              <button className="btn btn-secondary" id="profile-pic-btn">
                <img src={profilePic} id="profile-pic" alt="Profile" />
              </button>
            </form>
          </div>
        </nav>
      </div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
    </>
  );
}
