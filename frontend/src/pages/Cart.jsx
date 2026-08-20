import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus, Tag, ChevronRight, X, Info } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [showPromo, setShowPromo] = useState(false);

  const deliveryFee = cartItems.length > 0 ? 35 : 0;
  const platformFee = cartItems.length > 0 ? 5 : 0;
  const finalTotal = totalPrice + deliveryFee + platformFee;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart container">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="empty-content"
        >
          <div className="empty-illustration">
            <ShoppingBag size={120} strokeWidth={1} />
            <motion.div 
              className="pulse-circle"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
          <h2>Your cart feels a bit light</h2>
          <p>Go ahead and explore our top categories and add some delicious items!</p>
          <Link to="/" className="btn-premium">Browse Popular Food</Link>
        </motion.div>
        <style dangerouslySetInnerHTML={{ __html: `
          .empty-cart { height: 85vh; display: flex; align-items: center; justify-content: center; text-align: center; }
          .empty-content { max-width: 400px; }
          .empty-illustration { position: relative; width: 150px; height: 150px; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center; color: #eee; }
          .pulse-circle { position: absolute; width: 100%; height: 100%; border-radius: 50%; background: var(--primary-color); z-index: -1; }
          .empty-cart h2 { font-size: 2rem; font-weight: 900; margin-bottom: 1rem; color: var(--text-main); }
          .empty-cart p { color: var(--text-muted); margin-bottom: 2.5rem; line-height: 1.6; }
        `}} />
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <div className="cart-header">
        <Link to="/" className="back-btn"><ArrowLeft size={20} /> Continue Shopping</Link>
        <h1 className="page-title">Shopping Cart <span className="badge">{cartItems.length}</span></h1>
      </div>

      <div className="cart-main-grid">
        {/* LEFT: Item List */}
        <div className="cart-items-section">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div 
                key={item.name} 
                layout 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="cart-item-card"
              >
                <div className="item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="item-top">
                    <h3>{item.name}</h3>
                    <div className={`diet-icon ${item.isVeg ? 'veg' : 'non-veg'}`}></div>
                  </div>
                  <p className="item-price-unit">₹{item.price} per dish</p>
                  
                  <div className="item-controls">
                    <div className="qty-picker">
                      <button onClick={() => updateQty(item.name, Math.max(1, item.qty - 1))}><Minus size={16} /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.name, item.qty + 1)}><Plus size={16} /></button>
                    </div>
                    <button className="delete-btn" onClick={() => removeFromCart(item.name)}>
                      <Trash2 size={18} /> Remove
                    </button>
                  </div>
                </div>
                <div className="item-price-total">
                  ₹{item.price * item.qty}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="cart-safety-tip">
            <Info size={16} />
            <p>Order fresh and safe! We ensure 100% contactless delivery and high safety standards.</p>
          </div>
        </div>

        {/* RIGHT: Bill Details */}
        <div className="cart-summary-section">
          <div className="summary-card glass-card">
            <h3>Bill Details</h3>
            
            <div className="bill-rows">
              <div className="bill-row">
                <span>Item Total</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="bill-row">
                <span>Delivery Partner Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="bill-row">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="bill-row promo-row" onClick={() => setShowPromo(!showPromo)}>
                <span><Tag size={16} /> Have a coupon?</span>
                <ChevronRight size={16} className={showPromo ? 'rotate' : ''} />
              </div>
              
              <AnimatePresence>
                {showPromo && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="promo-input-wrap"
                  >
                    <input 
                      type="text" 
                      placeholder="Enter Coupon Code" 
                      value={couponCode} 
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <button onClick={() => alert('Coupons can be applied at Checkout')}>Apply</button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="divider"></div>
              
              <div className="bill-row total-row">
                <span>Grand Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <button 
              className="proceed-btn btn-premium" 
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout <ChevronRight size={20} />
            </button>
            
            <div className="trust-badges">
              <span title="FSSAI Licensed"><img src="https://upload.wikimedia.org/wikipedia/en/b/b2/FSSAI_logo.png" alt="FSSAI" /></span>
              <p>Safe & Secure Payments</p>
            </div>
          </div>

          <div className="policy-note">
            <p>Review your order and address on the next step. By proceeding, you agree to our Terms and Conditions.</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cart-page { padding-top: 120px; padding-bottom: 80px; min-height: 90vh; }
        .cart-header { margin-bottom: 3rem; }
        .back-btn { display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--text-muted); font-weight: 600; font-size: 0.95rem; margin-bottom: 1rem; transition: 0.2s; }
        .back-btn:hover { color: var(--primary-color); }
        .page-title { font-size: 2.5rem; font-weight: 900; letter-spacing: -1.5px; display: flex; align-items: center; gap: 1rem; }
        .page-title .badge { background: var(--primary-color); color: white; font-size: 1rem; padding: 4px 12px; border-radius: 30px; letter-spacing: 0; }

        .cart-main-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 3rem; align-items: flex-start; }

        /* Items Section */
        .cart-items-section { display: flex; flex-direction: column; gap: 1.5rem; }
        .cart-item-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 24px; padding: 1.5rem; display: flex; gap: 1.5rem; align-items: center; position: relative; }
        .item-img { width: 100px; height: 100px; border-radius: 18px; overflow: hidden; flex-shrink: 0; }
        .item-img img { width: 100%; height: 100%; object-fit: cover; }
        .item-details { flex: 1; }
        .item-top { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.4rem; }
        .item-top h3 { font-size: 1.25rem; font-weight: 800; }
        .diet-icon { width: 12px; height: 12px; border-radius: 2px; border: 2px solid #0ca678; padding: 2px; position: relative; }
        .diet-icon::after { content: ''; position: absolute; width: 6px; height: 6px; background: #0ca678; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .diet-icon.non-veg { border-color: #fa5252; }
        .diet-icon.non-veg::after { background: #fa5252; }
        
        .item-price-unit { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.2rem; }
        .item-controls { display: flex; align-items: center; gap: 2rem; }
        .qty-picker { display: flex; align-items: center; gap: 1rem; background: #f8f9fa; padding: 5px 15px; border-radius: 12px; border: 1px solid #eee; }
        .qty-picker button { background: none; border: none; font-weight: 900; color: var(--text-main); cursor: pointer; display: flex; align-items: center; }
        .qty-picker span { font-weight: 800; min-width: 20px; text-align: center; }
        .delete-btn { background: none; border: none; color: #fa5252; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 4px; cursor: pointer; opacity: 0.7; transition: 0.2s; }
        .delete-btn:hover { opacity: 1; text-decoration: underline; }
        .item-price-total { font-size: 1.3rem; font-weight: 900; color: var(--text-main); min-width: 80px; text-align: right; }

        .cart-safety-tip { display: flex; align-items: flex-start; gap: 0.8rem; background: #f1f3f5; padding: 1rem; border-radius: 16px; color: var(--text-muted); font-size: 0.85rem; }
        .cart-safety-tip svg { color: #5c7cfa; margin-top: 2px; }

        /* Summary Section */
        .summary-card { padding: 2rem; border-radius: 30px; position: sticky; top: 120px; }
        .summary-card h3 { font-size: 1.4rem; font-weight: 800; margin-bottom: 1.8rem; }
        .bill-rows { display: flex; flex-direction: column; gap: 1.2rem; }
        .bill-row { display: flex; justify-content: space-between; font-weight: 600; color: var(--text-muted); font-size: 0.95rem; }
        .promo-row { color: var(--primary-color); font-weight: 800; cursor: pointer; align-items: center; gap: 10px; }
        .promo-row .rotate { transform: rotate(90deg); }
        .promo-input-wrap { display: flex; gap: 0.5rem; margin-top: -0.5rem; }
        .promo-input-wrap input { flex: 1; padding: 0.8rem; border-radius: 12px; border: 1px dashed var(--primary-color); background: #fff5f5; outline: none; font-weight: 700; text-transform: uppercase; }
        .promo-input-wrap button { background: var(--dark-bg); color: white; border: none; padding: 0 1.2rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        
        .divider { border-top: 1.5px dashed var(--border-color); margin: 0.5rem 0; }
        .total-row { font-size: 1.5rem; font-weight: 900; color: var(--text-main); }
        .proceed-btn { width: 100%; margin-top: 2rem; padding: 1.2rem; font-size: 1.1rem; display: flex; items-center; justify-content: center; gap: 0.8rem; }
        
        .trust-badges { margin-top: 2rem; text-align: center; border-top: 1px solid #eee; padding-top: 1.5rem; }
        .trust-badges img { height: 20px; opacity: 0.5; margin-bottom: 0.5rem; }
        .trust-badges p { font-size: 0.75rem; color: #aaa; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        
        .policy-note { margin-top: 1.5rem; font-size: 0.8rem; color: #aaa; text-align: center; line-height: 1.5; }

        @media (max-width: 1024px) {
          .cart-main-grid { grid-template-columns: 1fr; }
          .summary-card { position: static; }
        }
        @media (max-width: 640px) {
          .cart-item-card { flex-direction: column; text-align: center; }
          .item-top { justify-content: center; }
          .item-controls { flex-direction: column; gap: 1rem; }
          .item-price-total { text-align: center; }
        }
      `}} />
    </div>
  );
};

export default Cart;
