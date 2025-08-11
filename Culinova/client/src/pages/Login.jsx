import { useState, useContext } from "react"; 
import './Login.css';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import Navbar from "../components/Navbar";
import { UserContext } from "../../context/userContext"; 

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const {email, password} = data;
    try {
      const {data: responseData} = await axios.post('/login', {
        email,
        password
      });

      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({ email: '', password: '' });
        setUser(responseData);
        toast.success(`Welcome, ${responseData.name}!`);
        navigate('/');
      }
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="login-box">
          <h2 className="title">Login</h2>
          <form onSubmit={loginUser}>
            <label className="label">Email:</label>
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label className="label">Password:</label>
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button type="submit" className="button">Login</button>
          </form>
          <p className="signup-text">
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </>
  );
}