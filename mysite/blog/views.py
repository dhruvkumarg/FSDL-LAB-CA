from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render

from .forms import FeedbackForm
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


def feedback(request):
    if request.method == 'POST':
        form = FeedbackForm(request.POST)
        if form.is_valid():
            entry = form.save()
            messages.success(request, f"Thank you, {entry.name}! Your feedback has been recorded.")
            return redirect('blog:feedback_thanks')
    else:
        form = FeedbackForm()
    return render(request, 'blog/feedback.html', {'form': form})


def feedback_thanks(request):
    return render(request, 'blog/feedback_thanks.html')
