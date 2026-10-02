from django.contrib import admin

from .models import Feedback, Post

admin.site.register(Post)


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'role', 'overall_rating', 'theory_rating',
                    'simulation_rating', 'difficulty', 'would_recommend', 'created_at')
    list_filter = ('role', 'overall_rating', 'difficulty', 'would_recommend', 'created_at')
    search_fields = ('name', 'email', 'institute', 'liked', 'improvements')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
