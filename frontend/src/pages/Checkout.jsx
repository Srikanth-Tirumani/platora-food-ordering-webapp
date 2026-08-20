import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2, Home, Briefcase, Map, Plus, ChevronRight, ArrowLeft, ShieldCheck, Clock } from 'lucide-react';

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddrIdx, setSelectedAddrIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  const deliveryFee = 35;
  const platformFee = 5;
  const grandTotal = totalPrice + deliveryFee + platformFee;

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const fetchAddresses = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
        const addrs = data.addresses || [];
        setAddresses(addrs);
        const defIdx = addrs.findIndex(a => a.isDefault);
        if (defIdx >= 0) setSelectedAddrIdx(defIdx);
      } catch {
        console.error('Failed to fetch addresses');
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, [user, navigate]);

  const getIcon = (type) => {
    if (type === 'Home') return <Home size={18} />;
    if (type === 'Work') return <Briefcase size={18} />;
    return <Map size={18} />;
  };

  const handleProceedToPayment = () => {
    if (addresses.length === 0) {
      alert('Please add a delivery address first');
      navigate('/profile');
      return;
    }
    // Pass order data to payment page via state or context
    navigate('/payment', { 
      state: { 
        address: addresses[selectedAddrIdx], 
        total: grandTotal,
        items: cartItems
      } 
    });
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems.length, navigate]);

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="checkout-page container">
      <div className="checkout-header-nav">
        <Link to="/cart" className="back-link"><ArrowLeft size={18} /> Back to Cart</Link>
        <div className="checkout-steps">
          <div className="step active"><span>1</span> Address</div>
          <div className="step-line"></div>
          <div className="step"><span>2</span> Payment</div>
        </div>
      </div>

      <div className="checkout-grid">
        {/* Left: Address Selection */}
        <div className="checkout-left">
          <div className="section-header">
            <h2 className="section-title">Select Delivery Address</h2>
            <Link to="/profile" className="add-new-btn"><Plus size={16} /> Add New</Link>
          </div>

          <div className="address-options">
            {loading ? (
              <div className="loading-shimmer">Loading addresses...</div>
            ) : addresses.length === 0 ? (
              <div className="no-address-card glass-card">
                <MapPin size={40} color="#ddd" />
                <p>No addresses found. Add one to continue.</p>
                <Link to="/profile" className="btn-premium small">Add Address</Link>
              </div>
            ) : (
              addresses.map((addr, i) => (
                <motion.div 
                  key={i}
                  whileTap={{ scale: 0.98 }}
                  className={`checkout-addr-card ${selectedAddrIdx === i ? 'selected' : ''}`}
                  onClick={() => setSelectedAddrIdx(i)}
                >
                  <div className="addr-check">
                    {selectedAddrIdx === i ? <CheckCircle2 size={24} color="var(--primary-color)" fill="var(--primary-color)" /> : <div className="circle-outline" />}
                  </div>
                  <div className="addr-icon-wrap">{getIcon(addr.type)}</div>
                  <div className="addr-text">
                    <div className="addr-type-row">
                      <strong>{addr.type}</strong>
                      {addr.isDefault && <span className="default-tag">Default</span>}
                    </div>
                    <p>{addr.addressLine1}</p>
                    <p>{addr.city}, {addr.postalCode}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="delivery-time-info glass-card">
            <Clock size={20} color="var(--primary-color)" />
            <div>
              <strong>Instant Delivery</strong>
              <p>Delivery in 25-35 mins to your selected location.</p>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Preview */}
        <div className="checkout-right">
          <div className="order-summary-card glass-card">
            <h3>Order Summary</h3>
            <div className="item-previews">
              {cartItems.map((item, idx) => (
                <div key={idx} className="mini-item">
                  <span>{item.qty} x {item.name}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            
            <div className="bill-calc">
              <div className="calc-row"><span>Item Total</span><span>₹{totalPrice}</span></div>
              <div className="calc-row"><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>
              <div className="calc-row"><span>Platform Fee</span><span>₹{platformFee}</span></div>
              <div className="divider"></div>
              <div className="calc-row grand"><span>Total to Pay</span><span>₹{grandTotal}</span></div>
            </div>

            <button className="payment-btn btn-premium" onClick={handleProceedToPayment}>
              Proceed to Payment <ChevronRight size={20} />
            </button>
            <p className="secure-text"><ShieldCheck size={14} /> 100% Secure Checkout</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .checkout-page { padding-top: 120px; padding-bottom: 80px; }
        .checkout-header-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 3rem; }
        .back-link { display: flex; align-items: center; gap: 8px; text-decoration: none; color: var(--text-muted); font-weight: 700; font-size: 0.9rem; transition: 0.2s; }
        .back-link:hover { color: var(--primary-color); }
        
        /* Steps */
        .checkout-steps { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 0; }
        .step { display: flex; align-items: center; gap: 0.8rem; font-weight: 800; color: #ccc; font-size: 1.1rem; }
        .step.active { color: var(--text-main); }
        .step span { width: 32px; height: 32px; border-radius: 50%; background: #eee; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: #999; }
        .step.active span { background: var(--primary-color); color: white; box-shadow: 0 5px 15px rgba(255, 77, 77, 0.3); }
        .step-line { width: 60px; height: 2px; background: #eee; }

        .checkout-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 4rem; align-items: flex-start; }
        
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .section-title { font-size: 1.8rem; font-weight: 900; letter-spacing: -1px; }
        .add-new-btn { display: flex; align-items: center; gap: 6px; color: var(--primary-color); font-weight: 800; text-decoration: none; border: 1.5px solid var(--primary-color); padding: 6px 15px; border-radius: 12px; font-size: 0.85rem; transition: 0.2s; }
        .add-new-btn:hover { background: var(--primary-color); color: white; }

        .address-options { display: flex; flex-direction: column; gap: 1.2rem; }
        .checkout-addr-card { background: var(--card-bg); border: 2px solid var(--border-color); border-radius: 24px; padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; cursor: pointer; transition: 0.2s; }
        .checkout-addr-card:hover { border-color: var(--primary-color); }
        .checkout-addr-card.selected { border-color: var(--primary-color); background: #fff5f5; }
        
        .circle-outline { width: 24px; height: 24px; border-radius: 50%; border: 2px solid #ddd; }
        .addr-icon-wrap { width: 48px; height: 48px; border-radius: 14px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: var(--primary-color); }
        .addr-text { flex: 1; }
        .addr-type-row { display: flex; align-items: center; gap: 10px; margin-bottom: 5px; }
        .addr-type-row strong { font-size: 1.1rem; }
        .default-tag { background: #e7f5ff; color: #228be6; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 6px; text-transform: uppercase; }
        .addr-text p { margin: 0; color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; }

        .delivery-time-info { margin-top: 2rem; padding: 1.5rem; display: flex; align-items: center; gap: 1rem; border-color: #e3fafc; background: #f0fff433; }
        .delivery-time-info strong { display: block; color: var(--text-main); }
        .delivery-time-info p { margin: 0; font-size: 0.85rem; color: var(--text-muted); }

        /* Right Summary */
        .order-summary-card { padding: 2rem; border-radius: 30px; }
        .order-summary-card h3 { font-size: 1.3rem; font-weight: 800; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
        .item-previews { display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.5rem; }
        .mini-item { display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-muted); font-weight: 600; }
        
        .bill-calc { display: flex; flex-direction: column; gap: 1rem; }
        .calc-row { display: flex; justify-content: space-between; font-size: 0.95rem; font-weight: 600; color: var(--text-muted); }
        .calc-row.grand { font-size: 1.4rem; font-weight: 900; color: var(--text-main); }
        .divider { border-top: 1px dashed var(--border-color); margin: 0.5rem 0; }

        .payment-btn { width: 100%; margin-top: 2.5rem; padding: 1.2rem; display: flex; align-items: center; justify-content: center; gap: 0.8rem; font-size: 1.1rem; }
        .secure-text { text-align: center; font-size: 0.8rem; color: #0ca678; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 5px; margin-top: 1rem; }

        .no-address-card { text-align: center; padding: 3rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; border: 2px dashed #eee; }
        
        @media (max-width: 968px) {
          .checkout-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

export default Checkout;
