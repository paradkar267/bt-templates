import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Consultation() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'agent', text: 'Hello! Welcome to EstateFlow Consultation. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'client', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'agent', text: 'Thank you for your message. One of our senior advisors will review this and respond shortly.' }]);
    }, 1000);
  };

  return (
    <div style={{ minHeight: '80vh', backgroundColor: 'var(--secondary-color)', padding: '2rem 5%' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
        <span style={{ fontSize: '1.5rem' }}>←</span> Back to Home
      </Link>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--white)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '600px' }}>
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--primary-color)', color: 'var(--white)' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--white)' }}>Consultation Chat</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>Talk with our Corporate Real Estate Advisors</p>
        </div>
        
        <div style={{ flexGrow: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ alignSelf: msg.sender === 'client' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
              <div style={{ 
                padding: '1rem', 
                borderRadius: '8px', 
                backgroundColor: msg.sender === 'client' ? 'var(--primary-color)' : '#f0f0f0',
                color: msg.sender === 'client' ? 'var(--white)' : 'var(--text-primary)'
              }}>
                {msg.text}
              </div>
              <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', textAlign: msg.sender === 'client' ? 'right' : 'left', color: 'var(--text-light)' }}>
                {msg.sender === 'client' ? 'You' : 'EstateFlow Expert'}
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSend} style={{ display: 'flex', padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..." 
            style={{ flexGrow: 1, padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', marginRight: '1rem', outline: 'none' }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px' }}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Consultation;
