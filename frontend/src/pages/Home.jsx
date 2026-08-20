import React, { useRef } from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, Leaf, Tag, Store, Wallet, Headset, ChevronRight, PlayCircle, Flame, Smartphone, Star, Clock, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { foodData } from '../data';
import ProductCard from '../components/ProductCard';
import catBurger    from '../assets/food/burger-chicken.jpg';
import catPizza     from '../assets/food/pizza-margherita.jpg';
import catBeverages from '../assets/food/cold_coffee.png';
import grocSweet    from '../assets/food/chocolate-cake.jpg';

// ──────────────────────────────────────────────────────────────────
// Helper Components
// ──────────────────────────────────────────────────────────────────
const SearchIconComp = () => <div className="how-icon"><Smartphone size={24} /></div>;
const ShoppingBagIconComp = () => <div className="how-icon"><Wallet size={24} /></div>;
const CheckCircle2 = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

const categories = [
  { name: 'Non-Veg Starters', id: 'nonveg', image: 'https://d2clawv67efefq.cloudfront.net/ccbp-responsive-website/em-ginger-fried-img.png' },
  { name: 'Veg Starters', id: 'veg', image: 'https://d2clawv67efefq.cloudfront.net/ccbp-responsive-website/em-veg-starters-img.png' },
  { name: 'Soups', id: 'soups', image: 'https://d2clawv67efefq.cloudfront.net/ccbp-responsive-website/em-soup-img.png' },
  { name: 'Fish & Sea food', id: 'seafood', image: 'https://d2clawv67efefq.cloudfront.net/ccbp-responsive-website/em-grilled-seafood-img.png' },
  { name: 'Main Course', id: 'maincourse', image: 'https://d2clawv67efefq.cloudfront.net/ccbp-responsive-website/em-hyderabadi-biryani-img.png' },
  { name: 'Noodles', id: 'noodles', image: 'https://d2clawv67efefq.cloudfront.net/ccbp-responsive-website/em-mushroom-noodles-img.png' },
  { name: 'Salads', id: 'salads', image: 'https://d2clawv67efefq.cloudfront.net/ccbp-responsive-website/em-gluten-img.png' },
  { name: 'Desserts', id: 'desserts', image: 'https://d2clawv67efefq.cloudfront.net/ccbp-responsive-website/em-coffee-bourbon-img.png' },
  { name: 'Beverages', id: 'beverages', image: catBeverages },
  { name: 'Burgers', id: 'burgers', image: catBurger },
  { name: 'Pizza', id: 'pizza', image: catPizza },
];

const features = [
  { icon: <Truck />, title: 'Fast Delivery', text: 'Get your food hot & fresh in under 30 mins.' },
  { icon: <Leaf />, title: 'Fresh & Organic', text: 'Prepared with fresh, local ingredients.' },
  { icon: <Tag />, title: 'Best Offers', text: 'Exciting discounts and daily deals.' },
  { icon: <Store />, title: 'Top Rated', text: 'Order from verified best restaurants.' },
  { icon: <Wallet />, title: 'Easy Payments', text: 'UPI, cards, or cash on delivery.' },
  { icon: <Headset />, title: '24×7 Support', text: 'We are here to help anytime you need.' },
];

const howItWorks = [
  { step: '01', title: 'Choose Your Meal', desc: 'Browse through our extensive menu of local favorites.', icon: <SearchIconComp /> },
  { step: '02', title: 'Place Your Order', desc: 'Secure checkout with multiple payment options.', icon: <ShoppingBagIconComp /> },
  { step: '03', title: 'Live Tracking', desc: 'Follow your food map from kitchen to your door.', icon: <Clock /> },
  { step: '04', title: 'Enjoy Your Food', desc: 'Hot, fresh food delivered in record time.', icon: <Flame /> }
];

