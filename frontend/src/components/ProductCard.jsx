import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="product-card"
    >
      <div className="product-img">
        <img 
          src={product.image} 
          alt={product.name} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop';
          }}
        />
        <div className="rating-tag">
          <Star size={12} fill="white" /> {product.rating || '4.5'}
        </div>
        <div className={`diet-tag ${product.isVeg ? 'veg' : 'non-veg'}`}>
          <div className="dot"></div>
        </div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>
        <button onClick={() => addToCart(product)} className="add-btn">
          <Plus size={20} /> Add to Cart
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .product-card {
          background: white;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: 0.3s;
        }
        .product-img {
          height: 200px;
          position: relative;
        }
        .product-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .rating-tag {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 77, 77, 0.9);
          color: white;
          padding: 4px 10px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .diet-tag {
          position: absolute;
          top: 15px;
          left: 15px;
          background: white;
          padding: 4px;
          border-radius: 4px;
          border: 2px solid #0ca678;
        }
        .diet-tag.non-veg { border-color: #fa5252; }
        .diet-tag .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #0ca678;
        }
        .diet-tag.non-veg .dot { background: #fa5252; }
        .product-info {
          padding: 1.5rem;
          text-align: left;
        }
        .product-info h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--dark-bg);
        }
        .product-info .price {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-bottom: 1.5rem;
        }
        .add-btn {
          width: 100%;
          background: #f8f9fa;
          border: 1px solid #eee;
          padding: 0.8rem;
          border-radius: 15px;
          font-weight: 700;
          color: var(--dark-bg);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: 0.3s;
        }
        .add-btn:hover {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
          box-shadow: 0 5px 15px rgba(255, 77, 77, 0.2);
        }
      `}} />
    </motion.div>
  );
};

export default ProductCard;
