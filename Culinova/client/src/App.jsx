import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/Home'; 
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContext, UserContextProvider } from '../context/userContext';
import Cookbook from './pages/Cookbook'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Navbar/>
      <Toaster position='bottom-right' toastOptions={{duration: 2000}} /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cookbook' element={<Cookbook />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;