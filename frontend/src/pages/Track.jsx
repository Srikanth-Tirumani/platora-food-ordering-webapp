import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Bike, ChefHat, Package, ShoppingBag, MapPin, Phone, Clock, RefreshCw } from 'lucide-react';

const steps = [
  { key: 'placed',    label: 'Order Placed',       icon: <ShoppingBag size={22} />,  desc: 'Your order has been received.' },
  { key: 'confirmed', label: 'Order Confirmed',     icon: <CheckCircle2 size={22} />, desc: 'Restaurant accepted your order.' },
  { key: 'preparing', label: 'Being Prepared',      icon: <ChefHat size={22} />,      desc: 'Chef is cooking your food.' },
  { key: 'outfordelivery', label: 'Out for Delivery', icon: <Bike size={22} />,        desc: 'Rider is on the way!' },
  { key: 'delivered', label: 'Delivered',            icon: <Package size={22} />,      desc: 'Enjoy your meal! 🎉' },
];

const getStepIndex = (status) => {
  const map = { placed: 0, confirmed: 1, preparing: 2, outfordelivery: 3, delivered: 4 };
  return map[status?.toLowerCase().replace(/\s/g, '')] ?? 0;
};

const Track = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const fetch = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setOrders(data);
        if (data.length > 0) setSelected(data[0]);
      } catch (e) {
        console.error(e);
      } finally { setLoading(false); }
    };
    fetch();
  }, [user, navigate]);

  if (loading) return (
    <div className="track-loading">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
        <RefreshCw size={40} color="var(--primary-color)" />
      </motion.div>
      <p>Fetching your orders…</p>
    </div>
  );

  if (!loading && orders.length === 0) return (
    <div className="track-empty">
      <Package size={80} color="#eee" />
      <h2>No Orders Yet</h2>
      <p>Place your first order to track it here.</p>
      <Link to="/" className="btn-premium">Browse Menu</Link>
    </div>
  );

  const activeIdx = selected ? getStepIndex(selected.status) : 0;

  return (
    <div className="track-page container">
      <h1 className="track-title">Track Your Order</h1>

      <div className="track-layout">
        {/* Order List */}
        <div className="order-list-panel">
          <h3>Recent Orders</h3>
          {orders.map((o, i) => (
            <motion.div key={i} className={`order-mini-card ${selected?._id === o._id ? 'active' : ''}`} onClick={() => setSelected(o)} whileHover={{ x: 4 }}>
              <div className="mini-icon"><ShoppingBag size={18} /></div>
              <div>
                <p className="mini-id">#{o._id?.slice(-6).toUpperCase()}</p>
                <p className="mini-items">{o.orderItems?.length} item{o.orderItems?.length !== 1 ? 's' : ''} · ₹{o.totalPrice}</p>
              </div>
              <span className={`status-pill ${o.status?.toLowerCase().replace(/\s/g,'')}`}>{o.status || 'Placed'}</span>
            </motion.div>
          ))}
        </div>

        {/* Tracker Panel */}
        {selected && (
          <motion.div className="tracker-panel" key={selected._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            {/* Order Info */}
            <div className="order-info-card">
              <div>
                <p className="info-label">Order ID</p>
                <p className="info-value">#{selected._id?.slice(-8).toUpperCase()}</p>
              </div>
              <div>
                <p className="info-label">Total</p>
                <p className="info-value">₹{selected.totalPrice}</p>
              </div>
              <div>
                <p className="info-label">Items</p>
                <p className="info-value">{selected.orderItems?.length} item{selected.orderItems?.length !== 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="info-label">Status</p>
                <p className="info-value highlight">{selected.status || 'Placed'}</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="steps-container">
              {steps.map((step, i) => {
                const isDone = i < activeIdx;
                const isActive = i === activeIdx;
                return (
                  <div key={i} className="step-row">
                    <div className="step-col">
                      <motion.div
                        className={`step-circle ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
                        animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        {isDone ? <CheckCircle2 size={22} /> : isActive ? step.icon : <Circle size={22} />}
                      </motion.div>
                      {i < steps.length - 1 && <div className={`step-line ${isDone ? 'done' : ''}`} />}
                    </div>
                    <div className={`step-text ${isActive ? 'active-text' : ''} ${isDone ? 'done-text' : ''}`}>
                      <h4>{step.label}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery Address */}
            {selected.deliveryAddress && (
              <div className="delivery-addr-card">
                <MapPin size={18} color="var(--primary-color)" />
                <div>
                  <p className="info-label">Delivering to</p>
                  <p className="addr-text">{selected.deliveryAddress.addressLine1}, {selected.deliveryAddress.city} — {selected.deliveryAddress.postalCode}</p>
                </div>
              </div>
            )}

            {/* Items Summary */}
            <div className="ordered-items">
              <h4>Items Ordered</h4>
              {selected.orderItems?.map((item, i) => (
                <div key={i} className="ordered-item">
                  <span>{item.name} × {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .track-page { padding-top: 120px; padding-bottom: 80px; }
        .track-title { font-size: 2.2rem; font-weight: 900; margin-bottom: 2.5rem; }
        .track-loading, .track-empty { height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; text-align: center; padding-top: 80px; }
        .track-empty h2 { font-size: 1.8rem; font-weight: 800; margin-top: 1rem; }
        .track-empty p { color: var(--text-muted); margin-bottom: 1.5rem; }

        .track-layout { display: grid; grid-template-columns: 300px 1fr; gap: 2rem; align-items: start; }

        /* Order List */
        .order-list-panel { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 20px; padding: 1.5rem; }
        .order-list-panel h3 { font-size: 1rem; font-weight: 800; margin-bottom: 1.2rem; }
        .order-mini-card { display: flex; align-items: center; gap: 0.8rem; padding: 0.9rem; border-radius: 12px; cursor: pointer; transition: 0.2s; border: 1.5px solid transparent; margin-bottom: 0.6rem; }
        .order-mini-card:hover, .order-mini-card.active { background: #fff5f5; border-color: var(--primary-color); }
        .mini-icon { width: 36px; height: 36px; border-radius: 10px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; color: var(--primary-color); flex-shrink: 0; }
        .mini-id { font-weight: 800; font-size: 0.88rem; }
        .mini-items { font-size: 0.78rem; color: var(--text-muted); margin-top: 2px; }
        .status-pill { margin-left: auto; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 20px; background: #e9ecef; color: #495057; flex-shrink: 0; text-transform: capitalize; }
        .status-pill.delivered { background: #d3f9d8; color: #2f9e44; }
        .status-pill.outfordelivery { background: #fff3bf; color: #e67700; }

        /* Tracker */
        .tracker-panel { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 20px; padding: 2rem; }
        .order-info-card { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; background: #f8f9fa; border-radius: 16px; padding: 1.2rem; margin-bottom: 2.5rem; }
        .info-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; margin-bottom: 0.3rem; }
        .info-value { font-size: 0.95rem; font-weight: 800; }
        .info-value.highlight { color: var(--primary-color); }

        /* Steps */
        .steps-container { margin-bottom: 2rem; }
        .step-row { display: flex; gap: 1.2rem; }
        .step-col { display: flex; flex-direction: column; align-items: center; }
        .step-circle { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #eee; color: #ccc; flex-shrink: 0; background: white; transition: 0.3s; }
        .step-circle.done { background: #d3f9d8; border-color: #2f9e44; color: #2f9e44; }
        .step-circle.active { background: var(--primary-color); border-color: var(--primary-color); color: white; box-shadow: 0 0 0 6px rgba(255,77,77,0.15); }
        .step-line { width: 2px; flex: 1; min-height: 30px; background: #eee; margin: 4px 0; transition: 0.3s; }
        .step-line.done { background: #2f9e44; }
        .step-text { padding: 0.6rem 0 1.5rem; flex: 1; }
        .step-text h4 { font-size: 0.95rem; font-weight: 800; margin-bottom: 0.2rem; color: var(--text-muted); }
        .step-text p { font-size: 0.82rem; color: #aaa; }
        .step-text.active-text h4 { color: var(--primary-color); }
        .step-text.done-text h4 { color: #2f9e44; }

        /* Address */
        .delivery-addr-card { display: flex; align-items: flex-start; gap: 0.8rem; background: #fff5f5; border: 1px solid #ffcdd2; border-radius: 14px; padding: 1rem 1.2rem; margin-bottom: 1.5rem; }
        .addr-text { font-size: 0.88rem; font-weight: 600; color: var(--text-main); }

        /* Items */
        .ordered-items h4 { font-size: 0.95rem; font-weight: 800; margin-bottom: 0.8rem; }
        .ordered-item { display: flex; justify-content: space-between; font-size: 0.88rem; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); color: var(--text-muted); }
        .ordered-item:last-child { border-bottom: none; }

        @media (max-width: 800px) {
          .track-layout { grid-template-columns: 1fr; }
          .order-info-card { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) { .order-info-card { grid-template-columns: 1fr 1fr; } }
      `}} />
    </div>
  );
};

export default Track;
