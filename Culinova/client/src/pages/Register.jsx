import { useState } from "react";
import './Register.css';

export default function Register() {
  const [data, setData] = useState({
    name: '',
    password: '',
  });

  const registerUser = (e) => {
    e.preventDefault();
  };

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

          <button type="submit" className="button">Sign up</button>
        </form>
        <p className="signup-text">
          Already have an Account? <a href="#">Login</a>
        </p>
      </div>
    </div>
  );
}
