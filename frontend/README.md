# DjangoBlog — React Frontend (Vite)

**Owner:** Person 3 (Prajeet — @prajeetgodse-stack)  
**Branch:** `p3-react-frontend`  
**Lab:** Virtual Lab: Understanding Django Project and App Structure (FSDL Lab CA)

---

## Overview

This is the decoupled Single Page Application (SPA) for the DjangoBlog virtual lab. It is built with **React** and **Vite**, connecting to the Django REST Framework backend over CORS.

### Key Features

1. **Post List (`PostList.jsx`)**:
   - Fetches posts from Django REST Framework endpoint `GET /blog/api/posts/`.
   - Real-time search filter by title, author, or content.
   - Live backend connectivity detector with automatic fallback to mock data if the Django server is offline.
   - Manual API refresh button and post counter.

2. **Post Detail (`PostDetail.jsx`)**:
   - Fetches individual post from `GET /blog/api/posts/<id>/`.
   - Displays author, publication timestamp, slug badge, and full article text.
   - Live DRF JSON inspector showcasing `PostSerializer` output.
   - Direct navigation links to Django SSR view (`/blog/posts/<id>/`) and Django Admin (`/admin/blog/post/<id>/change/`).

3. **Feedback Submission (`FeedbackForm.jsx`)**:
   - Submits feedback to `POST /blog/api/feedback/`.
   - Matches Django's `FeedbackForm` validation rules (name length, valid email, mandatory improvement feedback if rating &le; 2).
   - Star rating controls, difficulty selector, and section usage checkboxes.
   - Live submission confirmation displaying the assigned database ID with direct link to view in Django Admin.

4. **MTV & API Architecture Guide (`ApiArchitecture.jsx`)**:
   - Interactive visual walkthrough explaining the request lifecycle from React SPA &rarr; CORS Middleware &rarr; Django URLs &rarr; DRF View/Serializer &rarr; SQLite.
   - Explains why CORS is necessary and how `CORS_ALLOWED_ORIGINS` in `mysite/settings.py` allows `http://localhost:5173`.
   - Code comparison between traditional Django MTV rendering vs decoupled DRF API.

---

## Quick Start

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Start development server
```bash
npm run dev
```

The Vite dev server will start at `http://localhost:5173`.

### 3. Connect to Django backend
In a separate terminal, start the Django development server:
```bash
cd mysite
# activate your virtual environment
python manage.py runserver
```

Once running at `http://127.0.0.1:8000/`, the React frontend will automatically detect the live API and switch to live mode!

---

## Building for Production

```bash
npm run build
```

Production assets will be built in the `dist/` directory.
