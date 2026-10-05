import React from 'react';

export default function Navbar({ activeTab, setActiveTab, isLive, isChecking }) {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand" onClick={() => setActiveTab('posts')} role="button" tabIndex={0}>
          <div className="brand-logo">
            <span className="logo-icon">⚡</span>
          </div>
          <div className="brand-text">
            <span className="brand-title">DjangoBlog <span className="react-pill">React</span></span>
            <span className="brand-subtitle">Virtual Lab: Django & React Integration</span>
          </div>
        </div>

        <div className="header-actions">
          <div className={`status-badge ${isChecking ? 'checking' : isLive ? 'online' : 'mock'}`}>
            <span className="status-dot"></span>
            <span className="status-label">
              {isChecking ? 'Checking API...' : isLive ? 'Django API: Online (:8000)' : 'API Offline (Mock Mode)'}
            </span>
          </div>

          <nav className="nav-tabs">
            <button
              className={`nav-btn ${activeTab === 'posts' || activeTab === 'detail' ? 'active' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              📰 Posts
            </button>
            <button
              className={`nav-btn ${activeTab === 'feedback' ? 'active' : ''}`}
              onClick={() => setActiveTab('feedback')}
            >
              ✍️ Give Feedback
            </button>
            <button
              className={`nav-btn ${activeTab === 'architecture' ? 'active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              🔍 MTV & API Architecture
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
