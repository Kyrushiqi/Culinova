import { useState, useEffect } from 'react'; // Added useEffect to run code on component mount
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'; 
import Home from './pages/Home'; 

import Register from './pages/Register';
import Login from './pages/Login';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  // useEffect hook to test the server connection when the app loads
  useEffect(() => {
    // Defines a function to make the API call
    const testServerConnection = async () => {
      try {
        // Initiates a connection to the server's /test endpoint
        const response = await axios.get('/test');
        // Logs the confirmation message received from the server
        console.log(response.data.message);
      } catch (error) {
        // Logs an error if the connection fails
        console.error("Failed to connect to the server:", error);
      }
    };

    // Calls the function to test the connection
    testServerConnection();
  }, []); // The empty array ensures this effect runs only once

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;