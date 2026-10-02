from django.shortcuts import get_object_or_404, render

from .models import Post


def index(request):
    latest_posts = Post.objects.order_by('-created_at')[:3]
    return render(request, 'blog/index.html', {'latest_posts': latest_posts})


def post_list(request):
    posts = Post.objects.order_by('-created_at')
    return render(request, 'blog/post_list.html', {'posts': posts})


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/post_detail.html', {'post': post})
