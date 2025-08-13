import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/userContext';

import logo from '../assets/logo.png';
import searchIcon from '../assets/search.png';
import profilePic from '../assets/profile-pic.png';
import '../components/Navbar.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [query, setQuery] = useState('');

  const isAuthPage = pathname === '/login' || pathname === '/register';

  const handleSignout = async () => {
    const username = user?.name || '';
    try {
      await axios.get('/logout');
      setUser(null);
      toast.success(`Signed out successfully${username ? `, ${username}` : ''}!`);
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const name = query.trim();
    if (!name) return toast.error('Type a recipe name to search.');

    try {
      // GET /api/recipes/by-name?name=<recipe_name>
      const { data } = await axios.get('/api/recipes/by-name', { params: { name } });

      const cookbook = data.cookbook_url || data.cookbook;
      if (cookbook) {
        window.location.assign(cookbook);
      } else if (data._id) {
        navigate(`/recipes/${data._id}`);
      } else {
        toast('Recipe found, but no link to open.', { icon: 'ℹ️' });
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        toast.error('No recipe found with that exact name.');
      } else {
        console.error(err);
        toast.error('Search failed. Please try again.');
      }
    }
  };

  return (
    <div className="nav-bar-container">
      <nav className="navbar custom-color">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logo} id="logo" alt="Culinova Logo" />
          </Link>

          {!isAuthPage && (
            <div className="navbar-right-section">
              {/* Wire the form + controlled input */}
              <Form className="d-flex" onSubmit={handleSearchSubmit}>
                <Form.Control
                  type="text"
                  placeholder="Search for recipes..."
                  className="search-bar"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search by exact recipe name"
                />
                <Button type="submit" className="search-btn" aria-label="Search">
                  <img src={searchIcon} id="search-icon" alt="Search" />
                </Button>
              </Form>

              {user ? (
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
                  <Dropdown.Item>Profile ({user.name})</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/cookbook">Your Cookbook</Dropdown.Item>
                  <Dropdown.Item onClick={handleSignout} className="logout">Logout</Dropdown.Item>
                </DropdownButton>
              ) : (
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
                  <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/register" className="register">Register</Dropdown.Item>
                </DropdownButton>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
