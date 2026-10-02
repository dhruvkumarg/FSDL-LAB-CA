# Virtual Lab: Understanding Django Project and App Structure

**🔗 Live Virtual Lab: https://dhruvkumarg.github.io/FSDL-LAB-CA/**

- `index.html` — the Virtual Lab (Aim, Theory, Pretest, Procedure, Simulation, Posttest, References). Open it in a browser.
- `mysite/` — the complete Django project built in the lab (`mysite` project + `blog` app).
- `docs/project-structure.md` — explanation of every file in the project and app.
- `docs/deploy-pythonanywhere.md` — how to host the Django project (admin + feedback API) online.

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
│   ├── urls.py              ← root URL map — every request starts here
│   ├── wsgi.py              ← entry point for WSGI servers (Gunicorn)
│   └── asgi.py              ← entry point for ASGI servers (Uvicorn)
│
└── blog/                    ← APP package (one feature)
    ├── __init__.py
    ├── apps.py              ← app configuration (BlogConfig)
    ├── models.py            ← M — database tables (Post)
    ├── views.py             ← V — request → response logic
    ├── urls.py              ← app URL map (created manually)
    ├── admin.py             ← registers models in /admin/
    ├── tests.py             ← automated tests
    ├── migrations/          ← database schema history
    └── templates/blog/      ← T — HTML templates
```

**MTV pattern:** Model (`models.py`) ↔ Template (`templates/`) ↔ View (`views.py`), with `urls.py` routing each URL to a view.

**Request flow:**

```
Browser → mysite/urls.py → blog/urls.py → views.py ⇄ models.py ⇄ database
                                              ↓
                                     templates/*.html → HTML response → Browser
```

Full file-by-file explanation: [docs/project-structure.md](docs/project-structure.md)

## Run the Django project

```bash
cd mysite
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

- http://127.0.0.1:8000/blog/ — "Hello from the blog app!"
- http://127.0.0.1:8000/blog/posts/ — list of posts
- http://127.0.0.1:8000/admin/ — add posts

Run tests: `python manage.py test blog`
