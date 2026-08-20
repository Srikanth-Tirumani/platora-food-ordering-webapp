import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, Search, ArrowLeft, ChevronRight, Zap, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { foodData } from '../data';

const spotlightBrands = [
  { name: "KFC", icon: "🍗", bannerBg: "linear-gradient(135deg, #a51d24, #e11d48)", tag: "Crispy Chicken & Wings" },
  { name: "Domino's", icon: "🍕", bannerBg: "linear-gradient(135deg, #0055a5, #0078d4)", tag: "Hot Pizzas & Garlic Bread" },
  { name: "Subway", icon: "🥪", bannerBg: "linear-gradient(135deg, #008938, #059669)", tag: "Fresh Subs & Salads" },
  { name: "McDonalds", icon: "🍔", bannerBg: "linear-gradient(135deg, #d97706, #f59e0b)", tag: "Burgers, Fries & Shakes" },
  { name: "Burger King", icon: "👑", bannerBg: "linear-gradient(135deg, #b91c1c, #ea580c)", tag: "Flame-Grilled Whoppers" },
  { name: "Starbucks", icon: "☕", bannerBg: "linear-gradient(135deg, #006241, #047857)", tag: "Cold Brews, Shakes & Pastries" },
  { name: "Pizza Hut", icon: "🍕", bannerBg: "linear-gradient(135deg, #be123c, #e11d48)", tag: "Cheesy Pan Pizzas & Pastas" },
  { name: "Taco Bell", icon: "🌮", bannerBg: "linear-gradient(135deg, #6d28d9, #8b5cf6)", tag: "Tacos, Burritos & Quesadillas" },
];

