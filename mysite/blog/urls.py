from django.urls import path

from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.index, name='index'),
    path('posts/', views.post_list, name='post_list'),
    path('posts/<int:pk>/', views.post_detail, name='post_detail'),
    path('feedback/', views.feedback, name='feedback'),
    path('feedback/thanks/', views.feedback_thanks, name='feedback_thanks'),
    path('api/feedback/', views.api_feedback, name='api_feedback'),
    path('api/posts/', views.PostListApi.as_view(), name='api_post_list'),
    path('api/posts/<int:pk>/', views.PostDetailApi.as_view(), name='api_post_detail'),
]
