import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import MobileBottomNav from './components/MobileBottomNav';
import MobileFloatingCart from './components/MobileFloatingCart';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Menu from './pages/Menu';
import Search from './pages/Search';
import Brand from './pages/Brand'; // Added import for Brand
import Grocery from './pages/Grocery';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Offers from './pages/Offers';
import Track from './pages/Track';
import Support from './pages/Support';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { LanguageProvider } from './context/LanguageProvider';
import './index.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
              <div className="app-container">
                <Navbar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/menu/:category" element={<Menu />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/brand/:brandName" element={<Brand />} /> {/* Added route for Brand */}
                    <Route path="/grocery/:categoryName" element={<Grocery />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/track" element={<Track />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                  </Routes>
                </main>
                <MobileFloatingCart />
                <MobileBottomNav />
                <Footer />
              </div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
