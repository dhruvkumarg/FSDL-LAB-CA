import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import FeedbackForm from './components/FeedbackForm';
import ApiArchitecture from './components/ApiArchitecture';
import Footer from './components/Footer';
import { checkBackendHealth } from './services/api';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function checkHealth() {
      setIsChecking(true);
      const online = await checkBackendHealth();
      if (mounted) {
        setIsLive(online);
        setIsChecking(false);
      }
    }
    checkHealth();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSelectPost = (id) => {
    setSelectedPostId(id);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPosts = () => {
    setSelectedPostId(null);
    setActiveTab('posts');
  };

  const handleTabChange = (tab) => {
    if (tab === 'posts') {
      setSelectedPostId(null);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isLive={isLive}
        isChecking={isChecking}
      />

      <main className="main-content">
        {activeTab === 'posts' && (
          <PostList
            onSelectPost={handleSelectPost}
            onLiveStatusChange={(live) => setIsLive(live)}
          />
        )}

        {activeTab === 'detail' && selectedPostId && (
          <PostDetail
            postId={selectedPostId}
            onBack={handleBackToPosts}
          />
        )}

        {activeTab === 'feedback' && <FeedbackForm />}

        {activeTab === 'architecture' && <ApiArchitecture />}
      </main>

      <Footer />
    </div>
  );
}
