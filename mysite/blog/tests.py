from django.test import TestCase
from django.urls import reverse

from .models import Post


class BlogTests(TestCase):
    def test_index(self):
        response = self.client.get(reverse('blog:index'))
        self.assertContains(response, "Hello from the blog app!")

    def test_post_list_and_detail(self):
        post = Post.objects.create(title="First post", body="Hi")
        self.assertContains(self.client.get(reverse('blog:post_list')), "First post")
        self.assertContains(self.client.get(reverse('blog:post_detail', args=[post.pk])), "Hi")

    def test_index_lists_latest_posts(self):
        Post.objects.create(title="Card post", body="Shown on home")
        response = self.client.get(reverse('blog:index'))
        self.assertTemplateUsed(response, 'blog/base.html')
        self.assertContains(response, "Card post")


class FeedbackTests(TestCase):
    valid = {
        'name': 'Asha', 'email': 'asha@example.com', 'role': 'student', 'institute': '',
        'overall_rating': 5, 'theory_rating': 4, 'simulation_rating': 5,
        'difficulty': 'just_right', 'liked': 'Simulation', 'improvements': '',
        'would_recommend': 'on',
    }

    def test_form_page_loads(self):
        response = self.client.get(reverse('blog:feedback'))
        self.assertContains(response, 'Submit feedback')

    def test_valid_submission_saves_and_redirects(self):
        from .models import Feedback
        response = self.client.post(reverse('blog:feedback'), self.valid, follow=True)
        self.assertRedirects(response, reverse('blog:feedback_thanks'))
        self.assertEqual(Feedback.objects.count(), 1)
        self.assertContains(response, 'Thank you, Asha!')

    def test_low_rating_requires_improvements(self):
        from .models import Feedback
        response = self.client.post(reverse('blog:feedback'), dict(self.valid, overall_rating=1))
        self.assertContains(response, 'Please tell us what went wrong')
        self.assertEqual(Feedback.objects.count(), 0)
