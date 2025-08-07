import { useState } from "react";
import './Login.css';
import axios from 'axios';
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault()
    const {email, password} = data
    try {
      const {data} = await axios.post('/login', {
        email,
        password
      });

      if (data.error) {
        toast.error(data.error)
      } else {
        setData({
          
        });
        navigate('/cookbook')
      }
    } catch (error) {

    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">Login</h2>
        <form onSubmit={loginUser}>
          <label className="label">Email:</label>
          <input
            className="input"
            type="text"
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
          Don't have an account? <a href="/Register">Sign up</a>
        </p>
      </div>
    </div>
  );
}
