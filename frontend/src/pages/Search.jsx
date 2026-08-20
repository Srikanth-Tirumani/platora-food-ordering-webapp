import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { foodData } from '../data';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, Search as SearchIcon, Filter, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [vegOnly, setVegOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Flatten and filter
  const filteredItems = useMemo(() => {
    const allItems = Object.values(foodData).flat();
    return allItems.filter(item => {
      const matchQuery = item.name.toLowerCase().includes(query);
      const matchPrice = item.price <= maxPrice;
      const matchRating = item.rating >= minRating;
      const matchVeg = vegOnly ? item.isVeg === true : true;
      return matchQuery && matchPrice && matchRating && matchVeg;
    });
  }, [query, maxPrice, minRating, vegOnly]);

  return (
    <div className="search-page container">
      <div className="search-nav">
        <Link to="/" className="back-link"><ArrowLeft size={18} /> Back to Home</Link>
        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          <Filter size={18} /> Filters { (maxPrice < 500 || minRating > 0 || vegOnly) && <span className="active-dot"></span> }
        </button>
      </div>
      
      <div className="search-header">
        <h1>Showing results for "<span className="highlight">{query}</span>"</h1>
        <p>{filteredItems.length} items found matching your criteria</p>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="filter-panel glass-card"
          >
            <div className="filter-grid">
              <div className="filter-group">
                <label>Max Price: ₹{maxPrice}</label>
                <input type="range" min="50" max="500" step="10" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              </div>
              <div className="filter-group">
                <label>Min Rating: {minRating}+ <Star size={14} fill="gold" color="gold" /></label>
                <div className="rating-btns">
                  {[0, 3, 4, 4.5].map(r => (
                    <button key={r} className={minRating === r ? 'active' : ''} onClick={() => setMinRating(r)}>{r === 0 ? 'All' : r+'+'}</button>
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <label>Dietary preference</label>
                <div className="veg-toggle" onClick={() => setVegOnly(!vegOnly)}>
                  <div className={`toggle-track ${vegOnly ? 'active' : ''}`}>
                    <div className="toggle-thumb"></div>
                  </div>
                  <span>Veg Only</span>
                </div>
              </div>
              <button className="reset-btn" onClick={() => { setMaxPrice(500); setMinRating(0); setVegOnly(false); }}>Reset Filters</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredItems.length > 0 ? (
        <div className="product-grid">
          {filteredItems.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <SearchIcon size={60} color="#ccc" />
          <h2>No items match your filters</h2>
          <p>Try adjusting your price range or rating filters.</p>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .search-page { padding-top: 120px; padding-bottom: 80px; min-height: 80vh; }
        .search-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .back-link { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--text-muted); font-weight: 500; }
        .filter-toggle { background: white; border: 1.5px solid #eee; padding: 0.6rem 1.2rem; border-radius: 12px; display: flex; align-items: center; gap: 0.5rem; font-weight: 700; cursor: pointer; position: relative; }
        .active-dot { position: absolute; top: -5px; right: -5px; width: 10px; height: 10px; background: var(--primary-color); border-radius: 50%; border: 2px solid white; }
        
        .search-header { margin-bottom: 2rem; }
        .search-header h1 { font-size: 2.2rem; font-weight: 800; color: var(--dark-bg); }
        .highlight { color: var(--primary-color); }
        .search-header p { color: var(--text-muted); margin-top: 0.5rem; }

        .filter-panel { padding: 2rem; margin-bottom: 3rem; overflow: hidden; }
        .filter-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; align-items: flex-end; }
        .filter-group label { display: block; font-size: 0.9rem; font-weight: 700; margin-bottom: 1rem; color: var(--dark-bg); }
        .filter-group input[type="range"] { width: 100%; accent-color: var(--primary-color); }
        
        .rating-btns { display: flex; gap: 0.5rem; }
        .rating-btns button { flex: 1; padding: 0.5rem; border-radius: 8px; border: 1px solid #eee; background: white; cursor: pointer; font-weight: 600; font-size: 0.85rem; }
        .rating-btns button.active { background: var(--primary-color); color: white; border-color: var(--primary-color); }
        
        .veg-toggle { display: flex; align-items: center; gap: 0.8rem; cursor: pointer; }
        .toggle-track { width: 40px; height: 20px; background: #eee; border-radius: 20px; position: relative; transition: 0.3s; }
        .toggle-track.active { background: #0ca678; }
        .toggle-thumb { width: 14px; height: 14px; background: white; border-radius: 50%; position: absolute; top: 3px; left: 3px; transition: 0.3s; }
        .toggle-track.active .toggle-thumb { left: 23px; }
        .veg-toggle span { font-size: 0.9rem; font-weight: 600; }

        .reset-btn { color: var(--primary-color); background: none; border: none; font-weight: 700; cursor: pointer; padding-bottom: 5px; border-bottom: 1px dashed transparent; transition: 0.3s; }
        .reset-btn:hover { border-bottom-color: var(--primary-color); }

        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2.5rem; }
        .no-results { text-align: center; padding: 5rem 1rem; }
      `}} />
    </div>
  );
};

export default Search;
