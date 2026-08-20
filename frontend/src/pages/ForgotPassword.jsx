import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP/Reset
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMsg(`Success! For demo, your OTP is: ${data.otp}`);
      setStep(2);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In real app, we'd have a reset endpoint. For demo, we simulate success.
      alert('Password Reset Successful! You can now login.');
      navigate('/login');
    } catch {
      setError('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="auth-card glass-card">
        <Link to="/login" className="back-link"><ArrowLeft size={16} /> Back to Login</Link>
        <div className="auth-header">
          <ShieldCheck size={40} className="auth-icon" />
          <h2>Reset Password</h2>
          <p>{step === 1 ? 'Enter your email to receive an OTP' : 'Enter the OTP and your new password'}</p>
        </div>

        {error && <div className="error-msg">{error}</div>}
        {msg && <div className="success-msg">{msg}</div>}

        {step === 1 ? (
          <form onSubmit={handleSendOTP}>
            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="btn-premium auth-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <div className="input-group">
              <ShieldCheck className="input-icon" size={20} />
              <input type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            </div>
            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn-premium auth-btn" disabled={loading}>
              {loading ? 'Resetting...' : 'Update Password'}
            </button>
          </form>
        )}
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f8f9fa; padding: 2rem; }
        .auth-card { width: 100%; max-width: 450px; text-align: center; padding: 3rem 2rem; background: white !important; }
        .back-link { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem; font-weight: 500; }
        .auth-header h2 { font-size: 2rem; font-weight: 800; margin-top: 1rem; }
        .auth-header p { color: var(--text-muted); margin-bottom: 2rem; }
        .auth-icon { color: var(--primary-color); }
        .input-group { position: relative; margin-bottom: 1.5rem; }
        .input-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .input-group input { width: 100%; padding: 1rem 1rem 1rem 3rem; border-radius: 15px; border: 1px solid #eee; outline: none; transition: 0.3s; font-size: 1rem; }
        .input-group input:focus { border-color: var(--primary-color); }
        .auth-btn { width: 100%; margin-top: 1rem; }
        .success-msg { background: #e6fcf5; color: #0ca678; padding: 0.8rem; border-radius: 10px; margin-bottom: 1.5rem; font-size: 0.85rem; font-weight: 600; line-height: 1.4; }
        .error-msg { background: #fff5f5; color: #fa5252; padding: 0.8rem; border-radius: 10px; margin-bottom: 1.5rem; font-size: 0.85rem; font-weight: 600; }
      `}} />
    </div>
  );
};

export default ForgotPassword;
