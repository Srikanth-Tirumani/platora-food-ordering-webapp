import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Zap, Search, Tag, ShoppingBag, User } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const MobileBottomNav = () => {
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Hide bottom nav on payment/checkout flow if desired, or keep it everywhere
  const isCheckoutFlow = ['/payment', '/checkout', '/order-success'].includes(location.pathname);
  if (isCheckoutFlow) return null;

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/grocery/fruits-vegetables', label: 'Instamart', icon: Zap },
    { to: '/search', label: 'Search', icon: Search },
    { to: '/offers', label: 'Offers', icon: Tag },
    { 
      to: user ? '/profile' : '/login', 
      label: user ? 'Account' : 'Login', 
      icon: user ? User : User 
    },
  ];

  return (
    <>
      <nav className="mobile-bottom-nav">
        <div className="bottom-nav-container">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.to === '/' 
              ? location.pathname === '/' 
              : location.pathname.startsWith(item.to.split('/')[1] ? `/${item.to.split('/')[1]}` : item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive: routerActive }) => 
                  `bottom-nav-item ${isActive || routerActive ? 'active' : ''}`
                }
              >
                <div className="icon-wrapper">
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                  {item.label === 'Instamart' && <span className="instamart-dot"></span>}
                </div>
                <span className="nav-label">{item.label}</span>
                {(isActive) && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="active-indicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid var(--glass-border);
          z-index: 999;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.06);
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }

        body.dark-mode .mobile-bottom-nav {
          background: rgba(15, 23, 42, 0.94);
          border-top-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 -4px 25px rgba(0, 0, 0, 0.35);
        }

        .bottom-nav-container {
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: 100%;
          max-width: 500px;
          margin: 0 auto;
          padding: 0 0.5rem;
        }

        .bottom-nav-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 100%;
          text-decoration: none;
          color: var(--text-muted);
          transition: all 0.25s ease;
          gap: 3px;
          -webkit-tap-highlight-color: transparent;
        }

        .bottom-nav-item .icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .bottom-nav-item:active .icon-wrapper {
          transform: scale(0.85);
        }

        .bottom-nav-item.active {
          color: var(--primary-color);
          font-weight: 700;
        }

        .bottom-nav-item.active .icon-wrapper {
          transform: translateY(-2px);
        }

        .instamart-dot {
          position: absolute;
          top: -2px;
          right: -4px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ff9933;
          box-shadow: 0 0 6px #ff9933;
        }

        .nav-label {
          font-size: 0.7rem;
          letter-spacing: -0.2px;
          line-height: 1;
        }

        .active-indicator {
          position: absolute;
          top: 0;
          width: 32px;
          height: 3px;
          border-radius: 0 0 4px 4px;
          background: var(--gradient-main);
        }

        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: block;
          }
        }
      `}} />
    </>
  );
};

export default MobileBottomNav;
