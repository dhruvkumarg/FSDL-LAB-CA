# Team Workflow — FSDL Lab CA

**Topic:** Understanding Django Project and App Structure (Virtual Lab)
**Live Vlab:** https://dhruvkumarg.github.io/FSDL-LAB-CA/

| Person | Role | Branch | Owns |
|---|---|---|---|
| 1 (Dhruv — @dhruvkumarg) | Django setup & project structure | `p1-django-setup` | `mysite/mysite/`, `mysite/manage.py`, `requirements.txt`, `docs/`, repo admin |
| 2 (Shlok — @Shlok148Dev) | Models, URLs, views & admin | `p2-backend-logic` | `mysite/blog/` (models, views, urls, forms, admin, tests, templates) |
| 3 (Prajeet — @prajeetgodse-stack) | React frontend | `p3-react-frontend` | `frontend/` (new) |
| 4 (Arnav — @Arnav872iron) | Virtual Lab, testing & deployment | `p4-vlab-deploy` | `index.html`, GitHub Pages, final testing |

---

## Status (updated 2026-10-04)

### ✅ Done

| Item | Where |
|---|---|
| Django project `mysite` + `blog` app, `Post` model, migrations | `mysite/` |
| DRF + CORS configured (React dev server and GitHub Pages allowed) | `mysite/mysite/settings.py` |
| Root `/` redirects to `/blog/` | `mysite/mysite/urls.py` |
| Templates: `base.html` layout, home, post list/detail, reusable post card, CSS | `blog/templates/blog/`, `blog/static/blog/` |
| Feedback form in Django with validation, thank-you page | `/blog/feedback/` |
| Feedback JSON API, saves to database | `/blog/api/feedback/` |
| Admin: custom blue/orange theme, feedback list with filters and search | `mysite/templates/admin/`, `blog/admin.py` |
| Vlab served by Django | `/vlab/` |
| 18 automated tests passing | `blog/tests.py` |
| Vlab: theory, quizzes, simulation, feedback form → database, ⚙ Admin button, footer contact details | `index.html` |
| Simulation ends by opening a full DjangoBlog website popup (PR #3) | `index.html` |
| Pretest/Posttest: every question must be answered before submitting | `index.html` |
| Contributors tab: K. J. Somaiya School of Engineering, guide Prof. Ashwini Deshmukh, 4 developers (PR #5) | `index.html` |
| Footer: © 2026 K. J. Somaiya School of Engineering · FSDL Lab CA (license notice removed, PR #6) | `index.html` |
| GitHub Pages deployment (`.nojekyll` so Django template tags don't break the build) | https://dhruvkumarg.github.io/FSDL-LAB-CA/ |
| Docs: file-by-file structure and PythonAnywhere deployment guide | `docs/` |
| Production settings (env-based `DEBUG` / `SECRET_KEY`, HTTPS cookies) | `settings.py` |
| Collaborators: Shlok, Prajeet, Arnav | ✅ all joined with write access |
| **P2 Shlok:** `Post` author + slug (migration `0004`), Post admin, Post API `GET /blog/api/posts/` and `/blog/api/posts/<id>/`, 8 new tests (PR #1, 2026-10-03) | `mysite/blog/` |
| Branch protection on `main` (PR + 1 approval required) | GitHub settings |

### ⏳ Pending

| Item | Owner |
|---|---|
| React frontend | P3 Prajeet (start with mock data) |
| More posttest questions, final testing | P4 Arnav |

---

## 0. One-time setup

**Person 1 (repo owner):**
1. ✅ Collaborators invited and joined (Shlok, Prajeet, Arnav).
2. ✅ Branch protection on `main`: pull request + 1 approval required.

**Persons 2, 3, 4 (Shlok, Prajeet, Arnav):**
1. ✅ All three have accepted the invite.
2. Make sure the email in your git config is added and verified on your GitHub account (**Settings → Emails**), otherwise you will NOT show as a contributor:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your-github-email@example.com"
   git config --global user.email        # check: must match an email under GitHub Settings → Emails
   ```
3. Clone and set up:
   ```bash
   git clone https://github.com/dhruvkumarg/FSDL-LAB-CA.git
   cd FSDL-LAB-CA/mysite
   python -m venv venv
   venv\Scripts\activate          # Windows  (macOS/Linux: source venv/bin/activate)
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```
   Then open http://127.0.0.1:8000/ and run `python manage.py test blog` (18 tests should pass).

---

## 1. Daily git cycle (everyone)

```bash
git checkout main
git pull                                  # get teammates' latest work
git checkout -b <your-branch>             # first time only; later: git checkout <your-branch> && git merge main
# ...make changes...
git add .
git commit -m "p2: add Post list API"     # prefix with your person number
git push -u origin <your-branch>
```
Then on GitHub: **Compare & pull request → base: main** → ask one teammate to review → **Merge**.

> `main` is protected: direct pushes are blocked for collaborators, and every pull request needs **1 approving review** before it can be merged. Reviewers: open the PR → **Files changed** → **Review changes → Approve**.

Rules:
- Always `git pull` before starting — a lot of code was added to `blog/` and `index.html` already.
- Only edit files you own; if you must touch another person's file, tell them first.
- Small commits with clear messages (at least 3–4 commits each looks good in Insights → Contributors).
- After changing a model, run `python manage.py makemigrations` and commit the new migration file.
- Never commit `db.sqlite3`, `venv/`, `staticfiles/`, `node_modules/` (already in `.gitignore`).

---

## 2. Tasks per person

### Person 1 — Django setup & project structure (Dhruv)
- [x] Create project and app, add collaborators.
- [x] `ALLOWED_HOSTS`, `STATIC_ROOT`, DRF + CORS in `settings.py` and `requirements.txt`.
- [x] `docs/project-structure.md` explaining each project file; structure section in README.
- [x] Root redirect `/` → `/blog/`, Vlab served at `/vlab/`.
- [x] Admin colour theme (`mysite/templates/admin/base_site.html`).
- [x] GitHub Pages deployment + `.nojekyll`.
- [x] Production settings + `docs/deploy-pythonanywhere.md`.
- [x] Branch protection on `main`: changes need a pull request with 1 approval; no force-pushes or branch deletion.
- [x] **Presentation prepared** (≈ 3 min) — script below.

#### Person 1 presentation script

| # | Step | Show / run | Say |
|---|---|---|---|
| 1 | Virtual environment | `python -m venv venv` → `venv\Scriptsctivate` | "A venv keeps this project's packages separate from the rest of the computer." |
| 2 | Install | `pip install -r requirements.txt` | "`requirements.txt` lists Django, Django REST Framework and CORS headers, so anyone can install the same versions." |
| 3 | Create project | `django-admin startproject mysite` | "This creates the **project**: the configuration for the whole website." |
| 4 | Create app | `python manage.py startapp blog` | "This creates an **app**: one feature. A project can have many apps." |
| 5 | `manage.py` | Open the file | "Command-line tool for this project: runserver, migrate, startapp, createsuperuser. We never edit it." |
| 6 | `settings.py` | Show `INSTALLED_APPS`, `DATABASES`, `TEMPLATES`, `DEBUG` | "All configuration. An app does nothing until it's added to `INSTALLED_APPS`. `DEBUG` comes from an environment variable so it is off in production." |
| 7 | `urls.py` | Show `include('blog.urls')` and the `/` redirect | "Every request starts here. `include()` hands `/blog/` to the app's own URL file." |
| 8 | `wsgi.py` / `asgi.py` | Open both | "Entry points for production servers: WSGI for Gunicorn, ASGI for async servers like Uvicorn." |
| 9 | `runserver` | `python manage.py runserver` → open http://127.0.0.1:8000/ | Point at the warning: "This is Django's **development server**, for local testing only. In production we'd use `wsgi.py` or `asgi.py` behind a real server." |
| 10 | Admin theme | Open http://127.0.0.1:8000/admin/, toggle light/dark | "We overrode `admin/base_site.html` in a project-level `templates/` folder and changed the admin's CSS variables to match our Vlab colours." |

**Hand-off line:** "That's the structure and setup. Shlok will now show how the app's models, views and URLs work."

**Likely questions:**
- *Project vs app?* Project = whole site's configuration; app = reusable feature module.
- *Why two folders named `mysite`?* Outer = container (can be renamed); inner = the Python package used in imports like `mysite.settings`.
- *What if you forget `INSTALLED_APPS`?* The app's models, migrations, admin and templates are ignored.
- *Why `startapp` doesn't create `urls.py`?* Not every app needs URLs, so you add it yourself.

### Person 2 — Models, URLs, views & admin (Shlok) ✅ Complete
Merged in PR #1 (`backend-logic`, 5 commits).
- [x] Add `author` and `slug` fields to `Post`, run `makemigrations`, commit the migration (`0004_post_author_slug.py`).
- [x] Customise the `Post` admin (`list_display`, `search_fields`, `prepopulated_fields` for slug).
- [x] Create `blog/serializers.py` + API views: `GET /blog/api/posts/` and `GET /blog/api/posts/<id>/`.
- [x] Add tests for the Post slug and Post API in `tests.py` (18 tests passing in total).
- **Present:** MTV pattern, model → migration → admin, request flow `mysite/urls.py → blog/urls.py → views.py`, the Post API (open http://127.0.0.1:8000/blog/api/posts/ in the browser), the feedback form/API, run `python manage.py test blog`.

### Person 3 — React frontend (Prajeet)
- [ ] `npm create vite@latest frontend -- --template react` (in repo root).
- [ ] `PostList` and `PostDetail` components fetching `http://127.0.0.1:8000/blog/api/posts/` (Shlok's API is merged and ready ✅).
- [ ] *(Optional)* React feedback form posting to `/blog/api/feedback/` (already working, CORS allows `http://localhost:5173`).
- [ ] Basic styling + loading/error states.
- [ ] Add "Run frontend" steps to README (`cd frontend && npm install && npm run dev`).
- **Present:** React components, `useEffect`/`fetch`, how the frontend talks to the Django API, CORS, live demo (add a post in admin → appears in React).

### Person 4 — Virtual Lab, testing & deployment (Arnav)
- [x] Accept the repo invite (joined 2026-10-04).
- [x] Fill the Contributors tab in `index.html` with all 4 names and roles (done by P1, PR #5).
- [ ] Add 2–3 more posttest questions, including one about React ↔ Django.
- [x] GitHub Pages enabled (auto-redeploys on every push to `main`; check the Actions tab after merging).
- [x] Feedback tab form saving to the database (done by P1).
- [ ] Final end-to-end test of every README step on a fresh clone; open issues for bugs found.
- **Present:** Vlab walk-through + live simulation, feedback → admin demo, Git/GitHub workflow, architecture diagram, conclusion.

---

## 3. Timeline

| Day | Work |
|---|---|
| 1 | ✅ P1 setup, collaborators, CORS/DRF config, templates, feedback, admin theme, Pages |
| 2–3 | ✅ P2 Post API & model fields (merged 2026-10-03); P3 React UI on the live API; P4 Vlab edits; P1 reviews PRs |
| 4 | Merge all PRs, P4 runs a full test on a fresh clone, fix bugs |
| 5 | Rehearse presentation: P4 intro → P1 → P2 → P3 → P4 demo & conclusion |

## 4. Presentation (≈ 15 min)
1. **P4 Arnav** — Intro & architecture (1 min)
2. **P1 Dhruv** — Django setup, structure, admin (3 min)
3. **P2 Shlok** — Models, URLs, views, forms, API (3–4 min)
4. **P3 Prajeet** — React frontend demo (3–4 min)
5. **P4 Arnav** — Vlab demo, feedback → admin, GitHub workflow, conclusion (3 min) → Q&A

## 5. Demo checklist
- [ ] `runserver` running on the demo laptop
- [ ] Admin login works; a few posts added
- [ ] Vlab open at http://127.0.0.1:8000/vlab/ (or the GitHub Pages link)
- [ ] Submit one feedback → show it in **Admin → Blog → Feedbacks**
- [ ] React dev server running (`npm run dev`)
