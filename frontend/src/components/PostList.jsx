import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { fetchPosts } from '../services/api';

export default function PostList({ onSelectPost, onLiveStatusChange }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorNotice, setErrorNotice] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadPosts = React.useCallback(async () => {
    setLoading(true);
    setErrorNotice(null);
    const result = await fetchPosts();
    setPosts(result.data || []);
    setIsLive(result.isLive);
    setErrorNotice(result.error);
    if (onLiveStatusChange) {
      onLiveStatusChange(result.isLive);
    }
    setLoading(false);
  }, [onLiveStatusChange]);

  useEffect(() => {
    let ignore = false;
    async function fetchInitial() {
      setLoading(true);
      setErrorNotice(null);
      const result = await fetchPosts();
      if (!ignore) {
        setPosts(result.data || []);
        setIsLive(result.isLive);
        setErrorNotice(result.error);
        if (onLiveStatusChange) {
          onLiveStatusChange(result.isLive);
        }
        setLoading(false);
      }
    }
    fetchInitial();
    return () => {
      ignore = true;
    };
  }, [onLiveStatusChange]);

  const filteredPosts = posts.filter((post) => {
    const term = searchTerm.toLowerCase();
    const titleMatches = post.title?.toLowerCase().includes(term);
    const bodyMatches = post.body?.toLowerCase().includes(term);
    const authorMatches = post.author?.toLowerCase().includes(term);
    return titleMatches || bodyMatches || authorMatches;
  });

  return (
    <div className="posts-container">
      {/* Hero / Introduction banner */}
      <section className="hero-banner">
        <div className="hero-badge">React + Django REST Framework</div>
        <h1 className="hero-title">Blog Posts Feed</h1>
        <p className="hero-desc">
          Live frontend consuming Django REST API at{' '}
          <code>GET /blog/api/posts/</code> with CORS enabled.
        </p>

        {/* Live status alert */}
        {isLive ? (
          <div className="banner-alert success-alert">
            <span className="alert-icon">🟢</span>
            <div>
              <strong>Connected to Django Backend:</strong> Serving live posts directly from{' '}
              <code>http://127.0.0.1:8000/blog/api/posts/</code>.
            </div>
          </div>
        ) : (
          <div className="banner-alert warning-alert">
            <span className="alert-icon">💡</span>
            <div>
              <strong>Mock Mode Active:</strong> {errorNotice || 'Django server is not detected.'}{' '}
              To see live database posts, start Django with <code>cd mysite &amp;&amp; python manage.py runserver</code>.
            </div>
          </div>
        )}
      </section>

      {/* Toolbar: Search, Refresh, Stats */}
      <div className="posts-toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search posts by title, author, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              ×
            </button>
          )}
        </div>

        <div className="toolbar-actions">
          <span className="post-count-badge">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
          </span>
          <button className="refresh-btn" onClick={loadPosts} disabled={loading}>
            {loading ? 'Refreshing...' : '🔄 Refresh API'}
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Fetching posts from Django API (<code>/blog/api/posts/</code>)...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredPosts.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <h3>No posts found</h3>
          <p>
            {searchTerm
              ? `No posts matched "${searchTerm}". Try a different search.`
              : 'The Django database currently has no posts.'}
          </p>
          <div className="empty-state-actions">
            {searchTerm ? (
              <button className="btn-secondary" onClick={() => setSearchTerm('')}>
                Clear Search
              </button>
            ) : (
              <a
                href="http://127.0.0.1:8000/admin/blog/post/add/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                + Add Post in Django Admin
              </a>
            )}
          </div>
        </div>
      )}

      {/* Posts Grid */}
      {!loading && filteredPosts.length > 0 && (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onSelectPost={onSelectPost} />
          ))}
        </div>
      )}
    </div>
  );
}
