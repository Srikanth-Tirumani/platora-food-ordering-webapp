import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, X } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useContext(LanguageContext);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="hero-section">
      <div className="container hero-content">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <span className="badge">Premium Delivery</span>
          <h1>{t.explore}</h1>
          <p>Eat Smart & Healthy. Discover the best food from top-rated restaurants, delivered fresh and hot to your doorstep.</p>
          <div className="hero-btns">
            <Link to="/menu/nonveg" className="btn-premium">View Menu <ArrowRight size={18} /></Link>
            <button className="btn-outline" onClick={() => setShowVideo(true)}><Play size={18} /> Watch Video</button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hero-image"
        >
          <img src="https://d2clawv67efefq.cloudfront.net/ccbp-responsive-website/healthy-food-plate-img.png" alt="Delicious Food" />
          <div className="floating-card c1">🔥 Popular Now</div>
          <div className="floating-card c2">⭐ Top Rated</div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showVideo && (
          <motion.div 
            className="video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
          >
            <motion.div 
              className="video-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-video" onClick={() => setShowVideo(false)}>
                <X size={24} />
              </button>
              <div className="video-wrapper">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/nLMEE7I90B0?autoplay=1" 
                  title="Platora App Promo" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-section {
          padding-top: 151px;
          padding-bottom: 80px;
          background: radial-gradient(circle at top right, rgba(255, 77, 77, 0.05), transparent),
                      radial-gradient(circle at bottom left, rgba(255, 153, 51, 0.05), transparent);
        }
        .hero-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4rem;
        }
        .hero-text { flex: 1; }
        .badge {
          background: rgba(255, 77, 77, 0.1);
          color: var(--primary-color);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.8rem;
          display: inline-block;
          margin-bottom: 1.5rem;
        }
        .hero-text h1 {
          font-size: 3.5rem;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: var(--text-main);
          font-weight: 900;
        }
        .highlight { color: var(--primary-color); }
        .hero-text p {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 500px;
        }
        .hero-btns { display: flex; gap: 1.5rem; }
        .hero-btns .btn-premium { text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
        .btn-outline {
          background: white;
          border: 1px solid #ddd;
          padding: 0.8rem 1.5rem;
          border-radius: 30px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-outline:hover { background: #f0f0f0; border-color: #bbb; }
        
        .hero-image { flex: 1; position: relative; }
        .hero-image img { width: 100%; filter: drop-shadow(0 20px 50px rgba(0,0,0,0.1)); }
        
        .floating-card {
          position: absolute;
          background: white;
          padding: 0.8rem 1.2rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          font-weight: 700;
          font-size: 0.9rem;
          animation: float 4s ease-in-out infinite;
        }
        .c1 { top: 10%; left: -5%; }
        .c2 { bottom: 10%; right: 5%; animation-delay: 2s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .video-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .video-modal-content {
          width: 100%;
          max-width: 800px;
          background: #000;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .close-video {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.5);
          border: none;
          color: white;
          border-radius: 50%;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: 0.2s;
        }
        .close-video:hover {
          background: rgba(255,255,255,0.2);
        }
        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
          height: 0;
        }
        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        @media (max-width: 968px) {
          .hero-content { flex-direction: column; text-align: center; }
          .hero-text h1 { font-size: 3rem; }
          .hero-text p { margin: 0 auto 2.5rem; }
          .hero-btns { justify-content: center; }
        }
      `}} />
    </div>
  );
};

export default Hero;
