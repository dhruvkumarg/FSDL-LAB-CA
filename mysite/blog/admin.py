from django.contrib import admin

from .models import Feedback, Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'author', 'created_at')
    list_filter = ('author', 'created_at')
    search_fields = ('title', 'slug', 'body')
    prepopulated_fields = {'slug': ('title',)}  # slug is typed for you as you type the title
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'

    def save_model(self, request, obj, form, change):
        if not change and not obj.author_id:
            obj.author = request.user  # new posts default to the logged-in admin
        super().save_model(request, obj, form, change)


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'role', 'overall_rating', 'theory_rating',
                    'simulation_rating', 'quiz_rating', 'difficulty', 'would_recommend', 'source', 'created_at')
    list_filter = ('source', 'role', 'overall_rating', 'difficulty', 'would_recommend', 'created_at')
    search_fields = ('name', 'email', 'institute', 'liked', 'improvements')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'

# Text shown in the admin header, browser tab and home page
admin.site.site_header = "DjangoLab Admin"
admin.site.site_title = "FSDL Lab Admin"
admin.site.index_title = "Lab administration"
