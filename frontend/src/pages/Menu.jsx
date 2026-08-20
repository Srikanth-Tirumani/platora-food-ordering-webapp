import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { foodData } from '../data';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, Filter, Star, Clock, ShoppingBag, Zap, ChevronRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuCategories = [
  { id: "nonveg", name: "Non-Veg Starters", icon: "🍗", bannerBg: "linear-gradient(135deg, #c026d3, #db2777)" },
  { id: "veg", name: "Veg Starters", icon: "🥗", bannerBg: "linear-gradient(135deg, #059669, #10b981)" },
  { id: "soups", name: "Soups", icon: "🥣", bannerBg: "linear-gradient(135deg, #d97706, #f59e0b)" },
  { id: "seafood", name: "Fish & Seafood", icon: "🐟", bannerBg: "linear-gradient(135deg, #0284c7, #38bdf8)" },
  { id: "maincourse", name: "Main Course", icon: "🍛", bannerBg: "linear-gradient(135deg, #b45309, #d97706)" },
  { id: "noodles", name: "Noodles", icon: "🍜", bannerBg: "linear-gradient(135deg, #ea580c, #f97316)" },
  { id: "salads", name: "Salads", icon: "🥗", bannerBg: "linear-gradient(135deg, #16a34a, #22c55e)" },
  { id: "desserts", name: "Desserts", icon: "🍰", bannerBg: "linear-gradient(135deg, #e11d48, #f43f5e)" },
  { id: "beverages", name: "Beverages", icon: "🥤", bannerBg: "linear-gradient(135deg, #4f46e5, #6366f1)" },
  { id: "burgers", name: "Burgers", icon: "🍔", bannerBg: "linear-gradient(135deg, #d97706, #eab308)" },
  { id: "pizza", name: "Pizza", icon: "🍕", bannerBg: "linear-gradient(135deg, #dc2626, #ef4444)" },
];

const categoryNamesMap = {
  nonveg: "Non-Veg Starters",
  veg: "Veg Starters",
  soups: "Soups",
  seafood: "Fish & Seafood",
  maincourse: "Main Course",
  noodles: "Noodles",
  salads: "Salads",
  desserts: "Desserts",
  beverages: "Beverages",
  burgers: "Burgers",
  pizza: "Pizza",
};

