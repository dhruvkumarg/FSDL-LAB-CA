import React from 'react';

export default function PostCard({ post, onSelectPost }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const truncateBody = (text, maxLength = 160) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
  };

  return (
    <article className="post-card">
      <div className="post-card-header">
        <span className="post-slug-tag">#{post.slug || `post-${post.id}`}</span>
        <span className="post-date">{formatDate(post.created_at)}</span>
      </div>

      <h3 className="post-card-title" onClick={() => onSelectPost(post.id)}>
        {post.title}
      </h3>

      <div className="post-meta">
        <span className="author-icon">✍️</span>
        <span className="author-name">{post.author || 'Anonymous'}</span>
      </div>

      <p className="post-card-snippet">{truncateBody(post.body)}</p>

      <div className="post-card-footer">
        <button
          className="read-more-btn"
          onClick={() => onSelectPost(post.id)}
          aria-label={`Read full post: ${post.title}`}
        >
          Read Article <span className="arrow-icon">→</span>
        </button>
      </div>
    </article>
  );
}
