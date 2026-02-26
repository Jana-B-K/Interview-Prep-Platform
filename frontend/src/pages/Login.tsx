import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { login as loginRequest } from '../services/auth.service';
import '../css/Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginRequest(loginFormData);
      login(response.accessToken, response.role);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        return;
      }
      setError('Login failed');
    }
  };

  return (
    <div className="login-container">
      <p className="title">Login</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={loginFormData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={loginFormData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <div className="error-message">{error}</div>
      <div className="redirect">
        <p>New user?</p>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login;
