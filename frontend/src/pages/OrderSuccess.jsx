import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, ArrowRight, Home, ShoppingBag, Star } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, total } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  return (
    <div className="success-page container">
      <div className="success-card glass-card">
        {/* Animated Checkmark */}
        <motion.div 
          className="check-circle-wrap"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
        >
          <div className="check-bg"></div>
          <CheckCircle size={80} color="white" strokeWidth={2.5} />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Order Placed Successfully!
        </motion.h1>

        <motion.p 
          className="success-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.7 }}
        >
          Hunger is on its way out! Your delicious meal is being prepared with love and care.
        </motion.p>

        <motion.div 
          className="order-info-strip"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="info-item">
            <span>Order ID</span>
            <strong>#{orderId?.slice(-8).toUpperCase()}</strong>
          </div>
          <div className="info-item">
            <span>Amount Paid</span>
            <strong>₹{total}</strong>
          </div>
          <div className="info-item">
            <span>Estimated Time</span>
            <strong>32 mins</strong>
          </div>
        </motion.div>

        <div className="action-buttons">
          <Link to="/track" className="btn-premium track-btn">
            <Truck size={20} /> Track Live Order
          </Link>
          <Link to="/" className="btn-secondary">
            <Home size={18} /> Back to Home
          </Link>
        </div>

        <div className="success-footer">
          <div className="footer-item">
            <Package size={18} />
            <span>Standard Quality Check </span>
          </div>
          <div className="footer-item">
            <Star size={18} />
            <span>Rate your experience</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .success-page { padding-top: 150px; padding-bottom: 80px; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top right, rgba(255, 77, 77, 0.05), transparent); }
        
        .success-card { max-width: 600px; width: 100%; padding: 4rem 2rem; text-align: center; border-radius: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.08); }
        
        .check-circle-wrap { width: 120px; height: 120px; margin: 0 auto 2.5rem; position: relative; display: flex; align-items: center; justify-content: center; }
        .check-bg { position: absolute; width: 100%; height: 100%; border-radius: 50%; background: #0ca678; box-shadow: 0 10px 30px rgba(12, 166, 120, 0.4); animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.1); opacity: 0.4; } 100% { transform: scale(1); opacity: 0.8; } }
        
        .success-card h1 { font-size: 2.2rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 1rem; color: var(--text-main); }
        .success-subtitle { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 3rem; line-height: 1.6; }
        
        .order-info-strip { background: #f8f9fa; border-radius: 20px; padding: 1.5rem; display: flex; justify-content: space-around; margin-bottom: 3rem; border: 1px solid #eee; }
        .info-item { display: flex; flex-direction: column; gap: 4px; }
        .info-item span { font-size: 0.75rem; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }
        .info-item strong { font-size: 1.1rem; color: var(--text-main); font-weight: 800; }
        
        .action-buttons { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 3rem; }
        .track-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 1.1rem; padding: 1.2rem; }
        .btn-secondary { background: #f1f3f5; color: var(--text-main); text-decoration: none; padding: 1rem; border-radius: 16px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 0.95rem; transition: 0.2s; }
        .btn-secondary:hover { background: #e9ecef; }
        
        .success-footer { display: flex; justify-content: center; gap: 2rem; border-top: 1px solid #eee; padding-top: 2rem; }
        .footer-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #aaa; font-weight: 600; }
        .footer-item svg { color: #fcc419; }

        @media (max-width: 480px) {
          .success-card { padding: 3rem 1.5rem; }
          .order-info-strip { flex-direction: column; gap: 1.5rem; }
          .success-card h1 { font-size: 1.8rem; }
        }
      `}} />
    </div>
  );
};

export default OrderSuccess;
