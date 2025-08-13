import { Routes, Route } from 'react-router-dom';

import ManageRecipesPage from './pages/ManageRecipesPage';
import Home from './pages/Home'; 
import Cookbook from './components/Cookbook';
import Register from './pages/Register';
import Login from './pages/Login';

import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContext, UserContextProvider } from '../context/userContext';

// Connects Frontend (React) and Backend (Express) vv
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Toaster position='bottom-right' toastOptions={{duration: 2000}} /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cookbook' element={<Cookbook />} />
        <Route path="/manage-recipes" element={<ManageRecipesPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;