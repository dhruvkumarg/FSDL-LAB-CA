import json

from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
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


@csrf_exempt  # called by the static Vlab page (no Django CSRF cookie); protected by CORS allow-list
@require_POST
def api_feedback(request):
    """Save feedback sent as JSON from the Vlab page. Returns 201 or 400 with field errors."""
    try:
        data = json.loads(request.body)
    except ValueError:
        return JsonResponse({'ok': False, 'errors': {'__all__': ['Invalid JSON.']}}, status=400)

    form = FeedbackForm(data)
    if not form.is_valid():
        errors = {field: [str(e) for e in errs] for field, errs in form.errors.items()}
        return JsonResponse({'ok': False, 'errors': errors}, status=400)

    entry = form.save(commit=False)
    entry.sections_used = str(data.get('sections_used', ''))[:100]
    entry.source = 'vlab'
    entry.save()
    return JsonResponse({'ok': True, 'id': entry.pk,
                         'message': f'Thank you, {entry.name}! Your feedback was saved.'}, status=201)
