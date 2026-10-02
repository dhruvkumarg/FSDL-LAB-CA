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

## Status (updated 2026-10-02)

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
| 10 automated tests passing | `blog/tests.py` |
| Vlab: theory, quizzes, simulation, feedback form → database, ⚙ Admin button, footer contact details | `index.html` |
| GitHub Pages deployment (`.nojekyll` so Django template tags don't break the build) | https://dhruvkumarg.github.io/FSDL-LAB-CA/ |
| Docs: file-by-file structure and PythonAnywhere deployment guide | `docs/` |
| Production settings (env-based `DEBUG` / `SECRET_KEY`, HTTPS cookies) | `settings.py` |
| Collaborators: Shlok, Prajeet | ✅ write access |

### ⏳ Pending

| Item | Owner |
|---|---|
| Accept the repo invite | **Arnav** (invite is pending) |
| Host Django on PythonAnywhere, then point the ⚙ Admin button and feedback API at it | P1 Dhruv |
| Post API (`/blog/api/posts/`) — **needed by Prajeet** | P2 Shlok |
| React frontend | P3 Prajeet (start with mock data) |
| Vlab Contributors tab, more posttest questions, final testing | P4 Arnav |

---

## 0. One-time setup

**Person 1 (repo owner):**
1. ✅ Collaborators invited (Arnav still has to accept).
2. *(Optional)* **Settings → Branches → Add rule** for `main`: *Require a pull request before merging*.

**Persons 2, 3, 4 (Shlok, Prajeet, Arnav):**
1. Accept the invite at https://github.com/dhruvkumarg/FSDL-LAB-CA/invitations if you haven't.
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
   Then open http://127.0.0.1:8000/ and run `python manage.py test blog` (10 tests should pass).

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
- [ ] Create PythonAnywhere account and deploy (follow the guide).
- [ ] Update `ADMIN_URL` and the feedback API URL in `index.html` to the PythonAnywhere address.
- [ ] *(Optional)* Branch protection rule for `main`.
- **Present:** venv → install → `startproject` / `startapp` → tour of `manage.py`, `settings.py`, `urls.py`, `wsgi.py`, `asgi.py` → `runserver` (explain the development-server warning) → admin theme.

### Person 2 — Models, URLs, views & admin (Shlok)
Already in `blog/` (read it before starting): `Post` and `Feedback` models, `FeedbackForm`, views for home/list/detail/feedback, feedback JSON API, templates, admin for `Feedback`, 10 tests.
- [ ] Add `author` and `slug` fields to `Post`, run `makemigrations`, commit the migration.
- [ ] Customise the `Post` admin (`list_display`, `search_fields`, `prepopulated_fields` for slug).
- [ ] Create `blog/serializers.py` + API views: `GET /blog/api/posts/` and `GET /blog/api/posts/<id>/`.
- [ ] Add tests for the Post API in `tests.py`.
- **Present:** MTV pattern, model → migration → admin, request flow `mysite/urls.py → blog/urls.py → views.py`, the feedback form/API, run tests.

### Person 3 — React frontend (Prajeet)
- [ ] `npm create vite@latest frontend -- --template react` (in repo root).
- [ ] `PostList` and `PostDetail` components fetching `http://127.0.0.1:8000/blog/api/posts/` (use mock data until Shlok's API is merged).
- [ ] *(Optional)* React feedback form posting to `/blog/api/feedback/` (already working, CORS allows `http://localhost:5173`).
- [ ] Basic styling + loading/error states.
- [ ] Add "Run frontend" steps to README (`cd frontend && npm install && npm run dev`).
- **Present:** React components, `useEffect`/`fetch`, how the frontend talks to the Django API, CORS, live demo (add a post in admin → appears in React).

### Person 4 — Virtual Lab, testing & deployment (Arnav)
- [ ] Accept the repo invite.
- [ ] Fill the Contributors tab in `index.html` with all 4 names and roles.
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
| 2–3 | P2 Post API & model fields, P3 React UI (mock data until API merges), P4 Vlab edits; P1 PythonAnywhere |
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
