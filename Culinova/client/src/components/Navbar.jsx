import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import searchIcon from '../assets/search.png';
import profilePic from '../assets/profile-pic.png';
import'../components/Navbar.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function Navbar() {
  return (
    <>
      <div className="nav-bar-container">
        <nav className="navbar custom-color">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              <img src={logo} id="logo" alt="Culinova Logo" />
            </Link>

            {/*  
            <nav>
              <Link to="/">Home</Link>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
              <Link to="/cookbook">Cookbook</Link>
            </nav>
              */}
              
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

            <DropdownButton id="dropdown-basic-button"
              title={
                <img
                  src={profilePic}
                  alt="Profile"
                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                />
              }
            >
              <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Your Cookbook</Dropdown.Item>
              <Dropdown.Item href="#/action-3" className="logout">Logout</Dropdown.Item>
            </DropdownButton>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
