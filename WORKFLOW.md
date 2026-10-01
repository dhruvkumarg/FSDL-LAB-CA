# Team Workflow — FSDL Lab CA

**Topic:** Understanding Django Project and App Structure (Virtual Lab)

| Person | Role | Branch | Owns |
|---|---|---|---|
| 1 (Dhruv) | Django setup & project structure | `p1-django-setup` | `mysite/mysite/`, `mysite/manage.py`, `requirements.txt`, repo admin |
| 2 (Shlok) | Models, URLs, views & admin | `p2-backend-logic` | `mysite/blog/` (models, views, urls, admin, tests) |
| 3 (Prajeet) | React frontend | `p3-react-frontend` | `frontend/` (new) |
| 4 (Arnav) | Virtual Lab, testing & deployment | `p4-vlab-deploy` | `index.html`, `README.md`, GitHub Pages |

---

## 0. One-time setup

**Person 1 (repo owner):**
1. GitHub → repo → **Settings → Collaborators → Add people** → invite Shlok, Prajeet and Arnav by GitHub username.
2. **Settings → Branches → Add rule** for `main`: *Require a pull request before merging* (optional but recommended).

**Persons 2, 3, 4 (Shlok, Prajeet, Arnav):**
1. Accept the invite (email or github.com/notifications).
2. Make sure the email in your git config is added & verified on your GitHub account (**Settings → Emails**), otherwise you will NOT show as a contributor:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your-github-email@example.com"
   ```
3. Clone and set up:
   ```bash
   git clone https://github.com/dhruvkumarg/FSDL-LAB-CA.git
   cd FSDL-LAB-CA/mysite
   python -m venv venv
   venv\Scripts\activate          # Windows  (macOS/Linux: source venv/bin/activate)
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

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
- Only edit files you own; if you must touch another person's file, tell them first.
- Small commits with clear messages (at least 3–4 commits each looks good in the Insights → Contributors graph).
- Never commit `db.sqlite3`, `venv/`, `node_modules/` (already in `.gitignore`).

---

## 2. Tasks per person

### Person 1 — Django setup & project structure (Dhruv)
- [ ] Add collaborators + branch rule (step 0).
- [ ] Add `ALLOWED_HOSTS = ['127.0.0.1', 'localhost']` and a `STATIC_ROOT` to `settings.py`.
- [ ] Add `django-cors-headers` + `djangorestframework` to `requirements.txt` and `INSTALLED_APPS` (needed by Person 2 & 3).
- [ ] Add `CORS_ALLOWED_ORIGINS = ['http://localhost:5173']` + `corsheaders.middleware.CorsMiddleware` at the top of `MIDDLEWARE`.
- [ ] Add `docs/project-structure.md` explaining each project file.
- **Present:** venv → install → `startproject` / `startapp` → tour of `manage.py`, `settings.py`, `urls.py`, `wsgi.py`, `asgi.py` → `runserver`.

### Person 2 — Models, URLs, views & admin (Shlok)
- [ ] Add an `author` and `slug` field to `Post`, run `makemigrations`, commit the migration.
- [ ] Customise `admin.py` (`list_display`, `search_fields`).
- [ ] Create `blog/serializers.py` + API views: `GET /blog/api/posts/` and `GET /blog/api/posts/<id>/`.
- [ ] Add tests for the API in `tests.py`.
- **Present:** MTV pattern, model → migration → admin, request flow `mysite/urls.py → blog/urls.py → views.py`, run tests.

### Person 3 — React frontend (Prajeet)
- [ ] `npm create vite@latest frontend -- --template react` (in repo root).
- [ ] `PostList` and `PostDetail` components fetching `http://127.0.0.1:8000/blog/api/posts/`.
- [ ] Basic styling + loading/error states.
- [ ] Add "Run frontend" steps to README (`cd frontend && npm install && npm run dev`).
- **Present:** React components, `useEffect`/`fetch`, how frontend talks to Django API, CORS, live demo (add post in admin → appears in React).

### Person 4 — Virtual Lab, testing & deployment (Arnav)
- [ ] Fill Contributors tab in `index.html` with all 4 names & roles; add the feedback form link.
- [ ] Add 2–3 more posttest questions and one about React ↔ Django.
- [ ] Enable **Settings → Pages** (branch `main`, folder `/root`) and put the live link in README.
- [ ] Final end-to-end test of every step in README on a fresh clone; open issues for bugs found.
- **Present:** Vlab walk-through + live simulation, Git/GitHub workflow, architecture diagram, conclusion.

---

## 3. Timeline

| Day | Work |
|---|---|
| 1 | P1 setup + collaborators + CORS/DRF config merged first (others depend on it) |
| 2–3 | P2 API & models, P3 React UI (mock data until API merges), P4 Vlab edits |
| 4 (Arnav) | Merge all PRs, P4 runs full test on fresh clone, fix bugs |
| 5 | Rehearse presentation: P4 intro → P1 → P2 → P3 → P4 demo & conclusion |

## 4. Presentation (≈ 15 min)
1. **P4 Arnav** — Intro & architecture (1 min)
2. **P1 Dhruv** — Django setup & structure (3 min)
3. **P2 Shlok** — Models, URLs, views, admin, API (3–4 min)
4. **P3 Prajeet** — React frontend demo (3–4 min)
5. **P4 Arnav** — Vlab demo, GitHub workflow, conclusion (3 min) → Q&A
