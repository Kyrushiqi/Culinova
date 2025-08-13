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
      const { data } = await axios.get('/api/recipes/by-name', { params: { name } });

      navigate('/cookbook', { state: { openRecipeId: data._id } });
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
              {/* ✅ keep the input controlled and submit through the fixed handler */}
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
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
