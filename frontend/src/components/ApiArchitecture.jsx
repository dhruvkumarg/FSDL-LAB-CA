import React, { useState } from 'react';

export default function ApiArchitecture() {
  const [activeTab, setActiveTab] = useState('flow');

  return (
    <div className="arch-container">
      <div className="arch-header">
        <span className="arch-pill">Presentation Guide</span>
        <h1 className="arch-title">Decoupled Architecture: React + Django REST</h1>
        <p className="arch-subtitle">
          How our React Vite SPA talks to the Django REST Framework backend with Cross-Origin Resource Sharing (CORS).
        </p>

        <div className="arch-tab-buttons">
          <button
            className={`arch-tab-btn ${activeTab === 'flow' ? 'active' : ''}`}
            onClick={() => setActiveTab('flow')}
          >
            🔄 End-to-End Request Flow
          </button>
          <button
            className={`arch-tab-btn ${activeTab === 'cors' ? 'active' : ''}`}
            onClick={() => setActiveTab('cors')}
          >
            🛡️ CORS & Security
          </button>
          <button
            className={`arch-tab-btn ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            💻 Code Comparison (MTV vs API)
          </button>
        </div>
      </div>

      {activeTab === 'flow' && (
        <div className="arch-card">
          <h2>Request Lifecycle: Browser to SQLite Database</h2>
          <div className="flow-diagram">
            <div className="flow-step">
              <div className="step-badge">1. React SPA</div>
              <div className="step-body">
                <strong>Vite Client (:5173)</strong>
                <p>Component mounts; <code>useEffect</code> executes <code>fetch(&apos;http://127.0.0.1:8000/blog/api/posts/&apos;)</code>.</p>
              </div>
            </div>

            <div className="flow-arrow">➡️</div>

            <div className="flow-step">
              <div className="step-badge">2. Django Middleware</div>
              <div className="step-body">
                <strong>corsheaders Middleware</strong>
                <p>Checks <code>Origin: http://localhost:5173</code> against <code>CORS_ALLOWED_ORIGINS</code>.</p>
              </div>
            </div>

            <div className="flow-arrow">➡️</div>

            <div className="flow-step">
              <div className="step-badge">3. URL Routing</div>
              <div className="step-body">
                <strong>mysite &amp; blog URLs</strong>
                <p><code>mysite/urls.py</code> routes <code>blog/</code> to <code>blog/urls.py</code> &rarr; <code>PostListApi.as_view()</code>.</p>
              </div>
            </div>

            <div className="flow-arrow">➡️</div>

            <div className="flow-step">
              <div className="step-badge">4. DRF View &amp; Serializer</div>
              <div className="step-body">
                <strong>PostSerializer</strong>
                <p>Queries ORM <code>Post.objects.select_related(&apos;author&apos;)</code> and serializes model instances to JSON.</p>
              </div>
            </div>

            <div className="flow-arrow">➡️</div>

            <div className="flow-step">
              <div className="step-badge">5. Database</div>
              <div className="step-body">
                <strong>SQLite (db.sqlite3)</strong>
                <p>Executes SQL query; results serialize to JSON array and return with HTTP 200.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cors' && (
        <div className="arch-card">
          <h2>Why CORS is Necessary &amp; How It Is Configured</h2>
          <p>
            Browsers enforce the <strong>Same-Origin Policy</strong> by default. Because Vite runs on{' '}
            <code>http://localhost:5173</code> and Django runs on <code>http://127.0.0.1:8000</code>,
            they have different ports and constitute distinct origins.
          </p>

          <div className="code-comparison-grid">
            <div className="code-box">
              <h4>1. mysite/mysite/settings.py</h4>
              <pre>
{`INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',  # added
    'blog',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # top
    'django.middleware.security.SecurityMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',          # React dev server
    'https://dhruvkumarg.github.io',  # Vlab GitHub Pages
]`}
              </pre>
            </div>

            <div className="code-box">
              <h4>2. frontend/src/services/api.js</h4>
              <pre>
{`// Client-side fetch with JSON headers
const response = await fetch(
  'http://127.0.0.1:8000/blog/api/posts/'
);
const posts = await response.json();`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="arch-card">
          <h2>Traditional Django MTV vs Decoupled React API</h2>
          <div className="code-comparison-grid">
            <div className="code-box">
              <h4>Traditional Django (Template View)</h4>
              <pre>
{`# mysite/blog/views.py
def post_list(request):
    posts = Post.objects.order_by('-created_at')
    # Server renders HTML template
    return render(
        request, 
        'blog/post_list.html', 
        {'posts': posts}
    )`}
              </pre>
            </div>

            <div className="code-box">
              <h4>Decoupled Django REST + React</h4>
              <pre>
{`# mysite/blog/views.py
class PostListApi(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

// frontend/src/components/PostList.jsx
useEffect(() => {
  fetchPosts().then(res => setPosts(res.data));
}, []);`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
