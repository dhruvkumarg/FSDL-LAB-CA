import React, { useState, useEffect } from 'react';
import { fetchPostDetail } from '../services/api';

export default function PostDetail({ postId, onBack }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorNotice, setErrorNotice] = useState(null);
  const [showJsonInspector, setShowJsonInspector] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadPost() {
      setLoading(true);
      setErrorNotice(null);
      const res = await fetchPostDetail(postId);
      if (isMounted) {
        if (res.data) {
          setPost(res.data);
        } else {
          setErrorNotice(res.error || 'Failed to load post.');
        }
        setLoading(false);
      }
    }
    loadPost();
    return () => {
      isMounted = false;
    };
  }, [postId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="post-detail-container">
        <button className="back-btn" onClick={onBack}>
          ← Back to All Posts
        </button>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading post #{postId} from Django REST API...</p>
        </div>
      </div>
    );
  }

  if (errorNotice || !post) {
    return (
      <div className="post-detail-container">
        <button className="back-btn" onClick={onBack}>
          ← Back to All Posts
        </button>
        <div className="error-card">
          <span className="error-icon">⚠️</span>
          <h3>Post Not Found</h3>
          <p>{errorNotice || `Post ID ${postId} could not be retrieved.`}</p>
          <button className="btn-primary" onClick={onBack}>
            Return to Posts List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      {/* Navigation breadcrumbs */}
      <div className="detail-navigation">
        <button className="back-btn" onClick={onBack}>
          ← Back to All Posts
        </button>
        <div className="api-endpoint-badge">
          <code>GET /blog/api/posts/{post.id}/</code>
        </div>
      </div>

      <article className="post-detail-card">
        {/* Post Header */}
        <header className="detail-header">
          <div className="detail-badges">
            <span className="badge slug-badge">slug: {post.slug || 'none'}</span>
            <span className="badge id-badge">ID: #{post.id}</span>
          </div>

          <h1 className="detail-title">{post.title}</h1>

          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-icon">👤</span>
              <span className="meta-label">Author:</span>
              <strong className="meta-value">{post.author || 'Anonymous'}</strong>
            </div>
            <div className="meta-item">
              <span className="meta-icon">🗓️</span>
              <span className="meta-label">Published:</span>
              <span className="meta-value">{formatDate(post.created_at)}</span>
            </div>
          </div>
        </header>

        {/* Post Body */}
        <div className="detail-body">
          {post.body.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Integration Links */}
        <div className="detail-links">
          <a
            href={`http://127.0.0.1:8000/blog/posts/${post.id}/`}
            target="_blank"
            rel="noreferrer"
            className="integration-link"
          >
            🔗 View in Django Template View (SSR)
          </a>
          <a
            href={`http://127.0.0.1:8000/admin/blog/post/${post.id}/change/`}
            target="_blank"
            rel="noreferrer"
            className="integration-link admin-link"
          >
            ⚙️ Edit in Django Admin
          </a>
          <button
            className="integration-link code-toggle-btn"
            onClick={() => setShowJsonInspector(!showJsonInspector)}
          >
            {showJsonInspector ? 'Hide JSON Inspector' : 'Show DRF JSON Response'}
          </button>
        </div>

        {/* DRF JSON Inspector */}
        {showJsonInspector && (
          <div className="json-inspector">
            <div className="json-header">
              <span>Django REST Framework Output (PostSerializer)</span>
              <code>HTTP 200 OK · application/json</code>
            </div>
            <pre className="json-code">
              {JSON.stringify(post, null, 2)}
            </pre>
          </div>
        )}
      </article>
    </div>
  );
}
