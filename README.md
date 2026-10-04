# Virtual Lab: Understanding Django Project and App Structure

**🔗 Live Virtual Lab: https://dhruvkumarg.github.io/FSDL-LAB-CA/**

FSDL Lab CA project: a Virtual Lab (Aim, Theory, Pretest, Procedure, Simulation, Posttest, References, Contributors, Feedback) that teaches how a Django project and its apps are organised, plus the complete working Django project built in the lab.

| Team member | GitHub | Role |
|---|---|---|
| Dhruv Goenka | [@dhruvkumarg](https://github.com/dhruvkumarg) | Django setup & project structure |
| Shlok | [@Shlok148Dev](https://github.com/Shlok148Dev) | Models, URLs, views & admin |
| Prajeet | [@prajeetgodse-stack](https://github.com/prajeetgodse-stack) | React frontend |
| Arnav | [@Arnav872iron](https://github.com/Arnav872iron) | Virtual Lab, testing & deployment |

See [WORKFLOW.md](WORKFLOW.md) for the task split, git workflow and current status.

---

## Aim

To understand how a Django web application is organised by creating a **project** and an **app**, examining the purpose of every generated file, and connecting the app to the project so that it serves pages, stores data in a database, and is managed through the Django admin.

### Objectives

1. **Distinguish a project from an app.** A project is the whole website (settings, root URLs, server entry points); an app is a reusable module that does one job (here, `blog`).
2. **Create the structure from the command line** using `django-admin startproject mysite` and `python manage.py startapp blog`, and identify what each command generates.
3. **Explain the role of every generated file:** `manage.py`, `settings.py`, `urls.py`, `wsgi.py`, `asgi.py`, `__init__.py` in the project; `models.py`, `views.py`, `admin.py`, `apps.py`, `tests.py` and `migrations/` in the app.
4. **Register an app** in `INSTALLED_APPS` and understand why Django ignores an app's models, templates and admin until it is registered.
5. **Route URLs** from the project's `urls.py` to the app's own `urls.py` with `include()`, and map paths to views.
6. **Apply the MTV pattern:** define a model, write views, and render HTML with templates using inheritance (`{% extends %}`), includes, `{% url %}` and filters.
7. **Work with the database** through migrations (`makemigrations`, `migrate`) and the ORM.
8. **Use the Django admin** to manage data, and customise its appearance and list views.
9. **Handle user input safely** with Django forms: validation, error messages, CSRF protection, and a JSON API endpoint.
10. **Trace a request end to end:** browser → `mysite/urls.py` → `blog/urls.py` → view → model/database → template → response.

### Learning outcomes

After completing this lab, the student will be able to:
- Set up a Django project in a virtual environment and run it with `runserver`.
- Navigate any Django codebase by knowing where configuration, routing, data, logic and presentation live.
- Add a new app to an existing project and wire it up correctly.
- Diagnose common structure mistakes (app not in `INSTALLED_APPS`, URLs not included, missing view) from Django's error pages.
- Explain how the same project is run locally (development server) and in production (WSGI/ASGI, hosted server).

### Prerequisites

- Basic Python (functions, classes, imports, packages)
- Basic HTML
- Familiarity with the command line

### Tools used

| Tool | Purpose |
|---|---|
| Python 3 + Django | Web framework |
| SQLite | Default database |
| Django REST Framework, django-cors-headers | API and cross-origin access for the Vlab/React |
| HTML, CSS, JavaScript | Virtual Lab page |
| Git, GitHub, GitHub Pages | Version control, collaboration, hosting the Vlab |
| VS Code | Editor |

---

## Features

**Virtual Lab (`index.html`, hosted on GitHub Pages)**
- Theory: project vs app comparison, file layouts and request flow
- Pretest and Posttest quizzes with instant scoring and explanations
- Interactive simulation: run `django-admin startproject`, `startapp` and `runserver` in a mock terminal, explore the generated files, wire up `INSTALLED_APPS` and URLs, and see real Django errors when a step is skipped
- Detailed feedback form that **saves to the Django database** through a JSON API
- **⚙ Admin** button linking to the Django admin

**Django project (`mysite/`)**
- `blog` app with a `Post` model, list/detail pages and a home page
- Template inheritance (`base.html`), reusable includes, static CSS
- Feedback form (`/blog/feedback/`) with validation, and a JSON API (`/blog/api/feedback/`) used by the Vlab
- Customised admin: blue/orange theme (light and dark), feedback list with filters and search
- The Vlab is also served by Django at `/vlab/`
- Post API: `GET /blog/api/posts/` and `/blog/api/posts/<id>/` (Django REST Framework)
- 18 automated tests
- Production-ready settings (`DEBUG` / `SECRET_KEY` from environment variables) for PythonAnywhere

---

## Repository layout

```
FSDL-LAB-CA/
├── index.html                    ← the Virtual Lab (GitHub Pages)
├── README.md
├── WORKFLOW.md                   ← team roles, tasks, status
├── .nojekyll                     ← serve files as-is on GitHub Pages
├── docs/
│   ├── project-structure.md      ← every Django file explained
│   └── deploy-pythonanywhere.md  ← host Django + admin online
└── mysite/                       ← Django project (see below)
```

## Django project structure

A Django site = one **project** (configuration) + one or more **apps** (features).

```
mysite/                      ← outer folder (container)
├── manage.py                ← command-line tool: runserver, migrate, startapp…
├── requirements.txt         ← Python dependencies
│
├── mysite/                  ← PROJECT package (site-wide configuration)
│   ├── __init__.py          ← marks folder as a Python package
│   ├── settings.py          ← INSTALLED_APPS, database, templates, CORS…
│   ├── urls.py              ← root URL map: every request starts here
│   ├── wsgi.py              ← entry point for WSGI servers (Gunicorn)
│   └── asgi.py              ← entry point for ASGI servers (Uvicorn)
│
├── templates/admin/
│   └── base_site.html       ← custom admin colour theme
│
└── blog/                    ← APP package (one feature)
    ├── __init__.py
    ├── apps.py              ← app configuration (BlogConfig)
    ├── models.py            ← M: database tables (Post, Feedback)
    ├── views.py             ← V: request → response logic (+ JSON API)
    ├── forms.py             ← FeedbackForm with validation
    ├── urls.py              ← app URL map (created manually)
    ├── admin.py             ← registers models in /admin/
    ├── tests.py             ← automated tests
    ├── migrations/          ← database schema history
    ├── static/blog/         ← CSS
    └── templates/blog/      ← T: HTML templates
```

**MTV pattern:** Model (`models.py`) ↔ Template (`templates/`) ↔ View (`views.py`), with `urls.py` routing each URL to a view.

**Request flow:**

```
Browser → mysite/urls.py → blog/urls.py → views.py ⇄ models.py ⇄ database
                                              ↓
                                     templates/*.html → HTML response → Browser
```

Full file-by-file explanation: [docs/project-structure.md](docs/project-structure.md)

---

## Run the Django project

```bash
cd mysite
python -m venv venv
venv\Scripts\activate            # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

| Page | URL |
|---|---|
| Home (redirects to the blog) | http://127.0.0.1:8000/ |
| Blog home | http://127.0.0.1:8000/blog/ |
| All posts | http://127.0.0.1:8000/blog/posts/ |
| Feedback form | http://127.0.0.1:8000/blog/feedback/ |
| Virtual Lab (served by Django) | http://127.0.0.1:8000/vlab/ |
| Admin | http://127.0.0.1:8000/admin/ |
| Feedback API (POST JSON) | http://127.0.0.1:8000/blog/api/feedback/ |
| Post API (GET JSON) | http://127.0.0.1:8000/blog/api/posts/ |

Run the tests:

```bash
python manage.py test blog
```

> The "This is a development server" warning from `runserver` is normal. It is for local use only; production uses `wsgi.py` / `asgi.py`.

## Feedback → database

```
Vlab feedback form → POST JSON → /blog/api/feedback/ → FeedbackForm validation
                  → Feedback table (db.sqlite3) → /admin/ → Blog → Feedbacks
```

Responses are saved only while the Django server is reachable: local `runserver` for now, PythonAnywhere once hosted.

## Hosting the admin online

GitHub Pages only serves static files, so the admin and API need a Python host. Follow [docs/deploy-pythonanywhere.md](docs/deploy-pythonanywhere.md) (free plan).

## Admin login

| | |
|---|---|
| Admin URL | http://127.0.0.1:8000/admin/ |
| Username | `dhruvgoenka24` |
| Password | Shared privately with the team (not stored in this public repo) |

This account exists only in the local database on the demo laptop (`db.sqlite3` is not committed). On your own machine, create your own admin with:

```bash
python manage.py createsuperuser
```
