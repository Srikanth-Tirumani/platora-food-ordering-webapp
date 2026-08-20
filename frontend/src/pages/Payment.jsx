import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, Landmark, Banknote, ChevronRight, Lock, ShieldCheck, Loader2, CheckCircle2, QrCode, ArrowLeft } from 'lucide-react';
import upiQr from '../assets/upi_qr.jpg';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const { address, total, items } = location.state || {};
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!user || !user.token) {
      alert('Please log in to complete your payment.');
      navigate('/login');
      return;
    }
    if (!address || !total || !items) {
      navigate('/cart');
    }
  }, [user, address, total, items, navigate]);

  const paymentMethods = [
    { id: 'upi', name: 'UPI (PhonePe, Google Pay, BHIM)', icon: <Smartphone size={24} />, desc: 'Instant & Secure' },
    { id: 'card', name: 'Credit / Debit Cards', icon: <CreditCard size={24} />, desc: 'Visa, Mastercard, RuPay' },
    { id: 'nb', name: 'Net Banking', icon: <Landmark size={24} />, desc: 'All Major Banks' },
    { id: 'cod', name: 'Cash on Delivery', icon: <Banknote size={24} />, desc: 'Pay at your doorstep' },
  ];

  const handlePay = async () => {
    if (!user || !user.token) {
      alert('Please log in to complete your payment.');
      navigate('/login');
      return;
    }

    setProcessing(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      };
      
      const { data } = await axios.post('http://localhost:5000/api/orders', {
        orderItems: items,
        deliveryAddress: address,
        totalPrice: total,
        paymentMethod: selectedMethod === 'cod' ? 'COD' : 'Online',
        isPaid: selectedMethod !== 'cod'
      }, config);

      clearCart();
      navigate('/order-success', { state: { orderId: data._id || data.orderId, total } });
    } catch (err) {
      console.error('Payment / Order creation error:', err);
      const errMsg = err.response?.data?.message || err.message || 'Please try again.';
      alert('Payment Failed: ' + errMsg);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="payment-page container">
      <div className="checkout-header-nav">
        <button onClick={() => navigate(-1)} className="back-link"><ArrowLeft size={18} /> Back to Address</button>
        <div className="checkout-steps">
          <div className="step visited"><span>✓</span> Address</div>
          <div className="step-line active"></div>
          <div className="step active"><span>2</span> Payment</div>
        </div>
      </div>

      <div className="payment-grid">
        <div className="payment-left">
          <h2 className="section-title">Select Payment Method</h2>
          <div className="method-list">
            {paymentMethods.map(method => (
              <React.Fragment key={method.id}>
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  className={`method-card ${selectedMethod === method.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="method-radio">
                    {selectedMethod === method.id ? <CheckCircle2 size={24} color="var(--primary-color)" fill="var(--primary-color)" /> : <div className="circle-outline" />}
                  </div>
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-info">
                    <strong>{method.name}</strong>
                    <p>{method.desc}</p>
                  </div>
                </motion.div>
                
                {/* QR Code Section for UPI */}
                <AnimatePresence>
                  {selectedMethod === 'upi' && method.id === 'upi' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="qr-container glass-card"
                    >
                      <div className="qr-header">
                        <QrCode size={18} />
                        <span>Scan & Pay with any UPI App</span>
                      </div>
                      <div className="qr-image-wrap">
                        <img src={upiQr} alt="UPI QR Code" />
                      </div>
                      <p className="qr-footer">Instant verification after payment</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </div>

          <div className="safety-badge-row">
            <div className="badge-card"><ShieldCheck size={24} /> <span>100% Payment Protection</span></div>
            <div className="badge-card"><Lock size={24} /> <span>Secure SSL Encryption</span></div>
          </div>
        </div>

        <div className="payment-right">
          <div className="order-review-card glass-card">
            <h3>Final Order Review</h3>
            <div className="review-details">
              <div className="review-row">
                <span>Items</span>
                <span className="count">{items?.length} dishes</span>
              </div>
              <div className="review-row">
                <span>Deliver to</span>
                <span className="addr-short">{address?.type}: {address?.addressLine1}</span>
              </div>
              <div className="divider"></div>
              <div className="final-total-row">
                <span>Amount to Pay</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button 
              className="pay-btn btn-premium" 
              onClick={handlePay}
              disabled={processing}
            >
              {processing ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : `Pay ₹${total}`}
            </button>
            <p className="footer-note">Transactions are encrypted and secure.</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .payment-page { padding-top: 120px; padding-bottom: 80px; }
        .checkout-header-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 3rem; }
        .back-link { background: none; border: none; display: flex; align-items: center; gap: 8px; text-decoration: none; color: var(--text-muted); font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: 0.2s; }
        .back-link:hover { color: var(--primary-color); }

        /* Shared Steps Style */
        .checkout-steps { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 0; }
        .step { display: flex; align-items: center; gap: 0.8rem; font-weight: 800; color: #ccc; font-size: 1.1rem; }
        .step.active { color: var(--text-main); }
        .step.visited { color: #0ca678; }
        .step span { width: 32px; height: 32px; border-radius: 50%; background: #eee; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: #999; }
        .step.active span { background: var(--primary-color); color: white; box-shadow: 0 5px 15px rgba(255, 77, 77, 0.3); }
        .step.visited span { background: #0ca678; color: white; }
        .step-line { width: 60px; height: 2px; background: #eee; }
        .step-line.active { background: #0ca678; }

        .payment-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 4rem; align-items: flex-start; }
        .section-title { font-size: 1.8rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 2rem; }

        .method-list { display: flex; flex-direction: column; gap: 1.2rem; }
        .method-card { background: var(--card-bg); border: 2px solid var(--border-color); border-radius: 24px; padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; cursor: pointer; transition: 0.2s; }
        .method-card:hover { border-color: var(--primary-color); }
        .method-card.selected { border-color: var(--primary-color); background: #fff5f5; }
        
        .circle-outline { width: 24px; height: 24px; border-radius: 50%; border: 2px solid #ddd; }
        .method-icon { width: 48px; height: 48px; border-radius: 14px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; color: var(--primary-color); }
        .method-info strong { display: block; font-size: 1.1rem; margin-bottom: 3px; }
        .method-info p { margin: 0; color: var(--text-muted); font-size: 0.85rem; }

        /* QR Code Styling */
        .qr-container { margin: 1rem 0 2rem 4rem; padding: 1.5rem; border-radius: 20px; text-align: center; max-width: 250px; background: white; border: 1.5px dashed var(--primary-color); }
        .qr-header { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.8rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
        .qr-image-wrap { background: white; padding: 10px; border-radius: 12px; border: 1px solid #eee; margin-bottom: 0.8rem; }
        .qr-image-wrap img { width: 100%; border-radius: 8px; }
        .qr-footer { font-size: 0.75rem; color: #0ca678; font-weight: 700; }

        .safety-badge-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem; }
        .badge-card { display: flex; align-items: center; gap: 10px; background: #f8fcf9; border: 1px solid #e6fcf5; padding: 1.2rem; border-radius: 20px; color: #0ca678; font-size: 0.85rem; font-weight: 700; }

        /* Order Review Card */
        .order-review-card { padding: 2.2rem; border-radius: 30px; }
        .order-review-card h3 { font-size: 1.3rem; font-weight: 900; margin-bottom: 1.8rem; }
        .review-details { display: flex; flex-direction: column; gap: 1.2rem; }
        .review-row { display: flex; justify-content: space-between; font-size: 0.95rem; font-weight: 600; color: var(--text-muted); }
        .amount-to-pay { font-size: 1.3rem; font-weight: 900; color: var(--text-main); }
        .final-total-row { display: flex; justify-content: space-between; align-items: center; font-size: 1.4rem; font-weight: 900; color: var(--text-main); }
        .divider { border-top: 1px dashed var(--border-color); margin: 0.5rem 0; }
        
        .pay-btn { width: 100%; margin-top: 2.5rem; padding: 1.2rem; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; gap: 0.8rem; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .footer-note { text-align: center; margin-top: 1.2rem; font-size: 0.75rem; color: #aaa; font-weight: 600; }

        @media (max-width: 968px) {
          .payment-grid { grid-template-columns: 1fr; }
          .safety-badge-row { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

export default Payment;
