from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

from .models import Post


def index(request):
    return HttpResponse("Hello from the blog app!")


def post_list(request):
    posts = Post.objects.order_by('-created_at')
    return render(request, 'blog/post_list.html', {'posts': posts})


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/post_detail.html', {'post': post})
