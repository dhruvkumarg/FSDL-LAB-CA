"""Root URL configuration for mysite."""
from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.http import FileResponse
from django.views.generic import RedirectView
from django.views.static import serve

VLAB_PAGE = settings.BASE_DIR.parent / 'index.html'


def vlab(request):
    """Serve the Virtual Lab page from Django so its feedback form talks to the same server."""
    return FileResponse(open(VLAB_PAGE, 'rb'), content_type='text/html')

urlpatterns = [
    path('', RedirectView.as_view(pattern_name='blog:index', permanent=False)),  # / redirects to /blog/
    path('admin/', admin.site.urls),
    path('vlab/', vlab, name='vlab'),
    # logos and images used by the Vlab page (repo-level assets/ folder)
    path('vlab/assets/<path:path>', serve, {'document_root': settings.BASE_DIR.parent / 'assets'}),
    path('blog/', include('blog.urls')),  # hand /blog/ to the blog app
]
