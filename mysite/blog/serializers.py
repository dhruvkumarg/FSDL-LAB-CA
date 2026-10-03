from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    """Turns a Post into JSON for the React frontend."""
    author = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'body', 'created_at']

    def get_author(self, post):
        if post.author is None:
            return None
        return post.author.get_full_name() or post.author.username