const Brand = () => {
  const { brandName = "KFC" } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const currentBrandObj = spotlightBrands.find(
    b => b.name.toLowerCase() === brandName.toLowerCase()
  ) || {
    name: brandName,
    icon: "🍽️",
    bannerBg: "linear-gradient(135deg, #1e293b, #334155)",
    tag: "Signature Special Dishes",
  };

  // Mappings to get realistic looking curated dishes for each brand
  const getBrandProducts = () => {
    const b = brandName.toLowerCase();
    let items = [];
    if (b.includes('kfc')) {
      items = [
        foodData.burgers.find(i => i.isVeg === false),
        ...foodData.nonveg.filter(i => i.name.toLowerCase().includes('chicken') || i.name.toLowerCase().includes('wings') || i.name.toLowerCase().includes('popcorn') || i.name.toLowerCase().includes('lollipop'))
      ];
    } else if (b.includes('domino') || b.includes('pizza')) {
      items = [...foodData.pizza, ...foodData.beverages.slice(0, 3)];
    } else if (b.includes('mcdonald') || b.includes('burger')) {
      items = [...foodData.burgers, ...foodData.beverages.slice(0, 4)];
    } else if (b.includes('starbucks')) {
      items = [...foodData.beverages, ...foodData.desserts];
    } else if (b.includes('subway')) {
      items = [...foodData.salads, ...foodData.soups, ...foodData.veg.slice(0, 3)];
    } else if (b.includes('taco')) {
      items = [...foodData.nonveg.slice(0, 4), ...foodData.veg.slice(0, 4)];
    } else {
      items = [...foodData.maincourse, ...foodData.noodles];
    }
    
    return items.filter(Boolean).slice(0, 12);
  };

  const rawProducts = useMemo(() => getBrandProducts(), [brandName]);

  const products = useMemo(() => {
    if (!searchQuery) return rawProducts;
    return rawProducts.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rawProducts, searchQuery]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [brandName]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="brand-page-wrapper">
      {/* Top Banner with Back button, Badges, & Breadcrumbs */}
      <div 
        className="brand-hero-banner"
        style={{ background: currentBrandObj.bannerBg || "linear-gradient(135deg, #1e293b, #334155)" }}
      >
        <div className="container">
          <div className="brand-top-nav-row">
            <button onClick={handleBack} className="brand-back-btn" aria-label="Go back">
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            <div className="brand-breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <ChevronRight size={14} />
              <Link to="/" className="breadcrumb-link">Top Brands</Link>
              <ChevronRight size={14} />
              <span className="breadcrumb-current">{brandName}</span>
            </div>
          </div>

          <div className="brand-banner-main">
            <div>
              <div className="brand-badge-wrap">
                <span className="brand-category-tag">TOP BRANDS IN SPOTLIGHT</span>
                <span className="brand-rating-tag"><Star size={13} fill="currentColor" /> 4.5+ (10k+ ratings)</span>
              </div>
              <motion.h1 
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="brand-page-title"
              >
                {brandName}
              </motion.h1>
              <p className="brand-subtitle">
                {rawProducts.length} popular items • {currentBrandObj.tag || "Authentic taste & fast delivery"}
              </p>
            </div>

            <div className="brand-highlights">
              <div className="highlight-pill">
                <Clock size={16} /> 25-35 mins Delivery
              </div>
              <div className="highlight-pill">
                <MapPin size={16} /> Multiple Locations
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container brand-body">
        {/* Brand Quick Switcher Horizontal Bar */}
        <div className="brand-category-bar hide-scrollbar">
          {spotlightBrands.map((b, idx) => {
            const isActive = b.name.toLowerCase() === brandName.toLowerCase();
            return (
              <Link
                to={`/brand/${encodeURIComponent(b.name)}`}
                key={idx}
                className={`brand-pill ${isActive ? "active" : ""}`}
              >
                <span className="cat-icon">{b.icon}</span>
                <span className="cat-text">{b.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Search & Header Bar */}
        <div className="brand-controls-bar">
          <div>
            <h2 className="section-heading">Order from {brandName}</h2>
            <p className="section-subtext">Showing {products.length} exclusive menu items</p>
          </div>

          <div className="brand-search-box">
            <Search size={16} color="#64748b" />
            <input 
              type="text" 
              placeholder={`Search in ${brandName}...`} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="brand-products-grid">
          {products.map((item, idx) => (
            <ProductCard key={idx} product={item} />
          ))}
          {products.length === 0 && (
            <div className="no-items-state">
              <p>No menu items found matching "{searchQuery}".</p>
              <button onClick={() => setSearchQuery('')} className="btn-clear-filters">
                View All {brandName} Items
              </button>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .brand-page-wrapper {
          padding-top: 75px;
          min-height: 100vh;
          background: #f8f9fc;
          padding-bottom: 5rem;
        }
        .brand-hero-banner {
          padding: 3.5rem 1.5rem 3rem;
          color: white;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }
        .brand-top-nav-row {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .brand-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: white;
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .brand-back-btn:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateX(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .brand-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          opacity: 0.9;
        }
        .breadcrumb-link {
          color: white;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .breadcrumb-link:hover {
          opacity: 1;
          text-decoration: underline;
        }
        .breadcrumb-current {
          opacity: 1;
          font-weight: 700;
        }
        .brand-banner-main {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .brand-badge-wrap {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
        }
        .brand-category-tag {
          background: #ff5200;
          color: white;
          font-size: 0.72rem;
          font-weight: 900;
          padding: 3px 8px;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }
        .brand-rating-tag {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(8px);
          font-size: 0.75rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
          border: 1px solid rgba(255,255,255,0.3);
        }
        .brand-page-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 900;
          letter-spacing: -1.5px;
          margin-bottom: 0.4rem;
          text-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }
        .brand-subtitle {
          font-size: 1.05rem;
          font-weight: 500;
          opacity: 0.95;
        }
        .brand-highlights {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .highlight-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,0.25);
        }
        .brand-body {
          margin-top: 1.8rem;
        }
        /* Horizontal Brand Switcher Bar */
        .brand-category-bar {
          display: flex;
          gap: 0.8rem;
          overflow-x: auto;
          padding: 0.5rem 0.2rem 1.5rem;
          margin-bottom: 1.5rem;
          scroll-snap-type: x mandatory;
        }
        .brand-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 8px 18px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 30px;
          text-decoration: none;
          color: #334155;
          font-weight: 700;
          font-size: 0.9rem;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          transition: all 0.2s ease;
          scroll-snap-align: start;
        }
        .brand-pill:hover {
          border-color: #cbd5e1;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.06);
        }
        .brand-pill.active {
          background: #1a1a2e;
          color: white;
          border-color: #1a1a2e;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .brand-pill.active .cat-icon {
          transform: scale(1.15);
        }
        .brand-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.8rem;
          flex-wrap: wrap;
        }
        .section-heading {
          font-size: 1.6rem;
          font-weight: 900;
          color: #1a1a2e;
          letter-spacing: -0.5px;
        }
        .section-subtext {
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 500;
          margin-top: 2px;
        }
        .brand-search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 8px 14px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .brand-search-box input {
          border: none;
          outline: none;
          font-size: 0.88rem;
          font-weight: 600;
          color: #1e293b;
          width: 200px;
        }
        .brand-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 2rem;
        }
        .no-items-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 1rem;
          color: #64748b;
          font-weight: 600;
        }
        .btn-clear-filters {
          margin-top: 1rem;
          background: #1a1a2e;
          color: white;
          border: none;
          padding: 8px 18px;
          border-radius: 20px;
          font-weight: 700;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .brand-hero-banner { padding: 2.5rem 1rem 2rem; }
          .brand-products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .brand-search-box input { width: 140px; }
        }
      `}} />
    </div>
  );
};

export default Brand;
