# Virtual Lab: Understanding Django Project and App Structure

- `index.html` — the Virtual Lab (Aim, Theory, Pretest, Procedure, Simulation, Posttest, References). Open it in a browser.
- `mysite/` — the complete Django project built in the lab (`mysite` project + `blog` app).

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
