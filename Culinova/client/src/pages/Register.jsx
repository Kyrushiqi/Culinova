import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import './Register.css';


export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const {username, email, password} = data
    try {
      const {data} = await axios.post('/register',{
        username, email, password
      })
      if (data.error){
        toast.error(data.error);
      } else {
        setData({})
        toast.success('Login Successful. Welcome!')
        navigate('/login')
      }

    } catch (error){
      console.log(error)
    }
  }

  return (
    <div className="container">
      <div className="register-box">
        <h2 className="title">Register</h2>
        <form onSubmit={registerUser}>
          <label className="label">Username:</label>
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />

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

          <button type="submit" className="button">Sign up</button>
        </form>
        <p className="signup-text">
          Already have an Account? <a href="/Login">Login</a>
        </p>
      </div>
    </div>
  );
}
