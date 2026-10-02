"""Root URL configuration for mysite."""
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(pattern_name='blog:index', permanent=False)),  # / redirects to /blog/
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls')),  # hand /blog/ to the blog app
]
