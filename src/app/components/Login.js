import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Login logic here. 

      // Redirect to /todo on successful login
      window.location.href = '/todo';

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h1>Login</h1>
          <div className="mb-3">
            <label htmlFor="usernameOrEmail" className="form-label">
              Username or Email
            </label>
            <input
              type="text"
              className="form-control"
              id="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <Link to="/todo" className="btn btn-primary" onClick={handleLogin}>
            Login
          </Link>
          <div className="mt-3">
            Don't have an account? <Link to="/">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
