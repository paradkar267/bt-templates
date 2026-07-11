import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import Commercial from './pages/Commercial';
import Luxury from './pages/Luxury';
import Agencies from './pages/Agencies';
import Consultation from './pages/Consultation';
import MarketReports from './pages/MarketReports';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import { UserProvider, useUser } from './context/UserContext';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, wishlist } = useUser();
  
  return (
    <nav className="navbar">
      <Link to="/" className="logo">EstateFlow</Link>
      <ul className="nav-links">
        <li><Link to="/buy" className={location.pathname === '/buy' ? 'active' : ''}>Buy</Link></li>
        <li><Link to="/rent" className={location.pathname === '/rent' ? 'active' : ''}>Rent</Link></li>
        <li><Link to="/commercial" className={location.pathname === '/commercial' ? 'active' : ''}>Commercial</Link></li>
        <li><Link to="/luxury" className={location.pathname === '/luxury' ? 'active' : ''}>Luxury</Link></li>
        <li><Link to="/agencies" className={location.pathname === '/agencies' ? 'active' : ''}>Agencies</Link></li>
      </ul>
      <div className="nav-actions">
        <button className="icon-btn" onClick={() => navigate('/wishlist')} style={{ position: 'relative' }}>
          {wishlist.length > 0 ? '♥' : '♡'}
          {wishlist.length > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--primary-color)', color: 'white', fontSize: '0.6rem', borderRadius: '50%', width: '15px', height: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{wishlist.length}</span>}
        </button>
        <button className="icon-btn" onClick={() => navigate(user ? '/profile' : '/login')} style={{ position: 'relative' }}>
          👤
          {user && <span style={{ position: 'absolute', bottom: '0', right: '0', background: '#4CAF50', width: '8px', height: '8px', borderRadius: '50%', border: '2px solid white' }}></span>}
        </button>
        <button className="list-property-btn">List Property</button>
      </div>
    </nav>
  );
}

function AppContent() {
  return (
    <div className="app-container">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/commercial" element={<Commercial />} />
        <Route path="/luxury" element={<Luxury />} />
        <Route path="/agencies" element={<Agencies />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/reports" element={<MarketReports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>EstateFlow</h2>
            <p>Institutional-grade real estate advisory for global markets. Founded on transparency, driven by data.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Company</h4>
              <Link to="#">About Us</Link>
              <Link to="#">Leadership</Link>
              <Link to="#">Global Offices</Link>
              <Link to="#">Careers</Link>
            </div>
            <div className="link-group">
              <h4>Services</h4>
              <Link to="#">Commercial Sale</Link>
              <Link to="#">Luxury Residential</Link>
              <Link to="#">Investment Advisory</Link>
              <Link to="#">Asset Management</Link>
            </div>
            <div className="link-group">
              <h4>Legal & Connect</h4>
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Terms of Service</Link>
              <Link to="#">Contact Us</Link>
              <Link to="#">Sitemap</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ margin: 0 }}>© 2024 EstateFlow Global. All rights reserved.</p>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            Developed by <a href="https://bizleap.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none', borderBottom: '1px solid var(--primary-color)' }}>BIZLEAP</a>
          </p>
          <div className="social-icons">
            <span>🌐</span>
            <span>⑂</span>
            <span>✉</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
