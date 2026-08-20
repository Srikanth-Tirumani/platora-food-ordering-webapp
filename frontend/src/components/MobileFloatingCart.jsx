import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const MobileFloatingCart = () => {
  const { cartItems, totalPrice } = useContext(CartContext);
  const location = useLocation();

  // Don't show floating cart on cart, checkout, payment or success pages
  const hiddenRoutes = ['/cart', '/checkout', '/payment', '/order-success'];
  const shouldHide = hiddenRoutes.includes(location.pathname);

  if (cartItems.length === 0 || shouldHide) return null;

  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <AnimatePresence>
      <motion.div 
        className="mobile-floating-cart-wrapper"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <Link to="/cart" className="mobile-floating-cart-btn">
          <div className="cart-left-info">
            <div className="cart-icon-bubble">
              <ShoppingBag size={18} />
              <span className="cart-count-badge">{totalQty}</span>
            </div>
            <div className="cart-price-info">
              <span className="cart-item-count">{totalQty} {totalQty === 1 ? 'ITEM' : 'ITEMS'}</span>
              <span className="cart-price-total">₹{totalPrice}</span>
            </div>
          </div>

          <div className="cart-right-action">
            <span>VIEW CART</span>
            <ArrowRight size={16} />
          </div>
        </Link>

        <style dangerouslySetInnerHTML={{ __html: `
          .mobile-floating-cart-wrapper {
            display: none;
            position: fixed;
            bottom: 74px; /* Right above bottom nav */
            left: 1rem;
            right: 1rem;
            z-index: 998;
            max-width: 460px;
            margin: 0 auto;
          }

          .mobile-floating-cart-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 0.75rem 1.2rem;
            border-radius: 16px;
            text-decoration: none;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.45);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .mobile-floating-cart-btn:active {
            transform: scale(0.98);
          }

          .cart-left-info {
            display: flex;
            align-items: center;
            gap: 0.8rem;
          }

          .cart-icon-bubble {
            position: relative;
            background: rgba(255, 255, 255, 0.2);
            width: 36px;
            height: 36px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .cart-count-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ff4d4d;
            color: white;
            font-size: 10px;
            font-weight: 800;
            padding: 2px 5px;
            border-radius: 10px;
            line-height: 1;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          }

          .cart-price-info {
            display: flex;
            flex-direction: column;
          }

          .cart-item-count {
            font-size: 0.68rem;
            font-weight: 800;
            letter-spacing: 0.5px;
            opacity: 0.9;
          }

          .cart-price-total {
            font-size: 1.05rem;
            font-weight: 900;
          }

          .cart-right-action {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.85rem;
            font-weight: 800;
            letter-spacing: 0.5px;
          }

          @media (max-width: 768px) {
            .mobile-floating-cart-wrapper {
              display: block;
            }
          }
        `}} />
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileFloatingCart;
