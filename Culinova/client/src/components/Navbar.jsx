import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // 1. Import useLocation

import logo from '../assets/logo.png';
import searchIcon from '../assets/search.png';
import profilePic from '../assets/profile-pic.png';
import'../components/Navbar.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Navbar() {
  // 2. Get the current location object
  const { pathname } = location;

  // 3. Check if the current path is for login or register
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <>
      <div className="nav-bar-container">
        <nav className="navbar custom-color">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              <img src={logo} id="logo" alt="Culinova Logo" />
            </Link>
            
            {/* 4. Conditionally render the search bar and profile icon */}
            {!isAuthPage && (
              <div className="navbar-right-section">
                <Form inline className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Search for recipes..."
                    className="search-bar"
                  />
                  <Button type="submit" className="search-btn">
                    <img src={searchIcon} id="search-icon" alt="Search"/>
                  </Button>
                </Form>

                <DropdownButton 
                  id="dropdown-basic-button"
                  title={
                    <img
                      src={profilePic}
                      alt="Profile"
                      style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                    />
                  }
                >
                  <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/cookbook">Your Cookbook</Dropdown.Item>
                  <Dropdown.Item href="/" className="logout">Logout</Dropdown.Item>
                </DropdownButton>
              </div>
            )}

          </div>
        </nav>
      </div>
    </>
  );
}