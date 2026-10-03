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


class FeedbackApiTests(TestCase):
    url = '/blog/api/feedback/'
    payload = {
        'name': 'Ravi', 'email': 'ravi@example.com', 'role': 'student', 'institute': 'KJSCE',
        'overall_rating': 4, 'theory_rating': 5, 'simulation_rating': 4, 'quiz_rating': 3,
        'difficulty': 'just_right', 'sections_used': 'Theory, Simulation',
        'liked': 'Simulation', 'improvements': '', 'would_recommend': True,
    }

    def post(self, data):
        import json
        return self.client.post(self.url, json.dumps(data), content_type='application/json')

    def test_valid_json_is_saved(self):
        from .models import Feedback
        response = self.post(self.payload)
        self.assertEqual(response.status_code, 201)
        entry = Feedback.objects.get()
        self.assertEqual(entry.source, 'vlab')
        self.assertEqual(entry.sections_used, 'Theory, Simulation')
        self.assertEqual(response.json()['id'], entry.pk)

    def test_invalid_json_returns_field_errors(self):
        response = self.post(dict(self.payload, email='bad', overall_rating=None))
        self.assertEqual(response.status_code, 400)
        self.assertIn('email', response.json()['errors'])
        self.assertIn('overall_rating', response.json()['errors'])

    def test_get_not_allowed(self):
        self.assertEqual(self.client.get(self.url).status_code, 405)

    def test_vlab_page_served(self):
        response = self.client.get('/vlab/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Understanding Django Project and App Structure', b''.join(response.streaming_content))


class PostModelTests(TestCase):
    def test_slug_is_made_from_title_and_kept_unique(self):
        first = Post.objects.create(title="Hello Django World", body="x")
        second = Post.objects.create(title="Hello Django World", body="y")
        self.assertEqual(first.slug, 'hello-django-world')
        self.assertEqual(second.slug, 'hello-django-world-2')

    def test_custom_slug_is_kept(self):
        post = Post.objects.create(title="Anything", slug="my-slug", body="x")
        self.assertEqual(post.slug, 'my-slug')


class PostApiTests(TestCase):
    def setUp(self):
        from django.contrib.auth.models import User
        self.author = User.objects.create_user('shlok', first_name='Shlok', password='x')
        self.old = Post.objects.create(title="Old post", body="First", author=self.author)
        self.new = Post.objects.create(title="New post", body="Second")
        # set times explicitly: posts created in the same clock tick would have equal created_at
        from datetime import timedelta
        Post.objects.filter(pk=self.old.pk).update(created_at=self.new.created_at - timedelta(hours=1))

    def test_list_returns_all_posts_newest_first(self):
        response = self.client.get(reverse('blog:api_post_list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual([p['title'] for p in response.json()], ["New post", "Old post"])

    def test_detail_returns_one_post(self):
        response = self.client.get(reverse('blog:api_post_detail', args=[self.old.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            'id': self.old.pk, 'title': "Old post", 'slug': 'old-post', 'author': 'Shlok',
            'body': "First", 'created_at': response.json()['created_at'],
        })

    def test_post_without_author_has_null_author(self):
        response = self.client.get(reverse('blog:api_post_detail', args=[self.new.pk]))
        self.assertIsNone(response.json()['author'])

    def test_missing_post_returns_404(self):
        self.assertEqual(self.client.get('/blog/api/posts/9999/').status_code, 404)

    def test_api_is_read_only(self):
        response = self.client.post(reverse('blog:api_post_list'), {'title': 'x', 'body': 'y'})
        self.assertEqual(response.status_code, 405)
        self.assertEqual(Post.objects.count(), 2)

    def test_react_dev_server_allowed_by_cors(self):
        response = self.client.get(reverse('blog:api_post_list'), HTTP_ORIGIN='http://localhost:5173')
        self.assertEqual(response['Access-Control-Allow-Origin'], 'http://localhost:5173')
