import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, Truck, MapPin, Star, MessageSquare } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showReviewForm, setShowReviewForm] = useState(null); // orderId
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(data);
      } catch {
        console.error('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  const getStatusStep = (status) => {
    const steps = ['Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
    return steps.indexOf(status);
  };

  const handleReviewSubmit = async (order, itemName) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('http://localhost:5000/api/reviews', {
        productName: itemName,
        rating,
        comment
      }, config);
      alert('Review submitted successfully!');
      setShowReviewForm(null);
      setComment('');
    } catch {
      alert('Error submitting review');
    }
  };

  if (loading) return <div className="loader">Loading your orders...</div>;

  return (
    <div className="orders-page container">
      <h1 className="page-title">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="no-orders glass-card">
          <Package size={60} color="#ccc" />
          <h2>No orders yet</h2>
          <p>Hungry? Place your first order now!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <motion.div key={order._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="order-card glass-card">
              <div className="order-header">
                <div>
                  <span className="order-id">ID: #{order._id.slice(-6).toUpperCase()}</span>
                  <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="order-total">₹{order.totalPrice}</div>
              </div>

              {/* Status Tracker */}
              <div className="status-tracker">
                {['Placed', 'Preparing', 'Out for Delivery', 'Delivered'].map((status, index) => {
                  const currentStep = getStatusStep(order.status);
                  const isCompleted = index <= currentStep;
                  const isCurrent = index === currentStep;
                  
                  return (
                    <div key={status} className={`status-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                      <div className="step-circle">
                        {status === 'Placed' && <Clock size={16} />}
                        {status === 'Preparing' && <Package size={16} />}
                        {status === 'Out for Delivery' && <Truck size={16} />}
                        {status === 'Delivered' && <CheckCircle size={16} />}
                      </div>
                      <span>{status}</span>
                    </div>
                  );
                })}
              </div>

              <div className="order-address">
                <MapPin size={16} />
                <p>{order.deliveryAddress?.addressLine1}, {order.deliveryAddress?.city}</p>
              </div>

              <div className="order-items">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <span>{item.qty}x {item.name}</span>
                    {order.status === 'Delivered' && (
                      <button className="review-btn" onClick={() => setShowReviewForm({ orderId: order._id, itemName: item.name })}>
                        <Star size={14} /> Rate Item
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Review Modal-like overlay (simplified) */}
              {showReviewForm?.orderId === order._id && (
                <div className="review-form">
                  <h4>Review {showReviewForm.itemName}</h4>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={20} fill={s <= rating ? 'gold' : 'none'} color={s <= rating ? 'gold' : '#ccc'} onClick={() => setRating(s)} style={{ cursor: 'pointer' }} />
                    ))}
                  </div>
                  <textarea placeholder="Share your experience..." value={comment} onChange={(e) => setComment(e.target.value)} />
                  <div className="review-actions">
                    <button onClick={() => handleReviewSubmit(order, showReviewForm.itemName)} className="btn-premium small">Submit Review</button>
                    <button onClick={() => setShowReviewForm(null)} className="btn-cancel">Cancel</button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .orders-page { padding-top: 120px; padding-bottom: 80px; }
        .page-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 3rem; }
        
        .order-card { padding: 2rem; margin-bottom: 2rem; }
        .order-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
        .order-id { font-weight: 800; color: var(--dark-bg); margin-right: 1.5rem; }
        .order-date { color: var(--text-muted); font-size: 0.9rem; }
        .order-total { font-weight: 900; font-size: 1.5rem; color: var(--primary-color); }

        .status-tracker { display: flex; justify-content: space-between; margin: 3rem 0; position: relative; }
        .status-tracker::before { content: ''; position: absolute; top: 18px; left: 0; right: 0; height: 3px; background: #eee; z-index: 1; }
        .status-step { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; flex: 1; z-index: 2; position: relative; }
        .step-circle { width: 40px; height: 40px; background: white; border: 3px solid #eee; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ccc; transition: 0.3s; }
        .status-step span { font-size: 0.75rem; font-weight: 700; color: #ccc; text-align: center; }
        
        .status-step.completed .step-circle { border-color: #0ca678; color: #0ca678; }
        .status-step.completed span { color: #0ca678; }
        .status-step.current .step-circle { background: #0ca678; color: white; border-color: #0ca678; transform: scale(1.2); box-shadow: 0 0 15px rgba(12, 166, 120, 0.4); }
        .status-step.current span { color: var(--dark-bg); font-weight: 800; }

        .order-address { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; background: #f8f9fa; padding: 0.8rem; border-radius: 12px; }
        
        .order-items { display: grid; gap: 0.8rem; }
        .order-item { display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 0.95rem; }
        .review-btn { background: #e7f5ff; color: #228be6; border: none; padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; }
        
        .review-form { margin-top: 2rem; background: #f8f9fa; padding: 1.5rem; border-radius: 20px; border: 1px solid #eee; }
        .review-form textarea { width: 100%; height: 80px; margin-top: 1rem; padding: 0.8rem; border-radius: 12px; border: 1px solid #ddd; outline: none; }
        .star-rating { display: flex; gap: 0.3rem; margin: 1rem 0; }
        .review-actions { display: flex; gap: 1rem; margin-top: 1rem; }
        .btn-premium.small { padding: 0.6rem 1.2rem; font-size: 0.85rem; }
        .btn-cancel { background: none; border: none; font-weight: 700; color: var(--text-muted); cursor: pointer; }

        .no-orders { text-align: center; padding: 5rem; }
        .loader { text-align: center; padding: 5rem; font-weight: 700; color: var(--text-muted); }
      `}} />
    </div>
  );
};

export default Orders;
