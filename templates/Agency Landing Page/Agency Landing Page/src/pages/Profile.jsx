import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Profile() {
  const { user, logout, updateProfile } = useUser();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || { name: '', email: '', phone: '' });

  // If directly navigated without login
  if (!user) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--white)' }}>
        <h2 style={{ marginBottom: '1rem' }}>You are not logged in</h2>
        <button className="btn-primary" onClick={() => navigate('/login')}>Go to Sign In</button>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '80vh', padding: '4rem 5%', backgroundColor: 'var(--secondary-color)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--white)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', color: 'white' }}>My Profile</h1>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.8 }}>Manage your personal details</p>
          </div>
          <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--accent-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>

        <div style={{ padding: '3rem 2rem' }}>
          {isEditing ? (
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} required />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email Address</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} required />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone Number</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn-primary">Save Changes</button>
                <button type="button" className="btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '3rem', fontSize: '1.1rem' }}>
                <strong style={{ color: 'var(--text-secondary)' }}>Full Name:</strong>
                <span>{user.name}</span>
                
                <strong style={{ color: 'var(--text-secondary)' }}>Email Address:</strong>
                <span>{user.email}</span>
                
                <strong style={{ color: 'var(--text-secondary)' }}>Phone Number:</strong>
                <span>{user.phone || 'Not provided'}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                <button className="btn-outline" onClick={() => setIsEditing(true)}>Edit Profile</button>
                <button className="btn-primary" onClick={handleLogout} style={{ backgroundColor: '#e53935', borderColor: '#e53935' }}>Sign Out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