const Menu = () => {
  const { category = "nonveg" } = useParams();
  const navigate = useNavigate();
  const rawItems = useMemo(() => foodData[category] || [], [category]);

  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentCatObj = menuCategories.find(c => c.id === category) || menuCategories[0];
  const categoryDisplayName = categoryNamesMap[category] || category;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category]);

  // Filter logic
  const items = useMemo(() => {
    return rawItems.filter(item => {
      const matchPrice = item.price <= maxPrice;
      const matchRating = item.rating >= minRating;
      const matchSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchPrice && matchRating && matchSearch;
    });
  }, [rawItems, maxPrice, minRating, searchQuery]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="menu-page-wrapper">
      {/* Top Banner with Back button & Breadcrumbs */}
      <div 
        className="menu-hero-banner"
        style={{ background: currentCatObj.bannerBg || "linear-gradient(135deg, #dc2626, #ef4444)" }}
      >
        <div className="container">
          <div className="menu-top-nav-row">
            <button onClick={handleBack} className="menu-back-btn" aria-label="Go back">
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            <div className="menu-breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <ChevronRight size={14} />
              <Link to="/menu/nonveg" className="breadcrumb-link">Menu</Link>
              <ChevronRight size={14} />
              <span className="breadcrumb-current">{categoryDisplayName}</span>
            </div>
          </div>

          <div className="menu-banner-main">
            <div>
              <div className="menu-badge-wrap">
                <span className="menu-category-tag">WHAT'S ON YOUR MIND</span>
                <span className="menu-eta-tag"><Zap size={14} /> 25-35 MINS DELIVERY</span>
              </div>
              <motion.h1 
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="menu-page-title"
              >
                {categoryDisplayName}
              </motion.h1>
              <p className="menu-subtitle">
                {rawItems.length} curated options • Sizzling hot & freshly prepared
              </p>
            </div>

            <div className="menu-highlights">
              <div className="highlight-pill">
                <Clock size={16} /> Fast Delivery
              </div>
              <div className="highlight-pill">
                <ShoppingBag size={16} /> Handpicked Quality
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container menu-body">
        {/* Category Quick Switcher Horizontal Bar */}
        <div className="menu-category-bar hide-scrollbar">
          {menuCategories.map((cat, idx) => {
            const isActive = cat.id === category;
            return (
              <Link
                to={`/menu/${cat.id}`}
                key={idx}
                className={`category-pill ${isActive ? "active" : ""}`}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-text">{cat.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Search & Filter Header Bar */}
        <div className="menu-controls-bar">
          <div>
            <h2 className="section-heading">Explore {categoryDisplayName}</h2>
            <p className="section-subtext">Showing {items.length} items available</p>
          </div>

          <div className="menu-actions">
            <div className="menu-search-box">
              <Search size={16} color="#64748b" />
              <input 
                type="text" 
                placeholder={`Search in ${categoryDisplayName}...`} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button className={`filter-toggle-btn ${showFilters ? 'open' : ''}`} onClick={() => setShowFilters(!showFilters)}>
              <Filter size={17} /> 
              <span>Filters</span> 
              { (maxPrice < 500 || minRating > 0) && <span className="active-filter-dot"></span> }
            </button>
          </div>
        </div>

        {/* Filter Drawer / Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="filter-panel-card"
            >
              <div className="filter-grid">
                <div className="filter-group">
                  <label>Max Price: ₹{maxPrice}</label>
                  <input type="range" min="30" max="500" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                </div>
                <div className="filter-group">
                  <label>Min Rating: {minRating > 0 ? `${minRating}+ ★` : 'All'}</label>
                  <div className="rating-btns">
                    {[0, 3, 4, 4.5].map(r => (
                      <button key={r} className={minRating === r ? 'active' : ''} onClick={() => setMinRating(r)}>
                        {r === 0 ? 'All' : `${r}+ ★`}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="reset-filter-btn" onClick={() => { setMaxPrice(500); setMinRating(0); setSearchQuery(''); }}>
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="menu-products-grid">
          {items.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
          {items.length === 0 && (
            <div className="no-items-state">
              <p>No delicious items match your search & filter criteria.</p>
              <button onClick={() => { setMaxPrice(500); setMinRating(0); setSearchQuery(''); }} className="btn-clear-filters">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .menu-page-wrapper {
          padding-top: 75px;
          min-height: 100vh;
          background: #f8f9fc;
          padding-bottom: 5rem;
        }
        .menu-hero-banner {
          padding: 3.5rem 1.5rem 3rem;
          color: white;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }
        .menu-top-nav-row {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .menu-back-btn {
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
        .menu-back-btn:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateX(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .menu-breadcrumb {
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
        .menu-banner-main {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .menu-badge-wrap {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
        }
        .menu-category-tag {
          background: #ff5200;
          color: white;
          font-size: 0.72rem;
          font-weight: 900;
          padding: 3px 8px;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }
        .menu-eta-tag {
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
        .menu-page-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 900;
          letter-spacing: -1.5px;
          margin-bottom: 0.4rem;
          text-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }
        .menu-subtitle {
          font-size: 1.05rem;
          font-weight: 500;
          opacity: 0.95;
        }
        .menu-highlights {
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
        .menu-body {
          margin-top: 1.8rem;
        }
        /* Horizontal Category Switcher Bar */
        .menu-category-bar {
          display: flex;
          gap: 0.8rem;
          overflow-x: auto;
          padding: 0.5rem 0.2rem 1.5rem;
          margin-bottom: 1.5rem;
          scroll-snap-type: x mandatory;
        }
        .category-pill {
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
        .category-pill:hover {
          border-color: #cbd5e1;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.06);
        }
        .category-pill.active {
          background: #1a1a2e;
          color: white;
          border-color: #1a1a2e;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .category-pill.active .cat-icon {
          transform: scale(1.15);
        }
        .menu-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
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
        .menu-actions {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }
        .menu-search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 8px 14px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .menu-search-box input {
          border: none;
          outline: none;
          font-size: 0.88rem;
          font-weight: 600;
          color: #1e293b;
          width: 170px;
        }
        .filter-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: white;
          border: 1px solid #e2e8f0;
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.88rem;
          color: #1e293b;
          cursor: pointer;
          position: relative;
          transition: 0.2s;
        }
        .filter-toggle-btn:hover, .filter-toggle-btn.open {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }
        .active-filter-dot {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 8px;
          height: 8px;
          background: var(--primary-color);
          border-radius: 50%;
          border: 2px solid white;
        }
        .filter-panel-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 15px rgba(0,0,0,0.04);
        }
        .filter-grid {
          display: flex;
          align-items: flex-end;
          gap: 2.5rem;
          flex-wrap: wrap;
        }
        .filter-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 0.6rem;
        }
        .filter-group input[type="range"] {
          width: 170px;
          accent-color: var(--primary-color);
        }
        .rating-btns {
          display: flex;
          gap: 0.4rem;
        }
        .rating-btns button {
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: white;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.8rem;
          color: #475569;
          transition: 0.2s;
        }
        .rating-btns button.active {
          background: #1a1a2e;
          color: white;
          border-color: #1a1a2e;
        }
        .reset-filter-btn {
          color: #ef4444;
          background: none;
          border: none;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.85rem;
          padding-bottom: 2px;
          border-bottom: 1px dashed #ef4444;
        }
        .menu-products-grid {
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
          .menu-hero-banner { padding: 2.5rem 1rem 2rem; }
          .menu-products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .menu-search-box input { width: 120px; }
        }
      `}} />
    </div>
  );
};

export default Menu;
