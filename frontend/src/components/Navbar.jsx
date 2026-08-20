import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search as SearchIcon, Sun, Moon, Languages, Menu as MenuIcon, X, Tag, HelpCircle, Bike, Info, Home } from 'lucide-react';
import platoraLogo from '../assets/food/platora-logo.png';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { lang, t, changeLang } = useContext(LanguageContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(prev => prev ? false : prev);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { to: '/', label: t.home, icon: <Home size={16} /> },
    { to: '/offers', label: 'Offers', icon: <Tag size={16} /> },
    { to: '/track', label: 'Track', icon: <Bike size={16} /> },
    { to: '/orders', label: t.orders, icon: <ShoppingCart size={16} /> },
    { to: '/about', label: 'About', icon: <Info size={16} /> },
    { to: '/support', label: 'Help', icon: <HelpCircle size={16} /> },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <Link to="/" className="logo">
            <img src={platoraLogo} alt="Platora Logo" className="navbar-logo" />
          </Link>

          {/* Search — desktop */}
          <form onSubmit={handleSearch} className="search-bar desktop-search">
            <button type="submit"><SearchIcon size={18} /></button>
            <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </form>

          {/* Desktop nav links */}
          <div className="nav-links desktop-nav">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className={`nav-item ${location.pathname === l.to ? 'active' : ''}`}>{l.label}</Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="nav-controls">
            <button className="theme-toggle" onClick={toggleDarkMode} title="Toggle theme">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="lang-selector">
              <Languages size={16} />
              <select value={lang} onChange={(e) => changeLang(e.target.value)}>
                <option value="en">EN</option>
                <option value="hi">HI</option>
              </select>
            </div>

            <Link to="/cart" className="nav-item cart-link" title="Cart">
              <ShoppingCart size={22} />
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </Link>

            {user ? (
              <div className="user-info desktop-only">
                <Link to="/profile" className="welcome-link">
                  <div className="avatar">{user.name?.[0]?.toUpperCase()}</div>
                  <span className="welcome-text">{user.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={logout} className="logout-btn" title="Logout"><LogOut size={18} /></button>
              </div>
            ) : (
              <Link to="/login" className="login-btn desktop-only"><User size={16} /> {t.login}</Link>
            )}

            {/* Hamburger */}
            <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="mobile-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.div className="mobile-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 300 }}>
              <div className="drawer-header">
                <Link to="/" className="logo" onClick={() => setMobileOpen(false)}>
                  <img src={platoraLogo} alt="Platora Logo" className="navbar-logo" />
                </Link>
                <button className="hamburger" onClick={() => setMobileOpen(false)}><X size={24} /></button>
              </div>

              {user && (
                <div className="drawer-user">
                  <div className="avatar large">{user.name?.[0]?.toUpperCase()}</div>
                  <div><p className="drawer-name">{user.name}</p><p className="drawer-email">{user.email}</p></div>
                </div>
              )}

              {/* Search on mobile */}
              <form onSubmit={handleSearch} className="drawer-search">
                <SearchIcon size={16} />
                <input type="text" placeholder="Search food..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </form>

              <nav className="drawer-nav">
                {navLinks.map((l) => (
                  <Link key={l.to} to={l.to} className={`drawer-link ${location.pathname === l.to ? 'active' : ''}`}>
                    {l.icon} {l.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link to="/profile" className="drawer-link"><User size={16} /> Profile</Link>
                    <button className="drawer-link logout" onClick={() => { logout(); setMobileOpen(false); }}><LogOut size={16} /> Logout</button>
                  </>
                ) : (
                  <Link to="/login" className="drawer-link cta"><User size={16} /> Login / Sign Up</Link>
                )}
              </nav>

              <div className="drawer-footer">
                <button className="theme-toggle" onClick={toggleDarkMode}>{darkMode ? <Sun size={18} /> : <Moon size={18} />} {darkMode ? 'Light Mode' : 'Dark Mode'}</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .navbar {
          position: fixed; top: 0; width: 100%;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(20px);
          z-index: 1000; height: 70px;
          display: flex; align-items: center;
          border-bottom: 1px solid var(--glass-border);
          transition: box-shadow 0.3s;
        }
        .navbar.scrolled { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        body.dark-mode .navbar { background: rgba(15,23,42,0.9); }
        .nav-content { display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 1.5rem; }

        .logo { font-size: 1.7rem; font-weight: 900; color: var(--text-main); text-decoration: none; letter-spacing: -1.5px; flex-shrink: 0; }
        .logo span { color: var(--primary-color); }
        .navbar-logo { max-height: 40px; width: auto; object-fit: contain; }

        .search-bar { flex: 1; max-width: 380px; background: #f3f4f6; border: 1.5px solid transparent; border-radius: 12px; display: flex; align-items: center; padding: 0.5rem 0.8rem; gap: 0.5rem; transition: 0.3s; }
        .search-bar:focus-within { border-color: var(--primary-color); background: white; box-shadow: 0 0 0 4px rgba(255,77,77,0.08); }
        .search-bar button { background: none; border: none; color: #888; cursor: pointer; display: flex; flex-shrink:0; }
        .search-bar input { border: none; background: none; outline: none; font-size: 0.88rem; flex: 1; color: var(--text-main); }
        
        .nav-links { display: flex; align-items: center; gap: 0.3rem; }
        .nav-item { text-decoration: none; color: var(--text-muted); font-weight: 600; font-size: 0.88rem; padding: 0.45rem 0.9rem; border-radius: 10px; transition: 0.2s; white-space: nowrap; }
        .nav-item:hover, .nav-item.active { color: var(--primary-color); background: rgba(255,77,77,0.07); }

        .nav-controls { display: flex; align-items: center; gap: 0.8rem; flex-shrink: 0; }
        .theme-toggle { background: none; border: none; color: var(--text-main); cursor: pointer; display: flex; align-items: center; padding: 6px; border-radius: 8px; transition: 0.2s; }
        .theme-toggle:hover { background: rgba(0,0,0,0.06); }
        .lang-selector { display: flex; align-items: center; gap: 4px; color: var(--text-muted); }
        .lang-selector select { background: none; border: none; font-size: 0.8rem; font-weight: 700; color: var(--text-main); cursor: pointer; outline: none; }
        .cart-link { position: relative; display: flex; align-items: center; color: var(--text-main); }
        .cart-badge { position: absolute; top: -8px; right: -8px; background: var(--primary-color); color: white; font-size: 10px; padding: 2px 5px; border-radius: 10px; font-weight: 800; }
        .user-info { display: flex; align-items: center; gap: 0.8rem; }
        .avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--gradient-main); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem; flex-shrink: 0; }
        .avatar.large { width: 48px; height: 48px; font-size: 1.2rem; }
        .welcome-link { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--text-main); font-weight: 700; font-size: 0.88rem; }
        .welcome-link:hover { color: var(--primary-color); }
        .logout-btn { background: none; border: none; color: var(--primary-color); cursor: pointer; display: flex; transition: transform 0.2s; }
        .logout-btn:hover { transform: scale(1.1); }
        .login-btn { background: var(--gradient-main); color: white; padding: 0.5rem 1.1rem; border-radius: 20px; text-decoration: none; display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; font-weight: 700; white-space: nowrap; }

        .hamburger { display: none; background: none; border: none; color: var(--text-main); cursor: pointer; padding: 4px; border-radius: 8px; }

        /* Mobile Drawer */
        .mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1100; backdrop-filter: blur(3px); }
        .mobile-drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(320px, 90vw);
          background: var(--card-bg);
          z-index: 1200; padding: 0;
          display: flex; flex-direction: column;
          box-shadow: -10px 0 40px rgba(0,0,0,0.15);
        }
        .drawer-header { display: flex; justify-content: space-between; align-items: center; padding: 1.2rem 1.5rem; border-bottom: 1px solid var(--border-color); }
        .drawer-user { display: flex; align-items: center; gap: 1rem; padding: 1.2rem 1.5rem; background: #f8f9fa; }
        body.dark-mode .drawer-user { background: rgba(255,255,255,0.05); }
        .drawer-name { font-weight: 800; font-size: 0.95rem; }
        .drawer-email { font-size: 0.78rem; color: var(--text-muted); }
        .drawer-search { display: flex; align-items: center; gap: 0.6rem; margin: 1rem 1.5rem; background: #f3f4f6; border-radius: 12px; padding: 0.6rem 0.9rem; color: #888; }
        body.dark-mode .drawer-search { background: rgba(255,255,255,0.08); }
        .drawer-search input { border: none; background: none; outline: none; font-size: 0.88rem; flex: 1; color: var(--text-main); }
        .drawer-nav { flex: 1; display: flex; flex-direction: column; padding: 0.5rem 1rem; overflow-y: auto; }
        .drawer-link { display: flex; align-items: center; gap: 0.9rem; padding: 0.9rem 1rem; border-radius: 12px; text-decoration: none; color: var(--text-main); font-weight: 600; font-size: 0.92rem; transition: 0.2s; border: none; background: none; cursor: pointer; width: 100%; text-align: left; }
        .drawer-link:hover, .drawer-link.active { background: rgba(255,77,77,0.08); color: var(--primary-color); }
        .drawer-link.logout { color: #fa5252; }
        .drawer-link.cta { background: var(--gradient-main); color: white; margin-top: 0.5rem; justify-content: center; border-radius: 14px; }
        .drawer-footer { padding: 1.2rem 1.5rem; border-top: 1px solid var(--border-color); }
        .drawer-footer .theme-toggle { width: 100%; justify-content: center; gap: 0.6rem; border: 1px solid var(--border-color); border-radius: 12px; padding: 0.7rem; font-size: 0.88rem; font-weight: 600; color: var(--text-main); }

        @media (max-width: 1100px) { .desktop-nav { display: none; } }
        @media (max-width: 768px) { .desktop-search { display: none; } .desktop-only { display: none; } .hamburger { display: flex; } }
        @media (min-width: 769px) { .mobile-overlay, .mobile-drawer { display: none; } }
      `}} />
    </>
  );
};

export default Navbar;
