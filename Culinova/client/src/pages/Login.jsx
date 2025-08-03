import { useState } from "react";
import './Login.css';
import axios from 'axios';

export default function Login() {
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const loginUser = (e) => {
    e.preventDefault();
    axios.get('/');
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">Login</h2>
        <form onSubmit={loginUser}>
          <label className="label">Username:</label>
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
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
