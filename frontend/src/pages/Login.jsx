import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card glass-card"
      >
        <div className="auth-header">
          <LogIn size={40} className="auth-icon" />
          <h2>Welcome Back</h2>
          <p>Login to your Platora account</p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={submitHandler}>
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button type="submit" className="btn-premium auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login Now'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 2rem;
        }
        .auth-card {
          width: 100%;
          max-width: 450px;
          text-align: center;
          padding: 3rem 2rem;
          background: rgba(255, 255, 255, 0.7) !important;
        }
        .auth-header h2 { font-size: 2rem; font-weight: 800; margin-top: 1rem; }
        .auth-header p { color: var(--text-muted); margin-bottom: 2rem; }
        .auth-icon { color: var(--primary-color); }
        .error-msg {
          background: #ffe6e6;
          color: #d63031;
          padding: 0.8rem;
          border-radius: 10px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .input-group {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .input-group input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border-radius: 15px;
          border: 1px solid #eee;
          outline: none;
          transition: 0.3s;
          font-size: 1rem;
        }
        .input-group input:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 4px rgba(255, 77, 77, 0.1);
        }
        .forgot-link { text-align: right; margin-top: -0.5rem; margin-bottom: 1.5rem; }
        .forgot-link a { color: var(--text-muted); font-size: 0.85rem; text-decoration: none; font-weight: 500; }
        .forgot-link a:hover { color: var(--primary-color); }
        .auth-btn { width: 100%; margin-top: 1rem; font-size: 1.1rem; }
        .auth-footer { margin-top: 2rem; color: var(--text-muted); }
        .auth-footer a { color: var(--primary-color); font-weight: 700; text-decoration: none; }
      `}} />
    </div>
  );
};

export default Login;
