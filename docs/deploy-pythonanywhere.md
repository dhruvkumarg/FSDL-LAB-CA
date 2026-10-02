# Deploying the Django project on PythonAnywhere (free)

After this, the admin and the feedback API are online for everyone:

- Admin: `https://<username>.pythonanywhere.com/admin/`
- Vlab served by Django: `https://<username>.pythonanywhere.com/vlab/`
- Feedback API used by the GitHub Pages Vlab: `https://<username>.pythonanywhere.com/blog/api/feedback/`

Replace `<username>` everywhere with your PythonAnywhere username.

## 1. Create the account
Sign up at https://www.pythonanywhere.com → **Pricing & signup → Create a Beginner account** (free).

## 2. Get the code (Bash console)
Dashboard → **Consoles → Bash**, then:

```bash
git clone https://github.com/dhruvkumarg/FSDL-LAB-CA.git
cd FSDL-LAB-CA/mysite
mkvirtualenv fsdl --python=python3.11
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

## 3. Create the web app
**Web** tab → **Add a new web app** → Next → **Manual configuration** → **Python 3.11** → Next.

On the Web tab set:

| Setting | Value |
|---|---|
| Source code | `/home/<username>/FSDL-LAB-CA/mysite` |
| Working directory | `/home/<username>/FSDL-LAB-CA/mysite` |
| Virtualenv | `/home/<username>/.virtualenvs/fsdl` |

**Static files** section → add:

| URL | Directory |
|---|---|
| `/static/` | `/home/<username>/FSDL-LAB-CA/mysite/staticfiles` |

## 4. Edit the WSGI file
Click the **WSGI configuration file** link on the Web tab, delete everything, paste:

```python
import os
import sys

path = '/home/<username>/FSDL-LAB-CA/mysite'
if path not in sys.path:
    sys.path.insert(0, path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'mysite.settings'
os.environ['DJANGO_DEBUG'] = 'False'
os.environ['DJANGO_SECRET_KEY'] = 'paste-a-long-random-string-here'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

Generate a secret key in the Bash console with:
```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

## 5. Reload
Web tab → green **Reload** button → open `https://<username>.pythonanywhere.com/admin/`.

## Updating after new commits
```bash
cd ~/FSDL-LAB-CA && git pull
cd mysite && workon fsdl
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
```
Then press **Reload** on the Web tab.

## Notes
- Free accounts must click **"Run until 3 months from today"** on the Web tab every 3 months to keep the site alive.
- The database (`db.sqlite3`) on PythonAnywhere is separate from your laptop's — create the admin user there too.
