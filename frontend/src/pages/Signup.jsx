import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Phone, Plus } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, phone, referralCode });
      register(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred during signup');
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
          <UserPlus size={40} className="auth-icon" />
          <h2>Join Platora</h2>
          <p>Start ordering delicious food today</p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={submitHandler}>
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Phone className="input-icon" size={20} />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
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
            <div className="input-icon-wrapper">
              <Plus className="input-icon" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Referral Code (Optional)" 
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
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
          <button type="submit" className="btn-premium auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up Now'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
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
        .auth-btn { width: 100%; margin-top: 1rem; font-size: 1.1rem; }
        .auth-footer { margin-top: 2rem; color: var(--text-muted); }
        .auth-footer a { color: var(--primary-color); font-weight: 700; text-decoration: none; }
      `}} />
    </div>
  );
};

export default Signup;
