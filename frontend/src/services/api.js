/**
 * API Service for connecting the React frontend to the Django backend.
 * Django Base URL: http://127.0.0.1:8000/blog/api/
 * 
 * Configured in mysite/mysite/settings.py:
 * CORS_ALLOWED_ORIGINS = ['http://localhost:5173', ...]
 */

export const API_BASE_URL = 'http://127.0.0.1:8000/blog/api';

export const MOCK_POSTS = [
  {
    id: 1,
    title: "Understanding Django Project vs App Structure",
    slug: "understanding-django-project-vs-app-structure",
    author: "Dhruv Goenka",
    body: "A Django project is the overall configuration container for a web application, containing settings.py, root urls.py, and server entry points (wsgi.py / asgi.py). An app is a self-contained, modular Python package designed to perform a specific function—such as our 'blog' app. A project can host multiple apps, and apps can be reused across different Django projects.",
    created_at: "2026-10-04T10:15:00Z"
  },
  {
    id: 2,
    title: "Mastering the Model-Template-View (MTV) Pattern",
    slug: "mastering-the-model-template-view-mtv-pattern",
    author: "Shlok Tiwari",
    body: "Django follows the MTV (Model-Template-View) architectural pattern. The Model (models.py) defines data structure and database tables via the ORM. The View (views.py) processes requests and coordinates data retrieval. In traditional Django, the Template (templates/) renders HTML; in a modern decoupled architecture, Django REST Framework (serializers.py) transforms models into JSON for React consumers.",
    created_at: "2026-10-04T12:30:00Z"
  },
  {
    id: 3,
    title: "Connecting a React Frontend to Django REST Framework",
    slug: "connecting-react-frontend-to-django-rest-framework",
    author: "Prajeet Godse",
    body: "By configuring django-cors-headers in Django's settings.py, a React development server running on http://localhost:5173 can query Django REST Framework endpoints. Using standard fetch inside React useEffect hooks, frontend components consume endpoints like GET /blog/api/posts/ and submit user feedback to POST /blog/api/feedback/ seamlessly across origins.",
    created_at: "2026-10-04T15:45:00Z"
  }
];

/**
 * Check if the Django backend is reachable.
 */
export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(`${API_BASE_URL}/posts/`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Fetch all posts from GET /blog/api/posts/
 * Falls back to mock data if the Django backend is unreachable.
 */
export async function fetchPosts() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const response = await fetch(`${API_BASE_URL}/posts/`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return { data, isLive: true, error: null };
  } catch (err) {
    return {
      data: MOCK_POSTS,
      isLive: false,
      error: `Could not reach Django API at ${API_BASE_URL}/posts/ (${err.message}). Showing mock data.`
    };
  }
}

/**
 * Fetch a single post by ID from GET /blog/api/posts/<id>/
 */
export async function fetchPostDetail(id) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const response = await fetch(`${API_BASE_URL}/posts/${id}/`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return { data, isLive: true, error: null };
  } catch (err) {
    const fallback = MOCK_POSTS.find((p) => p.id === Number(id));
    if (fallback) {
      return { data: fallback, isLive: false, error: `Using offline data (${err.message})` };
    }
    return { data: null, isLive: false, error: err.message };
  }
}

/**
 * Submit feedback to POST /blog/api/feedback/
 */
export async function submitFeedback(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      return { ok: false, errors: data.errors || { __all__: ['Failed to save feedback.'] } };
    }
    return { ok: true, data };
  } catch (err) {
    // If backend is offline, simulate successful submission for demo resilience
    return {
      ok: false,
      isOffline: true,
      error: `Django backend is offline (${err.message}). Start 'python manage.py runserver' on port 8000 to save to db.sqlite3.`
    };
  }
}
