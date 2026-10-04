import React, { useState } from 'react';
import { submitFeedback } from '../services/api';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    institute: '',
    overall_rating: 5,
    theory_rating: 5,
    simulation_rating: 5,
    quiz_rating: 5,
    difficulty: 'just_right',
    liked: '',
    improvements: '',
    would_recommend: true,
    sections: {
      theory: true,
      simulation: true,
      quiz: true,
      react: true,
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);
  const [notice, setNotice] = useState(null);

  const handleRatingClick = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSectionToggle = (section) => {
    setFormData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections[section],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFieldErrors({});
    setNotice(null);

    // Client-side quick checks
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = ['Please enter a name (at least 2 characters).'];
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = ['Please enter a valid email address.'];
    }
    if (Number(formData.overall_rating) <= 2 && !formData.improvements.trim()) {
      errors.improvements = ['Please tell us what went wrong so we can fix it.'];
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitting(false);
      return;
    }

    const sectionsUsed = Object.entries(formData.sections)
      .filter(([, active]) => active)
      .map(([name]) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(', ');

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
      institute: formData.institute.trim(),
      overall_rating: Number(formData.overall_rating),
      theory_rating: Number(formData.theory_rating),
      simulation_rating: Number(formData.simulation_rating),
      quiz_rating: Number(formData.quiz_rating),
      difficulty: formData.difficulty,
      liked: formData.liked.trim(),
      improvements: formData.improvements.trim(),
      would_recommend: Boolean(formData.would_recommend),
      sections_used: sectionsUsed,
    };

    const result = await submitFeedback(payload);

    if (result.ok) {
      setSubmissionResult(result.data);
    } else if (result.isOffline) {
      setNotice({
        type: 'warning',
        text: result.error,
      });
      // Simulate mock success for smooth demo experience
      setSubmissionResult({
        ok: true,
        id: '(demo)',
        message: `Thank you, ${payload.name}! Feedback validated. (Django server offline; start runserver to persist in SQLite).`,
      });
    } else {
      setFieldErrors(result.errors || {});
      setNotice({
        type: 'error',
        text: 'Please correct the highlighted fields and resubmit.',
      });
    }

    setSubmitting(false);
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setNotice(null);
    setFieldErrors({});
    setFormData({
      name: '',
      email: '',
      role: 'student',
      institute: '',
      overall_rating: 5,
      theory_rating: 5,
      simulation_rating: 5,
      quiz_rating: 5,
      difficulty: 'just_right',
      liked: '',
      improvements: '',
      would_recommend: true,
      sections: {
        theory: true,
        simulation: true,
        quiz: true,
        react: true,
      },
    });
  };

  if (submissionResult) {
    return (
      <div className="feedback-container">
        <div className="feedback-success-card">
          <span className="success-badge-icon">🎉</span>
          <h2>Feedback Submitted!</h2>
          <p className="success-message">
            {submissionResult.message || 'Your feedback has been saved successfully to the database.'}
          </p>

          <div className="success-details">
            <div className="detail-row">
              <span className="label">Endpoint:</span>
              <code>POST /blog/api/feedback/</code>
            </div>
            <div className="detail-row">
              <span className="label">Database ID:</span>
              <strong>#{submissionResult.id}</strong>
            </div>
            <div className="detail-row">
              <span className="label">Database Model:</span>
              <code>blog.models.Feedback</code>
            </div>
          </div>

          <div className="success-actions">
            <button className="btn-primary" onClick={handleReset}>
              Submit Another Response
            </button>
            <a
              href="http://127.0.0.1:8000/admin/blog/feedback/"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              ⚙️ View in Django Admin
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <div className="feedback-header">
          <span className="feedback-pill">Django API Integration</span>
          <h1 className="feedback-title">Virtual Lab Feedback</h1>
          <p className="feedback-subtitle">
            Submits directly to Django's <code>POST /blog/api/feedback/</code> and persists to{' '}
            <code>db.sqlite3</code>.
          </p>
        </div>

        {notice && (
          <div className={`alert-box alert-${notice.type}`}>
            <span>{notice.type === 'warning' ? '⚠️' : '❌'}</span>
            <div>{notice.text}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="feedback-form" noValidate>
          {/* Identity row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`form-input ${fieldErrors.name ? 'input-error' : ''}`}
                placeholder="e.g. Prajeet Godse"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {fieldErrors.name && (
                <span className="error-text">{fieldErrors.name.join(' ')}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input ${fieldErrors.email ? 'input-error' : ''}`}
                placeholder="you@somaiya.edu"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {fieldErrors.email && (
                <span className="error-text">{fieldErrors.email.join(' ')}</span>
              )}
            </div>
          </div>

          {/* Role and Institute */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher / Faculty</option>
                <option value="developer">Developer</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="institute" className="form-label">
                College / Organization
              </label>
              <input
                id="institute"
                name="institute"
                type="text"
                className="form-input"
                placeholder="e.g. K. J. Somaiya School of Engineering"
                value={formData.institute}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Ratings Grid */}
          <div className="ratings-section">
            <h3 className="section-title">Experience & Clarity Ratings (1–5)</h3>

            <div className="rating-row">
              <span className="rating-label">Overall Experience:</span>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${formData.overall_rating >= star ? 'selected' : ''}`}
                    onClick={() => handleRatingClick('overall_rating', star)}
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>

            <div className="rating-row">
              <span className="rating-label">Theory Clarity:</span>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${formData.theory_rating >= star ? 'selected' : ''}`}
                    onClick={() => handleRatingClick('theory_rating', star)}
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>

            <div className="rating-row">
              <span className="rating-label">Simulation Usefulness:</span>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${formData.simulation_rating >= star ? 'selected' : ''}`}
                    onClick={() => handleRatingClick('simulation_rating', star)}
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>

            <div className="rating-row">
              <span className="rating-label">Quiz / Test Quality:</span>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${formData.quiz_rating >= star ? 'selected' : ''}`}
                    onClick={() => handleRatingClick('quiz_rating', star)}
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="form-group">
            <label className="form-label">Difficulty Level</label>
            <div className="pill-group">
              {[
                { value: 'easy', label: 'Easy' },
                { value: 'just_right', label: 'Just Right' },
                { value: 'hard', label: 'Challenging' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`pill-option ${formData.difficulty === option.value ? 'active' : ''}`}
                  onClick={() => setFormData((p) => ({ ...p, difficulty: option.value }))}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sections Used */}
          <div className="form-group">
            <label className="form-label">Which Sections Did You Use?</label>
            <div className="checkbox-grid">
              {['theory', 'simulation', 'quiz', 'react'].map((sectionKey) => (
                <label key={sectionKey} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.sections[sectionKey]}
                    onChange={() => handleSectionToggle(sectionKey)}
                  />
                  <span>
                    {sectionKey === 'theory' && 'Theory & Structure'}
                    {sectionKey === 'simulation' && 'Interactive Simulation'}
                    {sectionKey === 'quiz' && 'Pretest & Posttest'}
                    {sectionKey === 'react' && 'React Frontend'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Freeform comments */}
          <div className="form-group">
            <label htmlFor="liked" className="form-label">
              What did you like most?
            </label>
            <textarea
              id="liked"
              name="liked"
              rows={3}
              className="form-textarea"
              placeholder="e.g. The interactive terminal simulation and clear MTV diagram helped me understand Django immediately."
              value={formData.liked}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="improvements" className="form-label">
              What can we improve?{' '}
              {Number(formData.overall_rating) <= 2 && (
                <span className="required">(Required for rating ≤ 2)</span>
              )}
            </label>
            <textarea
              id="improvements"
              name="improvements"
              rows={3}
              className={`form-textarea ${fieldErrors.improvements ? 'input-error' : ''}`}
              placeholder="e.g. Add more examples of URL patterns and REST framework serializers."
              value={formData.improvements}
              onChange={handleInputChange}
            ></textarea>
            {fieldErrors.improvements && (
              <span className="error-text">{fieldErrors.improvements.join(' ')}</span>
            )}
          </div>

          {/* Recommendation toggle */}
          <div className="form-group recommendation-toggle">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="would_recommend"
                checked={formData.would_recommend}
                onChange={handleInputChange}
              />
              <span>I would recommend this Virtual Lab to other engineering students</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-feedback-btn" disabled={submitting}>
              {submitting ? 'Submitting to Django API...' : '🚀 Submit Feedback to Database'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
