import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Truck, Package, RotateCcw, CreditCard, Clock, Phone, Mail, MapPin, Send } from 'lucide-react';

const faqs = [
  { q: 'How long does delivery take?', a: 'Our average delivery time is 25–35 minutes depending on your location and restaurant. You can track your order in real-time on the Track Order page.' },
  { q: 'Can I cancel my order?', a: 'You can cancel your order within 2 minutes of placing it. After that, the restaurant may have already started preparing it. Go to My Orders and tap Cancel.' },
  { q: 'How do I apply a coupon code?', a: 'Go to your Cart, find the Coupon section in the Order Summary panel, type your code and hit Apply. Valid codes give instant discounts.' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI (GPay, PhonePe, Paytm), all major Debit/Credit cards, Net Banking, and Cash on Delivery.' },
  { q: 'What is your refund policy?', a: 'If there is an issue with your order (wrong item, missing food, quality issues), we offer a full refund or reorder within 24 hours of delivery.' },
  { q: 'How do I change my delivery address?', a: 'Go to your Profile page anytime to add or update your delivery addresses. During checkout you can select from your saved addresses.' },
  { q: 'Is there a minimum order amount?', a: 'Most coupons have a minimum order amount specified on the Offers page. There\'s no minimum for placing a regular order.' },
  { q: 'How do I contact customer support?', a: 'You can reach us via the contact form on this page, email us at support@platora.com, or call us at +91 99859 26992 between 8AM–11PM.' },
];

const quickHelp = [
  { icon: <Truck size={22} />, title: 'Track Order', desc: 'See your live delivery status', link: '/track', color: '#ff4d4d' },
  { icon: <Package size={22} />, title: 'My Orders', desc: 'View all past orders', link: '/orders', color: '#ff9933' },
  { icon: <RotateCcw size={22} />, title: 'Refund Policy', desc: 'Learn about our refunds', link: '#', color: '#0ca678' },
  { icon: <CreditCard size={22} />, title: 'Payments', desc: 'Supported payment methods', link: '#', color: '#7950f2' },
];

const FAQItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className={`faq-item ${open ? 'open' : ''}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
      <button className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Support = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="support-page">

      {/* Hero */}
      <section className="support-hero">
        <div className="container support-hero-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="eyebrow">We're here to help</span>
            <h1>Help & <span className="gradient-text">Support</span></h1>
            <p>Find answers to common questions or reach out to our friendly team.</p>
          </motion.div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="container quick-help-section">
        <h2 className="section-h2">Quick Help</h2>
        <div className="quick-grid">
          {quickHelp.map((q, i) => (
            <motion.a href={q.link} key={i} className="quick-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}>
              <div className="quick-icon" style={{ background: `${q.color}18`, color: q.color }}>{q.icon}</div>
              <h3>{q.title}</h3>
              <p>{q.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* FAQ + Contact */}
      <section className="container faq-contact-section">
        {/* FAQ */}
        <div className="faq-panel">
          <h2 className="section-h2">Frequently Asked Questions</h2>
          <p className="section-sub">Everything you need to know about Platora.</p>
          <div className="faq-list">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} index={i} />)}
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-panel">
          <div className="contact-info-card">
            <h3>Contact Us Directly</h3>
            <div className="contact-item"><Phone size={16} /><span>+91 99859 26992 (8AM–11PM)</span></div>
            <div className="contact-item"><Mail size={16} /><span>support@platora.com</span></div>
            <div className="contact-item"><MapPin size={16} /><span>123 Ayur Vigyan Nagar, Delhi</span></div>
            <div className="contact-item"><Clock size={16} /><span>Response time: within 2 hours</span></div>
          </div>

          <div className="contact-form-card glass-card">
            <div className="form-header">
              <MessageCircle size={22} color="var(--primary-color)" />
              <h3>Send Us a Message</h3>
            </div>
            {sent && (
              <motion.div className="sent-banner" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                ✅ Message sent! We'll reply within 2 hours.
              </motion.div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Ravi Kumar" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="ravi@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required>
                  <option value="">Select a topic…</option>
                  <option>Order Issue</option>
                  <option>Refund Request</option>
                  <option>Wrong Item Delivered</option>
                  <option>Payment Problem</option>
                  <option>App / Website Bug</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Describe your issue in detail…" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
              </div>
              <button type="submit" className="btn-premium submit-btn">
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .support-page { padding-top: 80px; }
        .eyebrow { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; color: var(--primary-color); display: block; margin-bottom: 0.6rem; }
        .gradient-text { background: var(--gradient-main); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        .support-hero { background: linear-gradient(135deg, #1a1a1a, #2d1b69); padding: 5rem 1rem; text-align: center; color: white; }
        .support-hero-content h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: -2px; margin: 0.6rem 0 1rem; }
        .support-hero-content p { color: rgba(255,255,255,0.7); font-size: 1.1rem; }

        .quick-help-section { padding: 4rem 1rem; }
        .section-h2 { font-size: 1.8rem; font-weight: 900; margin-bottom: 0.5rem; letter-spacing: -1px; }
        .section-sub { color: var(--text-muted); margin-bottom: 2rem; }
        .quick-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 1.5rem; }
        .quick-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 20px; padding: 1.8rem; text-align: center; text-decoration: none; color: var(--text-main); transition: 0.3s; display: block; }
        .quick-card:hover { box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
        .quick-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }
        .quick-card h3 { font-weight: 800; font-size: 0.95rem; margin-bottom: 0.3rem; }
        .quick-card p { font-size: 0.82rem; color: var(--text-muted); }

        .faq-contact-section { padding: 0 1rem 5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        
        /* FAQ */
        .faq-list { margin-top: 2rem; display: flex; flex-direction: column; gap: 0.6rem; }
        .faq-item { border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; background: var(--card-bg); transition: box-shadow 0.2s; }
        .faq-item.open { box-shadow: 0 8px 25px rgba(255,77,77,0.1); border-color: var(--primary-color); }
        .faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1.1rem 1.4rem; background: none; border: none; cursor: pointer; font-size: 0.93rem; font-weight: 700; color: var(--text-main); text-align: left; gap: 1rem; }
        .faq-a { overflow: hidden; }
        .faq-a p { padding: 0 1.4rem 1.1rem; color: var(--text-muted); font-size: 0.88rem; line-height: 1.7; }

        /* Contact */
        .contact-info-card { background: var(--gradient-main); border-radius: 20px; padding: 2rem; color: white; margin-bottom: 1.5rem; }
        .contact-info-card h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 1.2rem; }
        .contact-item { display: flex; align-items: center; gap: 0.8rem; font-size: 0.88rem; margin-bottom: 0.9rem; opacity: 0.92; }
        .form-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.5rem; }
        .form-header h3 { font-size: 1rem; font-weight: 800; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.4rem; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); border-radius: 12px; background: var(--light-bg); outline: none; font-size: 0.88rem; color: var(--text-main); transition: 0.2s; font-family: inherit; resize: vertical; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--primary-color); background: white; }
        .submit-btn { display: flex; align-items: center; gap: 0.5rem; width: 100%; justify-content: center; }
        .sent-banner { background: #d3f9d8; color: #2f9e44; padding: 0.8rem 1rem; border-radius: 10px; font-weight: 700; font-size: 0.88rem; margin-bottom: 1rem; }

        @media (max-width: 1000px) { .faq-contact-section { grid-template-columns: 1fr; } .quick-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } .quick-grid { grid-template-columns: repeat(2, 1fr); } }
      `}} />
    </div>
  );
};

export default Support;
