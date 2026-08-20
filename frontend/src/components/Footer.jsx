import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube, Send, ChevronRight, Smartphone } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  const handleSub = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubbed(true); setEmail(''); setTimeout(() => setSubbed(false), 3000); }
  };

  return (
    <footer className="site-footer">
      {/* Newsletter strip */}
      <div className="newsletter-strip">
        <div className="container newsletter-content">
          <div className="newsletter-text">
            <h3>🍕 Get Exclusive Deals in Your Inbox</h3>
            <p>Subscribe to get weekly offers, new restaurant alerts, and juicy discounts.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSub}>
            <input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} required />
            <button type="submit"><Send size={16} /> {subbed ? 'Subscribed!' : 'Subscribe'}</button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container footer-main">
        {/* Brand */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">Platora<span>.</span></Link>
          <p>Delivering happiness and delicious food right to your doorstep. India's fastest-growing food delivery platform.</p>
          <div className="social-links">
            <a href="https://facebook.com/platora" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="https://twitter.com/platora" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="https://instagram.com/platora" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://youtube.com/platora" target="_blank" rel="noopener noreferrer" aria-label="Youtube"><Youtube size={18} /></a>
          </div>
          <p className="rating-badge">⭐ 4.8 rated · 2M+ happy customers</p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/"><ChevronRight size={13} /> Home</Link></li>
            <li><Link to="/offers"><ChevronRight size={13} /> Offers & Deals</Link></li>
            <li><Link to="/track"><ChevronRight size={13} /> Track Order</Link></li>
            <li><Link to="/orders"><ChevronRight size={13} /> My Orders</Link></li>
            <li><Link to="/about"><ChevronRight size={13} /> About Us</Link></li>
            <li><Link to="/support"><ChevronRight size={13} /> Help & Support</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4>Food Categories</h4>
          <ul>
            <li><Link to="/menu/nonveg"><ChevronRight size={13} /> Non-Veg Starters</Link></li>
            <li><Link to="/menu/veg"><ChevronRight size={13} /> Veg Starters</Link></li>
            <li><Link to="/menu/maincourse"><ChevronRight size={13} /> Main Course</Link></li>
            <li><Link to="/menu/seafood"><ChevronRight size={13} /> Seafood</Link></li>
            <li><Link to="/menu/desserts"><ChevronRight size={13} /> Desserts</Link></li>
            <li><Link to="/menu/beverages"><ChevronRight size={13} /> Beverages</Link></li>
          </ul>
        </div>

        {/* Contact + App */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <div className="contact-list">
            <span><Phone size={15} /> +91 99859 26992</span>
            <span><Mail size={15} /> support@platora.com</span>
            <span><MapPin size={15} /> 123 Ayur Vigyan Nagar, Delhi</span>
          </div>

          <h4 style={{ marginTop: '1.8rem' }}>Download App</h4>
          <div className="app-badges">
            <Link to="/support" className="app-badge">
              <span className="badge-icon">🍎</span>
              <div><small>Download on the</small><strong>App Store</strong></div>
            </Link>
            <Link to="/support" className="app-badge">
              <span className="badge-icon">▶</span>
              <div><small>Get it on</small><strong>Google Play</strong></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>© 2026 Platora Technologies Pvt. Ltd. All Rights Reserved.</p>
          <div className="footer-legal">
            <Link to="/support">Privacy Policy</Link>
            <Link to="/support">Terms of Service</Link>
            <Link to="/support">Cookie Policy</Link>
          </div>
          <div className="payment-icons">
            <span title="Visa">VISA</span>
            <span title="Mastercard">MC</span>
            <span title="UPI">UPI</span>
            <span title="PayTM">Paytm</span>
            <span title="RuPay">RuPay</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .site-footer { background: #0f0f0f; color: #aaa; margin-top: 0; }

        /* Newsletter strip */
        .newsletter-strip { background: linear-gradient(135deg, var(--primary-color), #ff9933); padding: 2.5rem 0; }
        .newsletter-content { display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
        .newsletter-text h3 { color: white; font-size: 1.2rem; font-weight: 800; margin-bottom: 0.3rem; }
        .newsletter-text p { color: rgba(255,255,255,0.8); font-size: 0.88rem; }
        .newsletter-form { display: flex; gap: 0; flex-shrink: 0; }
        .newsletter-form input { padding: 0.75rem 1.2rem; border: none; border-radius: 12px 0 0 12px; outline: none; font-size: 0.88rem; width: 280px; background: rgba(255,255,255,0.95); }
        .newsletter-form button { padding: 0.75rem 1.3rem; background: #1a1a1a; color: white; border: none; border-radius: 0 12px 12px 0; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; font-size: 0.88rem; transition: 0.2s; }
        .newsletter-form button:hover { background: #333; }

        /* Main footer */
        .footer-main { display: grid; grid-template-columns: 2fr 1fr 1fr 1.4fr; gap: 4rem; padding: 4rem 1rem; border-bottom: 1px solid #222; }
        .footer-col h4 { color: white; font-size: 0.95rem; font-weight: 800; margin-bottom: 1.2rem; }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
        .footer-col ul li a { color: #888; text-decoration: none; font-size: 0.87rem; display: flex; align-items: center; gap: 0.3rem; transition: 0.2s; }
        .footer-col ul li a:hover { color: var(--primary-color); padding-left: 4px; }

        .footer-logo { font-size: 2rem; font-weight: 900; color: white; text-decoration: none; letter-spacing: -1.5px; display: inline-block; margin-bottom: 1rem; }
        .footer-logo span { color: var(--primary-color); }
        .brand-col p { font-size: 0.87rem; line-height: 1.7; max-width: 300px; margin-bottom: 1.5rem; }
        .social-links { display: flex; gap: 0.7rem; margin-bottom: 1.2rem; }
        .social-links a { width: 38px; height: 38px; border-radius: 10px; background: #1e1e1e; color: #888; display: flex; align-items: center; justify-content: center; transition: 0.3s; text-decoration: none; border: 1px solid #2a2a2a; }
        .social-links a:hover { color: var(--primary-color); background: rgba(255,77,77,0.1); border-color: var(--primary-color); transform: translateY(-3px); }
        .rating-badge { font-size: 0.8rem; color: #666; }

        .contact-list { display: flex; flex-direction: column; gap: 0.7rem; }
        .contact-list span { display: flex; align-items: center; gap: 0.6rem; font-size: 0.87rem; }

        .app-badges { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.8rem; }
        .app-badge { display: flex; align-items: center; gap: 0.7rem; background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 12px; padding: 0.6rem 1rem; text-decoration: none; color: white; transition: 0.3s; }
        .app-badge:hover { border-color: var(--primary-color); background: rgba(255,77,77,0.08); }
        .badge-icon { font-size: 1.4rem; }
        .app-badge div { display: flex; flex-direction: column; }
        .app-badge small { font-size: 0.7rem; color: #888; }
        .app-badge strong { font-size: 0.88rem; font-weight: 800; }

        /* Footer bottom */
        .footer-bottom { padding: 1.5rem 1rem; }
        .footer-bottom-content { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; font-size: 0.8rem; color: #555; }
        .footer-legal { display: flex; gap: 1.5rem; }
        .footer-legal a { color: #555; text-decoration: none; transition: 0.2s; }
        .footer-legal a:hover { color: var(--primary-color); }
        .payment-icons { display: flex; gap: 0.5rem; }
        .payment-icons span { background: #1e1e1e; border: 1px solid #2a2a2a; padding: 3px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: 700; color: #777; }

        @media (max-width: 1024px) { .footer-main { grid-template-columns: 1fr 1fr; gap: 3rem; } }
        @media (max-width: 768px) {
          .newsletter-content { flex-direction: column; text-align: center; }
          .newsletter-form { width: 100%; flex-direction: column; gap: 0.5rem; }
          .newsletter-form input { width: 100%; border-radius: 12px; }
          .newsletter-form button { border-radius: 12px; justify-content: center; }
          .footer-main { grid-template-columns: 1fr; gap: 2.5rem; }
          .footer-bottom-content { flex-direction: column; text-align: center; }
        }
      `}} />
    </footer>
  );
};

export default Footer;