const testimonials = [
  { name: 'Rohit Sharma', text: 'Platora has completely changed how I order food. The delivery is consistently fast and the food is always hot!', rating: 5, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { name: 'Anjali Gupta', text: 'The best food delivery app in Delhi! I love the variety of restaurants and the exclusive discounts.', rating: 5, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { name: 'Vikram Singh', text: 'Tracking my order is so easy and accurate. Customer support is also very responsive and helpful.', rating: 4, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' }
];

const offersTabs = [
  { img: 'https://images.unsplash.com/photo-1541592106381-87e2b83b3cd1?w=800&auto=format&fit=crop', title: '50% OFF on Pizzas', code: 'PIZZA50' },
  { img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop', title: 'Combo Meals from ₹199', code: 'COMBO99' },
  { img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop', title: 'Flat ₹150 OFF', code: 'FLAT150' },
  { img: 'https://images.unsplash.com/photo-1626074353457-3f8d9b1db3c1?w=800&auto=format&fit=crop', title: 'Free Dessert', code: 'SWEETTREAT' },
];

const topBrands = [
  { name: 'KFC', img: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=500&h=500&fit=crop' },
  { name: "Domino's", img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=500&fit=crop' },
  { name: 'Subway', img: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=500&h=500&fit=crop' },
  { name: 'McDonalds', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop' },
  { name: 'Burger King', img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&h=500&fit=crop' },
  { name: 'Starbucks', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=500&fit=crop' },
  { name: 'Pizza Hut', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=500&fit=crop' },
  { name: 'Taco Bell', img: 'https://images.unsplash.com/photo-1564759077036-3def242e69c5?w=500&h=500&fit=crop' }
];

const groceries = [
  { 
    name: 'Fresh Vegetables', 
    discount: 'UP TO 35% OFF',
    time: '10-15 mins',
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop', 
    color: 'linear-gradient(135deg, #e8f8ec 0%, #c8f2d2 100%)',
    badgeColor: '#107c41'
  },
  { 
    name: 'Fresh Fruits', 
    discount: 'UP TO 40% OFF',
    time: '10-15 mins',
    img: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop', 
    color: 'linear-gradient(135deg, #fff6e5 0%, #fed7aa 100%)',
    badgeColor: '#d97706'
  },
  { 
    name: 'Dairy, Bread & Eggs', 
    discount: 'UP TO 25% OFF',
    time: '10-15 mins',
    img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop', 
    color: 'linear-gradient(135deg, #e8f4fd 0%, #bfdbfe 100%)',
    badgeColor: '#2563eb'
  },
  { 
    name: 'Munchies & Snacks', 
    discount: 'UP TO 30% OFF',
    time: '10-15 mins',
    img: 'https://images.unsplash.com/photo-1566478989037-eade3f8e8b50?w=500&auto=format&fit=crop', 
    color: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
    badgeColor: '#dc2626'
  },
  { 
    name: 'Cold Drinks & Juices', 
    discount: 'UP TO 30% OFF',
    time: '10-15 mins',
    img: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500&auto=format&fit=crop', 
    color: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
    badgeColor: '#7c3aed'
  },
  { 
    name: 'Sweet Cravings', 
    discount: 'UP TO 45% OFF',
    time: '10-15 mins',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop', 
    color: 'linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 100%)',
    badgeColor: '#db2777'
  },
  { 
    name: 'Atta, Rice & Dals', 
    discount: 'UP TO 20% OFF',
    time: '10-15 mins',
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=500&auto=format&fit=crop', 
    color: 'linear-gradient(135deg, #faf5ea 0%, #fef3c7 100%)',
    badgeColor: '#b45309'
  },
  { 
    name: 'Meat & Seafood', 
    discount: 'UP TO 35% OFF',
    time: '10-15 mins',
    img: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&auto=format&fit=crop', 
    color: 'linear-gradient(135deg, #fff1f2 0%, #fecdd3 100%)',
    badgeColor: '#e11d48'
  }
];

const collections = [
  { title: 'Late Night Delivery', places: '12 places', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=600&fit=crop' },
  { title: 'Healthy Food', places: '8 places', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=600&fit=crop' },
  { title: 'Sweet Treats', places: '15 places', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=600&fit=crop' },
  { title: 'Trending This Week', places: '21 places', img: 'https://images.unsplash.com/photo-1554679665-f5537f187268?w=600&h=600&fit=crop' }
];

const restaurantsNearYou = [
  { name: 'The Bombay Canteen', tags: 'North Indian, Mughlai', rating: 4.5, time: '35-40 mins', offer: '60% OFF up to ₹120', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop' },
  { name: 'Bawarchi Biryani', tags: 'Biryani, South Indian', rating: 4.8, time: '25-30 mins', offer: '₹100 OFF', img: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&h=400&fit=crop' },
  { name: 'Truffles', tags: 'Burgers, American', rating: 4.6, time: '40-45 mins', offer: 'Free Delivery', img: 'https://images.unsplash.com/photo-1466978913421-bac2e5e75e4e?w=600&h=400&fit=crop' },
  { name: 'Leon Grill', tags: 'Fast Food, Mediterranean', rating: 4.2, time: '15-20 mins', offer: 'Flat ₹150 OFF', img: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&h=400&fit=crop' },
  { name: 'Green Dot Cafe', tags: 'Healthy, Salads', rating: 4.4, time: '20-25 mins', offer: '20% OFF', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop' },
  { name: 'Beijing Bites', tags: 'Chinese, Asian', rating: 4.1, time: '30-40 mins', offer: 'Free Dessert', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop' },
];

const Home = () => {
  const categoriesRef = useRef(null);
  const brandsRef = useRef(null);
  const groceriesRef = useRef(null);
  const offersRef = useRef(null);

  // Get some trending items across categories
  const trendingItems = [
    foodData.nonveg[0],
    foodData.maincourse[0],
    foodData.desserts[2],
    foodData.seafood[1],
  ];

  const scroll = (ref, direction) => {
    if (ref.current) {
      const offset = direction === 'left' ? -500 : 500;
      ref.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-wrapper">
      <Hero />

      {/* Categories Carousel - "What's on your mind?" */}
      <section className="category-section container">
        <div className="carousel-title-row">
          <h2 className="section-title-small">What's on your mind?</h2>
          <div className="carousel-arrows">
            <button className="c-arrow" onClick={() => scroll(categoriesRef, 'left')} aria-label="Scroll Left"><ArrowLeft size={20} /></button>
            <button className="c-arrow" onClick={() => scroll(categoriesRef, 'right')} aria-label="Scroll Right"><ArrowRight size={20} /></button>
          </div>
        </div>
        <div className="horizontal-scroll hide-scrollbar" ref={categoriesRef}>
          {categories.map((cat, index) => (
            <Link to={`/menu/${cat.id}`} key={index} className="cat-circle-link">
              <motion.div 
                className="cat-circle-card"
                whileHover={{ scale: 1.05 }}
              >
                <div className="cat-img-wrapper circle">
                  <img src={cat.image} alt={cat.name} />
                </div>
                <h3>{cat.name}</h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* Top Brands Carousel - "Top Brands In Spotlight" */}
      <section className="brands-section container">
        <div className="carousel-title-row">
          <h2 className="section-title-small">Top Brands In Spotlight</h2>
          <div className="carousel-arrows">
            <button className="c-arrow" onClick={() => scroll(brandsRef, 'left')} aria-label="Scroll Left"><ArrowLeft size={20} /></button>
            <button className="c-arrow" onClick={() => scroll(brandsRef, 'right')} aria-label="Scroll Right"><ArrowRight size={20} /></button>
          </div>
        </div>
        <div className="horizontal-scroll hide-scrollbar" ref={brandsRef}>
          {topBrands.map((brand, idx) => (
            <Link to={`/brand/${brand.name}`} key={idx} className="brand-circle-item" style={{textDecoration: 'none'}}>
              <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '0.8rem' }}>
                <div className="brand-img-wrap shadow-subtle">
                  <img src={brand.img} alt={brand.name} onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + brand.name + '&background=random' }} />
                </div>
                <p>{brand.name}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* Groceries Slider (Instamart Style) - "Shop groceries on Platora" */}
      <section className="grocery-section container">
        <div className="carousel-title-row">
          <div className="groc-header-title-wrap">
            <h2 className="section-title-small">Shop groceries on Platora</h2>
            <span className="instamart-pill">⚡ 10-15 MINS DELIVERY</span>
          </div>
          <div className="carousel-arrows">
            <button className="c-arrow" onClick={() => scroll(groceriesRef, 'left')} aria-label="Scroll Left"><ArrowLeft size={20} /></button>
            <button className="c-arrow" onClick={() => scroll(groceriesRef, 'right')} aria-label="Scroll Right"><ArrowRight size={20} /></button>
          </div>
        </div>
        <div className="horizontal-scroll hide-scrollbar" ref={groceriesRef}>
          {groceries.map((groc, idx) => (
            <Link to={`/grocery/${encodeURIComponent(groc.name)}`} key={idx} className="groc-card-link">
              <motion.div 
                className="groc-swiggy-card"
                whileHover={{ translateY: -6 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                <div className="groc-offer-tag" style={{ background: groc.badgeColor || '#0ca678' }}>
                  {groc.discount}
                </div>
                <div className="groc-img-bg" style={{ background: groc.color || '#f3f3f5' }}>
                  <motion.img 
                    src={groc.img} 
                    alt={groc.name} 
                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + groc.name + '&background=random' }}
                    whileHover={{ scale: 1.1 }} 
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                </div>
                <div className="groc-card-details">
                  <h3>{groc.name}</h3>
                  <span className="groc-eta-text">⚡ {groc.time}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* Offers Carousel - "Best Offers for you" */}
      <section className="offers-section container">
        <div className="carousel-title-row">
          <h2 className="section-title-small">Best Offers for you</h2>
          <div className="carousel-arrows">
            <button className="c-arrow" onClick={() => scroll(offersRef, 'left')} aria-label="Scroll Left"><ArrowLeft size={20} /></button>
            <button className="c-arrow" onClick={() => scroll(offersRef, 'right')} aria-label="Scroll Right"><ArrowRight size={20} /></button>
          </div>
        </div>
        <div className="horizontal-scroll hide-scrollbar" ref={offersRef}>
          {offersTabs.map((offer, idx) => (
            <div key={idx} className="offer-banner-card">
              <img src={offer.img} alt={offer.title} />
              <div className="offer-overlay">
                <h3>{offer.title}</h3>
                <div className="code-pill">Code: {offer.code}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* Collections Section */}
      <section className="collections-section container">
        <div className="carousel-title-row">
          <h2 className="section-title-small">Curated Collections</h2>
          <span className="view-all-link">View all unique places</span>
        </div>
        <div className="horizontal-scroll hide-scrollbar">
          {collections.map((col, idx) => (
            <div key={idx} className="collection-card">
              <img src={col.img} alt={col.title} />
              <div className="collection-overlay">
                <h4>{col.title}</h4>
                <p>{col.places} <PlayCircle size={12} /></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* Trending Section */}
      <section className="trending-section container">
        <div className="carousel-title-row">
          <h2 className="section-title-small"><Flame size={24} color="var(--primary-color)" /> Popular Near You</h2>
        </div>
        <div className="horizontal-scroll hide-scrollbar">
          {trendingItems.map((item, index) => (
            <div key={index} style={{ width: '280px' }}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
        <div className="center-btn" style={{marginTop: '2rem'}}>
          <Link to="/menu/nonveg" className="btn-premium outlined">View Full Menu</Link>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Restaurants Near You Section (Grid) */}
      <section className="restaurants-list-section container">
        <div className="carousel-title-row">
          <h2 className="section-title-small">Best Restaurants to Explore</h2>
        </div>
        <div className="restaurants-grid">
          {restaurantsNearYou.map((rest, idx) => (
            <Link to={`/brand/${rest.name}`} key={idx} className="rest-card-link">
              <motion.div className="restaurant-card" whileHover={{ scale: 1.02 }}>
                <div className="rest-img">
                  <img src={rest.img} alt={rest.name} />
                  {rest.offer && <div className="rest-offer">{rest.offer}</div>}
                </div>
                <div className="rest-info">
                  <div className="rest-name-row">
                    <h3>{rest.name}</h3>
                    <div className="rest-rating"><Star fill="white" size={12} /> {rest.rating}</div>
                  </div>
                  <div className="rest-tags">
                    <span>{rest.tags}</span>
                    <span>• {rest.time}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        <div className="center-btn" style={{marginTop: '2rem'}}>
          <Link to="/search" className="btn-premium outlined">Show More Restaurants</Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Seamless Delivery</span>
            <h2 className="section-title text-white">How It Works</h2>
          </div>
          <div className="how-grid">
            {howItWorks.map((item, index) => (
              <motion.div 
                key={index} 
                className="how-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="how-step-num">{item.step}</div>
                <div className="how-icon-wrap">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Promotion Banner */}
      <section className="app-promo-section container">
        <div className="app-promo-card">
          <div className="app-promo-text">
            <h2>Experience Platora on <br /><span className="gradient-text">Your Mobile</span></h2>
            <p>Get the best experience with our lightning-fast mobile app. Real-time tracking, exclusive app-only coupons, and much more.</p>
            <div className="app-badges-row">
              <Link to="/support" className="app-badge-fake">
                <span className="badge-icon">🍎</span>
                <div><small>Download on the</small><strong>App Store</strong></div>
              </Link>
              <Link to="/support" className="app-badge-fake">
                <span className="badge-icon">▶</span>
                <div><small>Get it on</small><strong>Google Play</strong></div>
              </Link>
            </div>
          </div>
          <div className="app-promo-img">
            <motion.img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop" 
              alt="Mobile App" 
              initial={{ y: 20 }}
              animate={{ y: -20 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="wcu-section container">
        <div className="section-header">
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="section-title">Perfect Delivery & Quality</h2>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Feedbacks</span>
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, index) => (
              <motion.div 
                key={index} 
                className="testi-card glass-card"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="stars">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="var(--secondary-color)" color="var(--secondary-color)" />)}
                </div>
                <p>"{t.text}"</p>
                <div className="testi-user">
                  <img src={t.img} alt={t.name} />
                  <div>
                    <h4>{t.name}</h4>
                    <span>Happy Customer</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthy Food Section */}
      <section className="healthy-section container">
        <div className="healthy-content">
          <div className="healthy-text">
            <span className="eyebrow">Fresh & Green</span>
            <h2>Fresh & Healthy <br /><span className="highlight">Salad Bowls</span></h2>
            <p>We provide food that is both delicious and nutritionally balanced. Our chefs use only the freshest, locally-sourced organic ingredients.</p>
            <div className="healthy-features">
              <div className="h-feat"><CheckCircle2 size={18} color="var(--primary-color)" /> 100% Organic</div>
              <div className="h-feat"><CheckCircle2 size={18} color="var(--primary-color)" /> Low Calorie</div>
              <div className="h-feat"><CheckCircle2 size={18} color="var(--primary-color)" /> Fast Preparation</div>
            </div>
            <Link to="/menu/salads" className="btn-premium">Order Healthy Now</Link>
          </div>
          <div className="healthy-img">
            <img src="https://d2clawv67efefq.cloudfront.net/ccbp-responsive-website/healthy-food-plate-img.png" alt="Healthy Plate" />
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .home-wrapper { overflow-x: hidden; }
        .eyebrow { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; color: var(--primary-color); display: block; margin-bottom: 0.8rem; }
        .section-header { text-align: center; margin-bottom: 4rem; }
        .section-title { font-size: 2.8rem; font-weight: 900; color: var(--text-main); letter-spacing: -1.5px; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .section-title.text-white { color: white; }
        .section-subtitle { color: var(--text-muted); font-size: 1.1rem; margin-top: 0.5rem; }
        .gradient-text { background: var(--gradient-main); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 900; }
        .center-btn { display: flex; justify-content: center; margin-top: 3rem; }
        .btn-premium.outlined { background: none; border: 2px solid var(--primary-color); color: var(--primary-color); box-shadow: none; }
        .btn-premium.outlined:hover { background: var(--primary-color); color: white; }

        .section-divider {
          border: 0;
          height: 1px;
          background: var(--border-color);
          margin: 3.5rem auto;
          max-width: 1200px;
          width: 90%;
          opacity: 0.6;
        }

        /* Horizontal Scroll Utility */
        .horizontal-scroll {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          gap: 1.5rem;
          padding-bottom: 1.2rem;
          padding-top: 5px;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .horizontal-scroll > * { scroll-snap-align: start; flex-shrink: 0; }
        
        .carousel-title-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; margin-top: 1rem; }
        .section-title-small { font-size: 1.8rem; font-weight: 900; color: var(--text-main); letter-spacing: -1px; display: flex; align-items: center; gap: 8px; }

        /* Offers Carousel */
        .offers-section { margin-top: 2rem; }
        .offer-banner-card { width: min(350px, 85vw); height: 180px; position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.06); }
        .offer-banner-card img { width: 100%; height: 100%; object-fit: cover; }
        .offer-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%); display: flex; flex-direction: column; justify-content: center; padding: 2rem; color: white; }
        .offer-overlay h3 { font-size: clamp(1.2rem, 4vw, 1.4rem); font-weight: 900; margin-bottom: 1rem; text-shadow: 0 2px 5px rgba(0,0,0,0.5); max-width: 70%; line-height: 1.2; }
        .code-pill { background: white; color: black; font-weight: 900; padding: 6px 15px; border-radius: 30px; font-size: 0.85rem; width: fit-content; text-transform: uppercase; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }

        /* Grocery Section (Instamart Style) */
        .grocery-section { margin-top: 2.5rem; margin-bottom: 2.5rem; }
        .groc-header-title-wrap { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .instamart-pill { background: #e6f9ed; color: #0ca678; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 20px; border: 1px solid #b2f2bb; letter-spacing: 0.5px; }
        .carousel-arrows { display: flex; gap: 10px; }
        .c-arrow { width: 36px; height: 36px; border-radius: 50%; background: #e2e2e7; border: none; display: flex; align-items: center; justify-content: center; color: #555; cursor: pointer; transition: 0.2s; }
        .c-arrow:hover { background: #d1d1d6; color: black; }
        .groc-card-link { text-decoration: none; color: inherit; display: block; }
        .groc-swiggy-card { width: clamp(125px, 20vw, 150px); position: relative; display: flex; flex-direction: column; align-items: center; gap: 0.6rem; cursor: pointer; }
        .groc-offer-tag { position: absolute; top: -6px; left: 50%; transform: translateX(-50%); color: white; font-size: 0.68rem; font-weight: 900; padding: 3px 8px; border-radius: 12px; z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.15); white-space: nowrap; letter-spacing: 0.3px; }
        .groc-img-bg { width: 100%; height: clamp(120px, 19vw, 145px); border-radius: 22px; box-shadow: 0 6px 16px rgba(0,0,0,0.05); padding: 12px; display: flex; align-items: center; justify-content: center; aspect-ratio: 1; border: 1px solid rgba(0,0,0,0.04); transition: all 0.3s ease; overflow: hidden; }
        .groc-img-bg img { width: 100%; height: 100%; object-fit: cover; border-radius: 14px; }
        .groc-card-details { width: 100%; text-align: center; display: flex; flex-direction: column; gap: 0.2rem; }
        .groc-swiggy-card h3 { font-size: 0.92rem; font-weight: 800; color: var(--text-main); line-height: 1.25; transition: color 0.2s; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .groc-eta-text { font-size: 0.75rem; font-weight: 700; color: #666; }
        .groc-swiggy-card:hover h3 { color: var(--primary-color); }
        .groc-swiggy-card:hover .groc-img-bg { box-shadow: 0 14px 28px rgba(0,0,0,0.12); transform: scale(1.03); }

        /* Collections Carousel */
        .collections-section { margin-bottom: 2rem; }
        .view-all-link { color: var(--primary-color); font-weight: 700; font-size: 0.9rem; cursor: pointer; }
        .collection-card { width: clamp(200px, 40vw, 260px); height: clamp(260px, 50vw, 320px); position: relative; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 15px rgba(0,0,0,0.06); cursor: pointer; }
        .collection-card img { width: 100%; height: 100%; object-fit: cover; transition: 0.3s; }
        .collection-card:hover img { transform: scale(1.05); }
        .collection-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%); padding: 3rem 1.2rem 1.2rem; color: white; display: flex; flex-direction: column; justify-content: flex-end; }
        .collection-overlay h4 { font-size: 1.1rem; font-weight: 800; margin-bottom: 5px; text-shadow: 0 2px 5px rgba(0,0,0,0.6); line-height: 1.2; }
        .collection-overlay p { font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 5px; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }

        /* Brands Carousel */
        .brands-section { margin-bottom: 2rem; margin-top: 1rem; }
        .brand-circle-item { width: clamp(90px, 18vw, 130px); display: flex; flex-direction: column; align-items: center; gap: 0.8rem; padding: 5px; }
        .brand-img-wrap { width: clamp(80px, 16vw, 110px); height: clamp(80px, 16vw, 110px); border-radius: 50%; background: white; padding: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .brand-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .shadow-subtle { box-shadow: 0 5px 15px rgba(0,0,0,0.06); border: 2px solid transparent; transition: border-color 0.2s; }
        .brand-circle-item:hover .shadow-subtle { border-color: var(--primary-color); }
        .brand-circle-item p { font-size: 0.95rem; font-weight: 800; color: var(--text-main); text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; }

        /* Categories Section Carousel */
        .category-section { padding-top: 10px; margin-bottom: 1rem; }
        .cat-circle-link { text-decoration: none; }
        .cat-circle-card { text-align: center; color: var(--text-main); width: clamp(90px, 18vw, 120px); display: flex; flex-direction: column; align-items: center; gap: 0.8rem; padding: 5px; }
        .cat-img-wrapper.circle { width: clamp(80px, 16vw, 110px); height: clamp(80px, 16vw, 110px); border-radius: 50%; overflow: hidden; box-shadow: 0 8px 15px rgba(0,0,0,0.06); margin: 0 auto; border: 3px solid transparent; transition: border-color 0.3s; }
        .cat-circle-card:hover .cat-img-wrapper { border-color: var(--primary-color); }
        .cat-img-wrapper.circle img { width: 100%; height: 100%; object-fit: cover; }
        .cat-circle-card h3 { font-size: 0.95rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }

        /* Trending Section */
        .trending-section { padding-top: 10px; padding-bottom: 30px; }

        /* Restaurants Near You */
        .restaurants-list-section { padding-top: 20px; padding-bottom: 40px; }
        .restaurants-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; }
        .rest-card-link { text-decoration: none; color: inherit; }
        .restaurant-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); border: 1px solid var(--border-color); transition: 0.3s; }
        .restaurant-card:hover { box-shadow: 0 15px 40px rgba(0,0,0,0.08); border-color: rgba(255,77,77,0.3); }
        .rest-img { position: relative; height: 200px; width: 100%; }
        .rest-img img { width: 100%; height: 100%; object-fit: cover; }
        .rest-offer { position: absolute; bottom: 0; left: 0; background: linear-gradient(to right, #0ca678 0%, #087f5b 100%); color: white; border-radius: 0 10px 0 0; padding: 6px 15px; font-weight: 900; font-size: 0.85rem; letter-spacing: 0.5px; box-shadow: 2px -2px 10px rgba(0,0,0,0.2); }
        .rest-info { padding: 1.2rem; }
        .rest-name-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
        .rest-name-row h3 { font-size: 1.2rem; font-weight: 800; color: var(--text-main); line-height: 1.3; }
        .rest-rating { background: #0ca678; color: white; padding: 3px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 800; display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 5px rgba(12,166,120,0.3); }
        .rest-tags { display: flex; justify-content: space-between; font-size: 0.9rem; color: #777; font-weight: 500; }

        /* How It Works Section */
        .how-section { background: #1a1a1a; padding: 100px 0; margin: 80px 0; }
        .how-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        .how-card { text-align: center; color: white; position: relative; }
        .how-step-num { position: absolute; top: 0; left: 50%; transform: translateX(-50%); font-size: 4rem; font-weight: 900; color: rgba(255,255,255,0.05); z-index: 0; }
        .how-icon-wrap { width: 80px; height: 80px; background: rgba(255,77,77,0.1); border: 1px solid var(--primary-color); border-radius: 24px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; position: relative; z-index: 1; color: var(--primary-color); }
        .how-card h3 { font-size: 1.2rem; font-weight: 800; margin-bottom: 0.8rem; position: relative; z-index: 1; }
        .how-card p { font-size: 0.9rem; color: #888; line-height: 1.6; position: relative; z-index: 1; }

        /* App Promo Section */
        .app-promo-section { padding: 80px 1rem; }
        .app-promo-card { background: var(--card-bg); border-radius: 40px; border: 1px solid var(--border-color); padding: 4rem; display: flex; align-items: center; justify-content: space-between; gap: 4rem; overflow: hidden; }
        .app-promo-text { flex: 1; }
        .app-promo-text h2 { font-size: 3rem; font-weight: 900; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -2px; }
        .app-promo-text p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2.5rem; line-height: 1.7; }
        .app-badges-row { display: flex; gap: 1rem; }
        .app-badge-fake { display: flex; align-items: center; gap: 0.8rem; background: #1a1a1a; color: white; padding: 0.8rem 1.5rem; border-radius: 12px; text-decoration: none; transition: 0.3s; }
        .app-badge-fake:hover { background: #333; transform: translateY(-5px); }
        .app-badge-fake .badge-icon { font-size: 1.5rem; }
        .app-badge-fake div { display: flex; flex-direction: column; }
        .app-badge-fake small { font-size: 0.65rem; color: #888; }
        .app-badge-fake strong { font-size: 0.95rem; }
        .app-promo-img { flex: 1; display: flex; justify-content: center; }
        .app-promo-img img { width: 100%; max-width: 320px; border-radius: 30px; box-shadow: 20px 20px 60px rgba(0,0,0,0.15); }

        /* WCU Section */
        .wcu-section { padding: 80px 1rem; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .feature-card { padding: 2.5rem; text-align: center; border-radius: 30px; background: var(--card-bg); box-shadow: 0 10px 30px rgba(0,0,0,0.03); border: 1px solid var(--border-color); color: var(--text-main); }
        .feature-icon { color: var(--primary-color); margin-bottom: 1.5rem; }
        .feature-icon svg { width: 40px; height: 40px; }
        .feature-card h3 { font-size: 1.4rem; margin-bottom: 1rem; font-weight: 800; }
        .feature-card p { color: var(--text-muted); line-height: 1.6; }

        /* Testimonials Section */
        .testimonials-section { padding: 100px 1rem; background: var(--light-bg); }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .testi-card { padding: 2.5rem; display: flex; flex-direction: column; gap: 1.5rem; background: white !important; }
        .stars { display: flex; gap: 4px; }
        .testi-card p { font-style: italic; color: var(--text-muted); line-height: 1.7; font-size: 1.05rem; }
        .testi-user { display: flex; align-items: center; gap: 1rem; margin-top: auto; }
        .testi-user img { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; }
        .testi-user h4 { font-weight: 800; font-size: 1rem; }
        .testi-user span { font-size: 0.8rem; color: #aaa; font-weight: 600; }

        /* Healthy Section */
        .healthy-section { padding: 100px 1rem; }
        .healthy-content { display: flex; align-items: center; justify-content: space-between; gap: 5rem; }
        .healthy-text { flex: 1; }
        .healthy-text h2 { font-size: 3.5rem; font-weight: 900; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -2px; }
        .highlight { color: var(--primary-color); }
        .healthy-text p { font-size: 1.15rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 2rem; }
        .healthy-features { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2.5rem; }
        .h-feat { display: flex; align-items: center; gap: 0.6rem; font-weight: 700; font-size: 0.95rem; }
        .healthy-img { flex: 1; }
        .healthy-img img { width: 100%; filter: drop-shadow(0 20px 50px rgba(0,0,0,0.15)); }

        @media (max-width: 1024px) {
          .how-grid { grid-template-columns: repeat(2, 1fr); gap: 3rem 2rem; }
          .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 968px) {
          .healthy-content { flex-direction: column-reverse; text-align: center; }
          .healthy-text h2 { font-size: 2.8rem; }
          .healthy-features { justify-content: center; }
          .app-promo-card { flex-direction: column; text-align: center; padding: 3rem 2rem; }
          .app-promo-text h2 { font-size: 2.5rem; }
          .app-badges-row { justify-content: center; flex-direction: column; }
          .section-title { font-size: 2.2rem; }
        }

        @media (max-width: 640px) {
          .how-grid { grid-template-columns: 1fr; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .healthy-features { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

export default Home;
