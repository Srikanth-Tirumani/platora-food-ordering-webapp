import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Copy, CheckCheck, Clock, Percent, Gift, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const offers = [
  {
    code: 'PLAT50',
    title: '₹50 OFF on First Order',
    desc: 'New to Platora? Get ₹50 off on your very first order above ₹199.',
    tag: 'New User',
    color: '#ff4d4d',
    min: '₹199',
    icon: <Gift size={22} />,
  },
  {
    code: 'FLAT20',
    title: '20% OFF on Every Order',
    desc: 'Flat 20% discount on all orders. Max discount up to ₹100.',
    tag: 'Hot Deal',
    color: '#ff9933',
    min: '₹299',
    icon: <Percent size={22} />,
  },
  {
    code: 'SPEED30',
    title: '₹30 OFF + Free Delivery',
    desc: 'Get ₹30 off and free delivery on orders placed between 12PM – 2PM.',
    tag: 'Lunch Special',
    color: '#0ca678',
    min: '₹149',
    icon: <Zap size={22} />,
  },
  {
    code: 'WEEKEND',
    title: '15% OFF — Weekends Only',
    desc: 'Enjoy 15% off on Saturday and Sunday. Party time!',
    tag: 'Weekend Offer',
    color: '#7950f2',
    min: '₹249',
    icon: <Tag size={22} />,
  },
  {
    code: 'PLATBDAY',
    title: 'Birthday Special — 25% OFF',
    desc: 'Celebrating your birthday? Get 25% off on your special day with proof.',
    tag: 'Birthday',
    color: '#e64980',
    min: '₹199',
    icon: <Gift size={22} />,
  },
  {
    code: 'FREEDELIVERY',
    title: 'Free Delivery All Day',
    desc: 'Zero delivery charges on all orders. No minimum order required.',
    tag: 'Limited Time',
    color: '#228be6',
    min: 'No Min',
    icon: <Zap size={22} />,
  },
];

import chickenBiryani from '../assets/food/chicken-biryani.jpg';

const banners = [
  {
    title: 'Monsoon Madness 🌧️',
    sub: 'Up to 40% off on hot soups & snacks',
    bg: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&auto=format&fit=crop',
    cta: 'Order Now',
    link: '/menu/soups',
  },
  {
    title: 'Late Night Bites 🌙',
    sub: 'Free delivery after 10 PM — every night',
    bg: 'linear-gradient(135deg, #2d1b69, #11998e)',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop',
    cta: 'Explore Pizza',
    link: '/menu/pizza',
  },
  {
    title: 'Biryani Bonanza 🍛',
    sub: 'Order 2 biryanis, get 1 free dessert',
    bg: 'linear-gradient(135deg, #c94b4b, #4b134f)',
    img: chickenBiryani,
    cta: 'Get Biryani',
    link: '/menu/maincourse',
  },
];

