import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="email"
        />
        <input
          type="text"
          placeholder="password"
        />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">Login</button>
      </div>
      <h5>
          <Link to="/signup">Don't have an account?</Link>
        </h5>
    </div>
  )
}

export default Login;