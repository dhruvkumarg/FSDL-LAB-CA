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
