from django.conf import settings
from django.db import models
from django.utils.text import slugify


class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True,
                            help_text='URL-friendly name; filled from the title if left empty.')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
                               null=True, blank=True, related_name='posts')
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug(self.title, Post.objects.exclude(pk=self.pk))
        super().save(*args, **kwargs)


def unique_slug(title, queryset):
    """slugify(title), with -2, -3 ... added if that slug is already taken."""
    base = slugify(title)[:190] or 'post'
    slug, n = base, 2
    while queryset.filter(slug=slug).exists():
        slug, n = f'{base}-{n}', n + 1
    return slug


class Feedback(models.Model):
    RATING_CHOICES = [(i, str(i)) for i in range(1, 6)]
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('teacher', 'Teacher / Faculty'),
        ('developer', 'Developer'),
        ('other', 'Other'),
    ]
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('just_right', 'Just right'),
        ('hard', 'Hard'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    institute = models.CharField(max_length=150, blank=True)

    overall_rating = models.PositiveSmallIntegerField('Overall experience', choices=RATING_CHOICES)
    theory_rating = models.PositiveSmallIntegerField('Theory clarity', choices=RATING_CHOICES)
    simulation_rating = models.PositiveSmallIntegerField('Simulation usefulness', choices=RATING_CHOICES)
    quiz_rating = models.PositiveSmallIntegerField('Pretest/Posttest quality', choices=RATING_CHOICES, null=True, blank=True)
    difficulty = models.CharField('Difficulty level', max_length=20, choices=DIFFICULTY_CHOICES, default='just_right')

    sections_used = models.CharField(max_length=100, blank=True)
    source = models.CharField(max_length=20, default='django')

    liked = models.TextField('What did you like?', blank=True)
    improvements = models.TextField('What should we improve?', blank=True)
    would_recommend = models.BooleanField('I would recommend this lab to others', default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.overall_rating}/5)"
