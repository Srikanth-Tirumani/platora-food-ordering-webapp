import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Award, MapPin, Bike, Star, Heart, ShieldCheck, Leaf,
  ChevronRight, Clock, TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import srikanthImg from '../assets/srikanth.jpg';

const stats = [
  { icon: <Users size={28} />, value: '2M+', label: 'Happy Customers' },
  { icon: <TrendingUp size={28} />, value: '50K+', label: 'Orders Daily' },
  { icon: <MapPin size={28} />, value: '120+', label: 'Cities Served' },
  { icon: <Bike size={28} />, value: '10K+', label: 'Delivery Partners' },
];

const values = [
  { icon: <Heart size={28} />, title: 'Made with Love', desc: 'Every meal is prepared by passionate chefs who care about taste and quality.' },
  { icon: <ShieldCheck size={28} />, title: 'Safe & Hygienic', desc: 'We maintain the highest standards of food safety and packaging hygiene.' },
  { icon: <Clock size={28} />, title: 'Lightning Fast', desc: 'Average delivery time of under 30 minutes — hot food at your door.' },
  { icon: <Leaf size={28} />, title: 'Eco Friendly', desc: 'Sustainable packaging and a commitment to reducing our carbon footprint.' },
];

const team = [
  { name: 'T J Srikanth', role: 'Founder & CEO', img: srikanthImg },
  { name: 'Priya Sharma', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop' },
  { name: 'Ravi Kumar', role: 'Head of Technology', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop' },
  { name: 'Sneha Patel', role: 'Chief Food Officer', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop' },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const About = () => (
  <div className="about-page">

    {/* Hero */}
    <section className="about-hero">
      <div className="hero-overlay" />
      <div className="container about-hero-content">
        <motion.span initial="hidden" animate="visible" variants={fadeUp} className="eyebrow">Our Story</motion.span>
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }}>
          Delivering More Than <br /><span className="gradient-text">Just Food</span>
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
          Platora was born from a simple belief — everyone deserves a delicious, home-cooked-quality meal, delivered fast.
        </motion.p>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }} className="hero-cta-group">
          <Link to="/" className="btn-premium">Explore Menu <ChevronRight size={18} /></Link>
          <Link to="/support" className="btn-outline">Contact Us</Link>
        </motion.div>
      </div>
    </section>

    {/* Stats Banner */}
    <section className="stats-section">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <motion.div key={i} className="stat-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div className="stat-icon">{s.icon}</div>
            <h2>{s.value}</h2>
            <p>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Mission */}
    <section className="mission-section container">
      <div className="mission-grid">
        <motion.div className="mission-text" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="eyebrow">Our Mission</span>
          <h2>Good Food. Delivered Right.</h2>
          <p>
            Founded in 2024, Platora started as a small weekend project in Hyderabad and quickly grew into one of India's fastest-growing food delivery platforms.
          </p>
          <p>
            We partner with the best local restaurants and street food vendors to bring authentic, fresh, and flavourful food to your doorstep — all at unbeatable prices.
          </p>
          <div className="mission-badges">
            <span>🏆 #1 Rated App — 2025</span>
            <span>⭐ 4.8 / 5 Average Rating</span>
            <span>🚀 Fastest Growing Platform</span>
          </div>
        </motion.div>
        <motion.div className="mission-img" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&auto=format&fit=crop" alt="Food" />
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="values-section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">What We Stand For</span>
          <h2>Our Core Values</h2>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <motion.div key={i} className="value-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }}>
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="team-section container">
      <div className="section-header">
        <span className="eyebrow">The People Behind Platora</span>
        <h2>Meet Our Team</h2>
      </div>
      <div className="team-grid">
        {team.map((m, i) => (
          <motion.div key={i} className="team-card" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }}>
            <div className="team-img-wrap"><img src={m.img} alt={m.name} /></div>
            <h3>{m.name}</h3>
            <p>{m.role}</p>
            <div className="team-social">
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"><TrendingUp size={14} /></a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="about-cta container">
      <motion.div className="cta-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2>Ready to Order? 🍕</h2>
        <p>Join 2 million+ happy customers enjoying fresh food every day.</p>
        <Link to="/" className="btn-premium">Browse Menu <ChevronRight size={18} /></Link>
      </motion.div>
    </section>

    <style dangerouslySetInnerHTML={{ __html: `
      .about-page { padding-top: 80px; overflow-x: hidden; }

      /* Hero */
      .about-hero {
        position: relative;
        min-height: 520px;
        display: flex;
        align-items: center;
        background: url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop') center/cover no-repeat;
      }
      .hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,26,0.85) 40%, rgba(255,77,77,0.6)); }
      .about-hero-content { position: relative; z-index: 2; padding: 5rem 1rem; color: white; max-width: 650px; }
      .about-hero-content h1 { font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 900; line-height: 1.1; margin: 0.8rem 0 1.2rem; letter-spacing: -2px; }
      .about-hero-content p { font-size: 1.15rem; color: rgba(255,255,255,0.8); margin-bottom: 2rem; line-height: 1.7; }
      .gradient-text { background: var(--gradient-main); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .eyebrow { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; color: var(--primary-color); }
      .hero-cta-group { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
      .btn-outline { padding: 0.8rem 1.5rem; border-radius: 30px; border: 2px solid white; color: white; text-decoration: none; font-weight: 700; transition: 0.3s; }
      .btn-outline:hover { background: white; color: #1a1a1a; }

      /* Stats */
      .stats-section { background: var(--gradient-main); padding: 3rem 0; }
      .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
      .stat-card { text-align: center; color: white; }
      .stat-icon { margin-bottom: 0.8rem; opacity: 0.9; }
      .stat-card h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 0.3rem; }
      .stat-card p { font-size: 0.9rem; opacity: 0.85; font-weight: 600; }

      /* Mission */
      .mission-section { padding: 6rem 1rem; }
      .mission-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
      .mission-text .eyebrow { display: block; margin-bottom: 0.8rem; }
      .mission-text h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1.5rem; letter-spacing: -1px; }
      .mission-text p { color: var(--text-muted); line-height: 1.8; margin-bottom: 1.2rem; }
      .mission-badges { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 2rem; }
      .mission-badges span { background: #f8f9fa; border: 1px solid #eee; padding: 0.4rem 0.9rem; border-radius: 20px; font-size: 0.82rem; font-weight: 700; }
      .mission-img img { width: 100%; border-radius: 30px; box-shadow: 0 30px 80px rgba(0,0,0,0.12); object-fit: cover; max-height: 450px; }

      /* Values */
      .values-section { background: var(--light-bg); padding: 6rem 1rem; }
      .section-header { text-align: center; margin-bottom: 4rem; }
      .section-header .eyebrow { display: block; margin-bottom: 0.8rem; }
      .section-header h2 { font-size: 2.5rem; font-weight: 900; letter-spacing: -1px; }
      .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
      .value-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 24px; padding: 2.5rem 2rem; text-align: center; transition: 0.3s; }
      .value-card:hover { border-color: var(--primary-color); box-shadow: 0 20px 50px rgba(255,77,77,0.1); }
      .value-icon { color: var(--primary-color); margin-bottom: 1.2rem; }
      .value-card h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 0.8rem; }
      .value-card p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; }

      /* Team */
      .team-section { padding: 6rem 1rem; }
      .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
      .team-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 24px; padding: 2rem; text-align: center; transition: 0.3s; }
      .team-img-wrap { width: 100px; height: 100px; border-radius: 50%; overflow: hidden; margin: 0 auto 1.2rem; border: 3px solid var(--primary-color); }
      .team-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
      .team-card h3 { font-weight: 800; margin-bottom: 0.3rem; }
      .team-card p { color: var(--text-muted); font-size: 0.85rem; }
      .team-social { margin-top: 1rem; }
      .team-social a { color: var(--primary-color); }

      /* CTA */
      .about-cta { padding: 6rem 1rem; }
      .cta-card { background: var(--gradient-main); border-radius: 30px; padding: 5rem; text-align: center; color: white; }
      .cta-card h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1rem; }
      .cta-card p { font-size: 1.1rem; opacity: 0.9; margin-bottom: 2rem; }
      .cta-card .btn-premium { background: white; color: var(--primary-color); box-shadow: 0 10px 30px rgba(0,0,0,0.2); display: inline-flex; align-items: center; gap: 0.5rem; }

      @media (max-width: 1024px) {
        .values-grid, .team-grid { grid-template-columns: repeat(2, 1fr); }
        .stats-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 768px) {
        .mission-grid { grid-template-columns: 1fr; gap: 2rem; }
        .values-grid, .team-grid { grid-template-columns: repeat(2, 1fr); }
        .cta-card { padding: 3rem 1.5rem; }
        .cta-card h2 { font-size: 1.8rem; }
      }
      @media (max-width: 500px) {
        .values-grid, .team-grid, .stats-grid { grid-template-columns: 1fr; }
      }
    `}} />
  </div>
);

export default About;