const CouponCard = ({ offer }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.div className="coupon-card" whileHover={{ y: -6 }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
      <div className="coupon-left" style={{ background: offer.color }}>
        <div className="coupon-icon">{offer.icon}</div>
        <span className="coupon-tag">{offer.tag}</span>
      </div>
      <div className="coupon-right">
        <h3>{offer.title}</h3>
        <p>{offer.desc}</p>
        <p className="coupon-min">Min Order: <strong>{offer.min}</strong></p>
        <div className="coupon-code-row">
          <div className="code-box" style={{ borderColor: offer.color }}>
            <span style={{ color: offer.color }}>{offer.code}</span>
          </div>
          <button className="copy-btn" onClick={copy} style={{ background: offer.color }}>
            {copied ? <><CheckCheck size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Offers = () => (
  <div className="offers-page">

    {/* Hero */}
    <section className="offers-hero">
      <div className="container offers-hero-content">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <span className="eyebrow">🔥 Limited Time Deals</span>
          <h1>Today's <span className="gradient-text">Hottest Offers</span></h1>
          <p>Save big on your favourite meals. New deals added every day!</p>
        </motion.div>
      </div>
    </section>

    {/* Promo Banners */}
    <section className="container promo-section">
      <h2 className="section-h2">Featured Deals</h2>
      <div className="promo-grid">
        {banners.map((b, i) => (
          <motion.div key={i} className="promo-banner" style={{ background: b.bg }} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.02 }}>
            <div className="promo-text">
              <h3>{b.title}</h3>
              <p>{b.sub}</p>
              <Link to={b.link} className="promo-cta">{b.cta} <ChevronRight size={15} /></Link>
            </div>
            <img src={b.img} alt={b.title} />
          </motion.div>
        ))}
      </div>
    </section>

    {/* Coupon Cards */}
    <section className="container coupons-section">
      <h2 className="section-h2">🎟️ Coupon Codes</h2>
      <p className="section-sub">Copy a code and apply it at checkout to claim your discount.</p>
      <div className="coupons-grid">
        {offers.map((o, i) => <CouponCard key={i} offer={o} />)}
      </div>
    </section>

    {/* Info banner */}
    <section className="offers-info-banner container">
      <motion.div className="info-banner-card" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <Clock size={32} color="var(--primary-color)" />
        <div>
          <h3>Offers Valid Today Only</h3>
          <p>Most of our special offers refresh daily. Bookmark this page and check back every morning for new deals!</p>
        </div>
      </motion.div>
    </section>

    <style dangerouslySetInnerHTML={{ __html: `
      .offers-page { padding-top: 80px; }
      .offers-hero { background: linear-gradient(135deg, #1a1a1a 0%, #2d1b69 100%); padding: 5rem 1rem; text-align: center; color: white; }
      .offers-hero-content h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; margin: 0.8rem 0 1rem; letter-spacing: -2px; }
      .offers-hero-content p { color: rgba(255,255,255,0.7); font-size: 1.1rem; }
      .gradient-text { background: var(--gradient-main); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .eyebrow { font-size: 0.82rem; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; color: var(--primary-color); display: block; margin-bottom: 0.6rem; }

      .promo-section, .coupons-section { padding: 4rem 1rem; }
      .section-h2 { font-size: 1.8rem; font-weight: 900; margin-bottom: 0.5rem; letter-spacing: -1px; }
      .section-sub { color: var(--text-muted); margin-bottom: 2.5rem; }
      
      .promo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 1.5rem; }
      .promo-banner { border-radius: 24px; padding: 2rem; overflow: hidden; display: flex; align-items: center; justify-content: space-between; transition: 0.3s; position: relative; }
      .promo-text { color: white; z-index: 1; }
      .promo-text h3 { font-size: 1.3rem; font-weight: 800; margin-bottom: 0.5rem; }
      .promo-text p { font-size: 0.85rem; opacity: 0.8; margin-bottom: 1rem; }
      .promo-cta { display: inline-flex; align-items: center; gap: 3px; background: rgba(255,255,255,0.2); color: white; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.82rem; font-weight: 700; text-decoration: none; backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.3); transition: 0.3s; }
      .promo-cta:hover { background: white; color: #1a1a1a; }
      .promo-banner img { width: 110px; height: 110px; object-fit: cover; border-radius: 16px; opacity: 0.9; flex-shrink: 0; }
      
      .coupons-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
      .coupon-card { display: flex; border-radius: 20px; overflow: hidden; border: 1px solid var(--border-color); background: var(--card-bg); box-shadow: 0 5px 20px rgba(0,0,0,0.04); }
      .coupon-left { width: 90px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.6rem; color: white; padding: 1rem; }
      .coupon-icon { background: rgba(255,255,255,0.2); width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
      .coupon-tag { font-size: 9px; font-weight: 800; text-transform: uppercase; text-align: center; letter-spacing: 0.5px; opacity: 0.9; }
      .coupon-right { padding: 1.4rem; flex: 1; }
      .coupon-right h3 { font-size: 0.98rem; font-weight: 800; margin-bottom: 0.4rem; }
      .coupon-right p { font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.5rem; }
      .coupon-min { font-size: 0.78rem !important; }
      .coupon-code-row { display: flex; align-items: center; gap: 0.6rem; margin-top: 0.8rem; }
      .code-box { border: 1.5px dashed; padding: 0.3rem 0.8rem; border-radius: 8px; font-size: 0.85rem; font-weight: 800; letter-spacing: 1px; }
      .copy-btn { display: flex; align-items: center; gap: 4px; color: white; border: none; padding: 0.3rem 0.8rem; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: 0.2s; }
      .copy-btn:hover { opacity: 0.85; }

      .offers-info-banner { padding: 0 1rem 4rem; }
      .info-banner-card { background: #fff8f0; border: 1px solid #ffd8a8; border-radius: 20px; padding: 2rem; display: flex; align-items: center; gap: 1.5rem; }
      .info-banner-card h3 { font-weight: 800; margin-bottom: 0.3rem; }
      .info-banner-card p { color: var(--text-muted); font-size: 0.9rem; }

      @media (max-width: 900px) { .promo-grid { grid-template-columns: 1fr; } .coupons-grid { grid-template-columns: 1fr; } }
      @media (max-width: 600px) { .promo-banner img { width: 80px; height: 80px; } }
    `}} />
  </div>
);

export default Offers;
