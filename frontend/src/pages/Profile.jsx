import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Plus, Trash2, Save, Home, Briefcase, Map, 
  Package, Clock, CheckCircle, Truck, Star, LogOut, ChevronRight, Settings, 
  Heart, CreditCard, Bell, Shield, UserCircle, Sun, Moon, Languages, BellOff, MessageSquare, Lock, X
} from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateProfile, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { lang, changeLang } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile State
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState('');
  
  // Addresses State
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ type: 'Home', addressLine1: '', city: '', postalCode: '' });
  
  // Orders State
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Settings State
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [promoEmail, setPromoEmail] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!user || !user.token) { 
      navigate('/login'); 
      return; 
    }
    
    // Initial data fetch
    const fetchData = async () => {
      setLoadingOrders(true);
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        // Fetch full profile (includes addresses)
        const profRes = await axios.get('http://localhost:5000/api/users/profile', config);
        setAddresses(profRes.data.addresses || []);
        setPhone(profRes.data.phone || '');

        // Fetch orders for the history tab
        const orderRes = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(orderRes.data);
      } catch (err) {
        console.error('Error fetching profile data', err);
        if (err.response?.status === 401) {
          alert('Your session has expired. Please log in again.');
          logout();
          navigate('/login');
        }
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchData();
  }, [user, navigate, logout]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put('http://localhost:5000/api/users/profile', { name, email, phone, password }, config);
      updateProfile(data);
      setMsg('Profile Updated Successfully');
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Session expired. Please log in again.');
        logout();
        navigate('/login');
        return;
      }
      setMsg(err.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const addAddressHandler = async (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      alert('Please log in to add an address.');
      navigate('/login');
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('http://localhost:5000/api/users/address', newAddress, config);
      setAddresses(data);
      updateProfile({ addresses: data });
      setShowAddressForm(false);
      setNewAddress({ type: 'Home', addressLine1: '', city: '', postalCode: '' });
      setMsg('Address Added Successfully');
    } catch (err) {
      console.error('Add Address Error:', err);
      if (err.response?.status === 401) {
        alert('Session expired or invalid token. Please log in again.');
        logout();
        navigate('/login');
      } else {
        alert(err.response?.data?.message || 'Error adding address');
      }
    }
  };

  const deleteAddressHandler = async (addrId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.delete(`http://localhost:5000/api/users/address/${addrId}`, config);
      setAddresses(data);
      updateProfile({ addresses: data });
      setMsg('Address Deleted Successfully');
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Session expired. Please log in again.');
        logout();
        navigate('/login');
      } else {
        alert(err.response?.data?.message || 'Error deleting address');
      }
    }
  };

  const setDefaultAddressHandler = async (addrId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.put(`http://localhost:5000/api/users/address/${addrId}/default`, {}, config);
      setAddresses(data);
      updateProfile({ addresses: data });
      setMsg('Primary Address Updated');
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Session expired. Please log in again.');
        logout();
        navigate('/login');
      } else {
        alert(err.response?.data?.message || 'Error updating address');
      }
    }
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'Home': return <Home size={18} />;
      case 'Work': return <Briefcase size={18} />;
      default: return <Map size={18} />;
    }
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: <User size={18} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={18} /> },
    { id: 'orders', label: 'Order History', icon: <Package size={18} /> },
    { id: 'favorites', label: 'Favorites', icon: <Heart size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('DANGER: Are you absolutely sure you want to permanently delete your account? This action cannot be undone!')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete('http://localhost:5000/api/users/profile', config);
        alert('Your account has been deleted successfully.');
        logout();
        navigate('/');
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting account');
      }
    }
  };

  return (
    <div className="profile-page container">
      <div className="profile-header-banner">
        <div className="user-visual">
          <div className="avatar-big">
            {user?.name?.charAt(0).toUpperCase() || <User size={40} />}
          </div>
          <div className="user-intro">
            <h1>Hey, {user?.name}!</h1>
            <p>{user?.email} • Member since 2024</p>
          </div>
        </div>
        <button className="logout-btn-top" onClick={handleLogout}><LogOut size={18} /> Logout</button>
      </div>

      <div className="profile-container">
        {/* Sidebar Navigation */}
        <aside className="profile-sidebar">
          <nav>
            {tabs.map(tab => (
              <button 
                key={tab.id} 
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
                <ChevronRight size={16} className="chevron" />
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="profile-content">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="content-card glass-card"
              >
                <h2>Account Information</h2>
                <p className="subtitle">Update your personal details and contact information</p>
                {msg && <div className={`alert ${msg.includes('Success') ? 'success' : 'error'}`}>{msg}</div>}
                
                <form onSubmit={updateProfileHandler} className="premium-form">
                  <div className="form-grid">
                    <div className="input-field">
                      <label><UserCircle size={14} /> Full Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                    </div>
                    <div className="input-field disabled">
                      <label><Mail size={14} /> Electronic Mail (Locked)</label>
                      <input type="email" value={email} disabled />
                    </div>
                    <div className="input-field">
                      <label><Phone size={14} /> Phone Number</label>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
                    </div>
                    <div className="input-field">
                      <label><Shield size={14} /> Change Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
                    </div>
                  </div>
                  <button type="submit" className="btn-premium submit-btn" disabled={loading}>
                    <Save size={18} /> {loading ? 'Saving Changes...' : 'Save Settings'}
                  </button>
                </form>

                <div className="loyalty-card">
                  <div className="loyalty-info">
                    <h3>Platora Gold Member</h3>
                    <p>You have 540 points. Earn 460 more for a free delivery!</p>
                  </div>
                  <div className="loyalty-medal">🥇</div>
                </div>
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div 
                key="addresses"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="content-card"
              >
                <div className="flex-header">
                  <div>
                    <h2>Saved Addresses</h2>
                    <p className="subtitle">Manage your delivery locations for faster checkout</p>
                  </div>
                  <button className="add-btn-circle" onClick={() => setShowAddressForm(!showAddressForm)}>
                    {showAddressForm ? <X size={20} /> : <Plus size={20} />}
                  </button>
                </div>

                <AnimatePresence>
                  {showAddressForm && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="address-form-wrap glass-card"
                    >
                      <form onSubmit={addAddressHandler}>
                        <div className="form-group-row">
                          <select value={newAddress.type} onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}>
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <input type="text" placeholder="House No. / Street / Area" value={newAddress.addressLine1} onChange={(e) => setNewAddress({...newAddress, addressLine1: e.target.value})} required />
                        <div className="form-row-2">
                          <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} required />
                          <input type="text" placeholder="Pincode" value={newAddress.postalCode} onChange={(e) => setNewAddress({...newAddress, postalCode: e.target.value})} required />
                        </div>
                        <button type="submit" className="btn-premium">Save This Address</button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="address-grid">
                  {addresses.map((addr, index) => (
                    <div key={addr._id || index} className="premium-addr-card">
                      <div className="addr-badge">{getAddressIcon(addr.type)} {addr.type}</div>
                      <div className="addr-body">
                        <p className="line1">{addr.addressLine1}</p>
                        <p className="line2">{addr.city} - {addr.postalCode}</p>
                      </div>
                      <div className="addr-footer">
                        {addr.isDefault ? (
                          <span className="def-pill">Primary</span>
                        ) : (
                          <button 
                            type="button"
                            className="set-def" 
                            onClick={() => addr._id && setDefaultAddressHandler(addr._id)}
                          >
                            Set Primary
                          </button>
                        )}
                        <button 
                          type="button"
                          className="del-btn-icon" 
                          onClick={() => addr._id && deleteAddressHandler(addr._id)}
                          title="Delete address"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {addresses.length === 0 && !showAddressForm && (
                    <div className="empty-state">
                      <MapPin size={48} color="#ddd" />
                      <p>No addresses found. Add one to get started!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div 
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="content-card"
              >
                <h2>Order History</h2>
                <p className="subtitle">Track and reorder your favorite meals</p>

                <div className="orders-timeline">
                  {loadingOrders ? (
                    <p>Loading history...</p>
                  ) : orders.length === 0 ? (
                    <div className="empty-state">
                      <Package size={48} color="#ddd" />
                      <p>You haven't ordered anything yet.</p>
                      <button className="btn-premium small" onClick={() => navigate('/')}>Order Now</button>
                    </div>
                  ) : (
                    orders.map(order => (
                      <div key={order._id} className="history-order-card glass-card">
                        <div className="order-top">
                          <div className="id-grp">
                            <strong>Order #{order._id.slice(-6).toUpperCase()}</strong>
                            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className={`status-pill ${order.status.toLowerCase().replace(/ /g, '-')}`}>
                            {order.status}
                          </div>
                        </div>
                        <div className="order-items-list">
                          {order.orderItems.map((it, i) => (
                            <span key={i}>{it.qty} x {it.name}{i < order.orderItems.length - 1 ? ', ' : ''}</span>
                          ))}
                        </div>
                        <div className="order-bottom">
                          <span className="amt">Total Paid: ₹{order.totalPrice}</span>
                          <button className="reorder-btn" onClick={() => navigate('/track')}>View Details</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'favorites' && (
              <motion.div key="favorites" className="content-card glass-card empty-state">
                <Heart size={48} color="#eee" />
                <h3>Coming Soon</h3>
                <p>We are still cooking this feature. Stay tuned!</p>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="content-card"
              >
                <h2>App Settings</h2>
                <p className="subtitle">Manage notifications, preferences and security</p>

                <div className="settings-section glass-card">
                  <h3 className="settings-title"><Bell size={18} /> Notifications</h3>
                  
                  <div className="setting-row">
                    <div className="setting-info">
                      <strong>Push Notifications</strong>
                      <span>Receive order updates & offers on your device</span>
                    </div>
                    <button className={`toggle-btn ${pushNotif ? 'on' : 'off'}`} onClick={() => setPushNotif(!pushNotif)}>
                      <div className="toggle-circle"></div>
                    </button>
                  </div>

                  <div className="setting-row">
                    <div className="setting-info">
                      <strong>SMS Alerts</strong>
                      <span>Get delivery partner contact details via SMS</span>
                    </div>
                    <button className={`toggle-btn ${smsNotif ? 'on' : 'off'}`} onClick={() => setSmsNotif(!smsNotif)}>
                      <div className="toggle-circle"></div>
                    </button>
                  </div>

                  <div className="setting-row">
                    <div className="setting-info">
                      <strong>Email Promotions</strong>
                      <span>Weekly newsletters, recipes, and exclusive deals</span>
                    </div>
                    <button className={`toggle-btn ${promoEmail ? 'on' : 'off'}`} onClick={() => setPromoEmail(!promoEmail)}>
                      <div className="toggle-circle"></div>
                    </button>
                  </div>
                </div>

                <div className="settings-section glass-card">
                  <h3 className="settings-title"><Settings size={18} /> Preferences</h3>
                  
                  <div className="setting-row">
                    <div className="setting-info">
                      <strong>Theme Appearance</strong>
                      <span>{darkMode ? 'Dark Mode Active' : 'Light Mode Active'}</span>
                    </div>
                    <button className="btn-outline-small" onClick={toggleDarkMode}>
                      {darkMode ? <><Sun size={14}/> Light Mode</> : <><Moon size={14}/> Dark Mode</>}
                    </button>
                  </div>

                  <div className="setting-row">
                    <div className="setting-info">
                      <strong>App Language</strong>
                      <span>Select your preferred language</span>
                    </div>
                    <select className="settings-select" value={lang} onChange={(e) => changeLang(e.target.value)}>
                      <option value="en">English (US)</option>
                      <option value="hi">Hindi (India)</option>
                    </select>
                  </div>
                </div>

                <div className="settings-section glass-card danger-zone">
                  <h3 className="settings-title text-danger"><Shield size={18} /> Security</h3>
                  
                  <div className="setting-row">
                    <div className="setting-info">
                      <strong>Two-Factor Authentication</strong>
                      <span>Add an extra layer of security to your account</span>
                    </div>
                    <button className={`toggle-btn ${twoFactor ? 'on' : 'off'}`} onClick={() => setTwoFactor(!twoFactor)}>
                      <div className="toggle-circle"></div>
                    </button>
                  </div>

                  <div className="setting-row">
                    <div className="setting-info">
                      <strong>Delete Account</strong>
                      <span>Permanently remove your account and data</span>
                    </div>
                    <button className="del-btn-rect" onClick={handleDeleteAccount}>Delete Account</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .profile-page { padding-top: 100px; padding-bottom: 80px; min-height: 100vh; background: #fdfdfd; }
        
        /* Header Banner */
        .profile-header-banner { background: var(--dark-bg); color: white; padding: 4rem 3rem; border-radius: 40px; margin-bottom: 3rem; display: flex; justify-content: space-between; align-items: center; position: relative; overflow: hidden; }
        .profile-header-banner::before { content: ''; position: absolute; top: -50%; right: -10%; width: 300px; height: 300px; background: var(--primary-color); opacity: 0.1; filter: blur(100px); pointer-events: none; }
        .user-visual { display: flex; align-items: center; gap: 2rem; }
        .avatar-big { width: 100px; height: 100px; background: white; color: var(--primary-color); border-radius: 35% 65% 70% 30% / 30% 30% 70% 70%; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: 900; box-shadow: 0 15px 35px rgba(0,0,0,0.2); }
        .user-intro h1 { font-size: 2.5rem; font-weight: 900; letter-spacing: -1.5px; margin-bottom: 5px; }
        .user-intro p { opacity: 0.7; font-weight: 500; }
        .logout-btn-top { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .logout-btn-top:hover { background: #fa5252; border-color: #fa5252; }

        .profile-container { display: grid; grid-template-columns: 280px 1fr; gap: 3rem; align-items: flex-start; }
        
        /* Sidebar */
        .profile-sidebar nav { display: flex; flex-direction: column; gap: 0.5rem; }
        .tab-btn { background: none; border: none; padding: 1.2rem 1.5rem; border-radius: 20px; display: flex; align-items: center; gap: 1rem; font-weight: 700; color: var(--text-muted); cursor: pointer; transition: 0.2s; text-align: left; }
        .tab-btn .chevron { margin-left: auto; opacity: 0; transform: translateX(-10px); transition: 0.2s; }
        .tab-btn:hover { background: #f8f9fa; color: var(--text-main); }
        .tab-btn.active { background: white; color: var(--primary-color); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .tab-btn.active .chevron { opacity: 1; transform: translateX(0); }
        
        /* Content Area */
        .content-card { padding: 1rem; }
        .content-card h2 { font-size: 1.8rem; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 0.5rem; }
        .subtitle { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 2.5rem; font-weight: 500; }
        
        /* Profile Form */
        .premium-form { margin-top: 2rem; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
        .input-field label { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #aaa; margin-bottom: 8px; }
        .input-field input { width: 100%; border-radius: 16px; border: 1.5px solid #eee; padding: 1.1rem; outline: none; transition: 0.2s; background: #fafafa; font-weight: 600; }
        .input-field input:focus { border-color: var(--primary-color); background: white; }
        .input-field.disabled input { background: #f1f3f5; cursor: not-allowed; opacity: 0.6; }
        .submit-btn { width: auto; padding: 1.1rem 3rem; font-size: 1rem; }

        .loyalty-card { margin-top: 3rem; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 2rem; border-radius: 24px; color: white; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 15px 30px rgba(255, 165, 0, 0.2); }
        .loyalty-info h3 { font-size: 1.4rem; font-weight: 900; margin-bottom: 5px; }
        .loyalty-info p { opacity: 0.9; font-weight: 600; font-size: 0.9rem; }
        .loyalty-medal { font-size: 3rem; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.1)); }

        /* Address Section */
        .flex-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .add-btn-circle { width: 50px; height: 50px; border-radius: 50%; border: none; background: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 10px 20px rgba(255, 77, 77, 0.3); transition: 0.3s; }
        .add-btn-circle:hover { transform: rotate(90deg) scale(1.1); }
        
        .address-form-wrap { padding: 2rem; margin-bottom: 2.5rem; }
        .form-group-row select { width: 100%; padding: 1rem; border-radius: 14px; border: 1px solid #eee; margin-bottom: 1rem; font-weight: 700; color: var(--text-main); }
        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .address-form-wrap input { width: 100%; padding: 1rem; border-radius: 14px; border: 1px solid #eee; margin-bottom: 1rem; }
        
        .address-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .premium-addr-card { background: white; border: 1px solid #eee; border-radius: 20px; padding: 1.5rem; position: relative; transition: 0.2s; }
        .premium-addr-card:hover { border-color: var(--primary-color); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .addr-badge { display: inline-flex; align-items: center; gap: 8px; font-weight: 800; font-size: 0.85rem; color: var(--primary-color); background: #fff5f5; padding: 6px 12px; border-radius: 10px; margin-bottom: 1.2rem; }
        .addr-body .line1 { font-weight: 700; font-size: 1.1rem; color: var(--text-main); margin-bottom: 5px; }
        .addr-body .line2 { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; }
        .addr-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; border-top: 1px solid #f8f9fa; padding-top: 1.2rem; }
        .def-pill { color: #0ca678; font-weight: 800; font-size: 0.8rem; }
        .set-def { background: none; border: none; font-weight: 700; color: #228be6; cursor: pointer; font-size: 0.8rem; }
        .del-btn-icon { background: none; border: none; color: #fa5252; cursor: pointer; opacity: 0.5; transition: 0.2s; }
        .del-btn-icon:hover { opacity: 1; transform: scale(1.1); }

        /* Order History */
        .orders-timeline { display: flex; flex-direction: column; gap: 1.2rem; }
        .history-order-card { padding: 1.5rem; border-radius: 24px; position: relative; }
        .order-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .id-grp { display: flex; flex-direction: column; }
        .id-grp strong { font-size: 1.1rem; font-weight: 800; }
        .id-grp span { font-size: 0.8rem; color: #aaa; }
        .status-pill { padding: 4px 12px; border-radius: 10px; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
        .status-pill.delivered { background: #e6fcf5; color: #0ca678; }
        .status-pill.preparing { background: #fff4e6; color: #fd7e14; }
        .status-pill.out-for-delivery { background: #e7f5ff; color: #228be6; }
        .status-pill.placed { background: #f1f3f5; color: #868e96; }
        .order-items-list { font-size: 0.9rem; color: var(--text-muted); font-weight: 500; margin-bottom: 1.2rem; }
        .order-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px dashed #eee; }
        .order-bottom .amt { font-weight: 900; color: var(--text-main); }
        .reorder-btn { background: none; border: 1px solid var(--primary-color); color: var(--primary-color); padding: 6px 15px; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 0.85rem; transition: 0.2s; }
        .reorder-btn:hover { background: var(--primary-color); color: white; }

        .empty-state { text-align: center; padding: 4rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; color: var(--text-muted); }

        /* Settings Section */
        .settings-section { margin-bottom: 2rem; padding: 1.8rem; border-radius: 20px; border: 1px solid #eee; background: white; }
        .settings-title { display: flex; align-items: center; gap: 8px; font-size: 1.1rem; font-weight: 800; margin-bottom: 1.5rem; color: var(--text-main); border-bottom: 1px solid #f8f9fa; padding-bottom: 1rem; }
        .setting-row { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid #f8f9fa; border-top: none; }
        .setting-row:last-child { border-bottom: none; padding-bottom: 0; }
        .setting-info { display: flex; flex-direction: column; gap: 4px; }
        .setting-info strong { font-size: 0.95rem; font-weight: 700; color: var(--text-main); }
        .setting-info span { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }
        
        .toggle-btn { width: 44px; height: 24px; border-radius: 30px; border: none; cursor: pointer; position: relative; transition: 0.3s background; padding: 3px; flex-shrink: 0; }
        .toggle-btn.off { background: #e9ecef; }
        .toggle-btn.on { background: var(--primary-color); }
        .toggle-circle { width: 18px; height: 18px; background: white; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: 0.3s transform; }
        .toggle-btn.on .toggle-circle { transform: translateX(20px); }
        
        .btn-outline-small { display: flex; align-items: center; gap: 6px; background: none; border: 1.5px solid var(--primary-color); color: var(--primary-color); padding: 8px 16px; border-radius: 12px; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: 0.2s; white-space: nowrap; }
        .btn-outline-small:hover { background: var(--primary-color); color: white; }

        .settings-select { padding: 8px 12px; border-radius: 12px; border: 1.5px solid #eee; outline: none; font-weight: 600; color: var(--text-main); cursor: pointer; transition: 0.2s; }
        .settings-select:hover { border-color: var(--primary-color); }
        
        .danger-zone { border-color: #ffe3e3; }
        .danger-zone .settings-title { color: #fa5252; border-bottom-color: #ffe3e3; }
        .del-btn-rect { background: #fff5f5; color: #fa5252; border: 1.5px solid #ffc9c9; padding: 8px 16px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; font-size: 0.85rem; white-space: nowrap; }
        .del-btn-rect:hover { background: #fa5252; color: white; border-color: #fa5252; }

        body.dark-mode .settings-section { background: rgba(0,0,0,0.2); border-color: rgba(255,255,255,0.05); }
        body.dark-mode .settings-title { border-bottom-color: rgba(255,255,255,0.05); color: #fff;}
        body.dark-mode .setting-row { border-bottom-color: rgba(255,255,255,0.05); }
        body.dark-mode .toggle-btn.off { background: #333; }
        body.dark-mode .settings-select { background: #222; border-color: #444; }
        body.dark-mode .danger-zone { border-color: rgba(250,82,82,0.2); }
        body.dark-mode .danger-zone .settings-title { border-bottom-color: rgba(250,82,82,0.2); }

        @media (max-width: 968px) {
          .profile-container { grid-template-columns: 1fr; }
          .profile-header-banner { flex-direction: column; gap: 2rem; text-align: center; }
          .user-visual { flex-direction: column; }
          .form-grid { grid-template-columns: 1fr; }
          .profile-sidebar nav { flex-direction: row; overflow-x: auto; padding-bottom: 1rem; }
          .tab-btn { flex-shrink: 0; padding: 1rem; }
          .tab-btn .chevron { display: none; }
        }
      `}} />
    </div>
  );
};

export default Profile;
