import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://td-api-3e6u.onrender.com/users", {
        email,
        password,
        username,
      });
      localStorage.setItem("token", response.data.token);
      setLoggedIn(true);
      // Redirect to home page
      window.location.href = "/todo";
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
      <div className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>.
      </div>
    </div>
  );
};

export default SignUp;
