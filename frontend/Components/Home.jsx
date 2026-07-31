import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '65vh' }}>
      <h1 className="fw-bold mb-3 text-dark" style={{ fontSize: '3rem', letterSpacing: '-1px' }}>
        Organize your work, <br />
        <span style={{ color: 'var(--primary-accent)' }}>effortlessly.</span>
      </h1>
      <p className="text-soft-secondary mb-5" style={{ fontSize: '1.15rem', maxWidth: '600px', lineHeight: '1.6' }}>
        A simple, minimalist To Do application designed to keep you focused on what matters most. No clutter, just productivity.
      </p>
      
      <div className="d-flex gap-3">
        <Link to="/register" className="soft-btn-primary">
          SignUp
        </Link>
        <Link to="/login" className="btn bg-white transition-all shadow-sm" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1.5rem', fontWeight: 500, color: 'var(--text-primary)' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
          Log In
        </Link>
      </div>
    </div>
  );
}

export default Home;
