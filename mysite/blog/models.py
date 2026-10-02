from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


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
    difficulty = models.CharField('Difficulty level', max_length=20, choices=DIFFICULTY_CHOICES, default='just_right')

    liked = models.TextField('What did you like?', blank=True)
    improvements = models.TextField('What should we improve?', blank=True)
    would_recommend = models.BooleanField('I would recommend this lab to others', default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.overall_rating}/5)"
