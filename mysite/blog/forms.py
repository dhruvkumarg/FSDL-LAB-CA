from django import forms

from .models import Feedback


class FeedbackForm(forms.ModelForm):
    class Meta:
        model = Feedback
        fields = [
            'name', 'email', 'role', 'institute',
            'overall_rating', 'theory_rating', 'simulation_rating', 'quiz_rating', 'difficulty',
            'liked', 'improvements', 'would_recommend',
        ]
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Your full name'}),
            'email': forms.EmailInput(attrs={'placeholder': 'you@example.com'}),
            'institute': forms.TextInput(attrs={'placeholder': 'College / organisation (optional)'}),
            'overall_rating': forms.RadioSelect,
            'theory_rating': forms.RadioSelect,
            'simulation_rating': forms.RadioSelect,
            'quiz_rating': forms.RadioSelect,
            'difficulty': forms.RadioSelect,
            'liked': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Which part helped you most?'}),
            'improvements': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Anything confusing, missing or broken?'}),
        }

    def clean_name(self):
        name = self.cleaned_data['name'].strip()
        if len(name) < 2:
            raise forms.ValidationError("Please enter your name.")
        return name

    def clean(self):
        cleaned = super().clean()
        rating = cleaned.get('overall_rating')
        if rating is not None and rating <= 2 and not cleaned.get('improvements', '').strip():
            self.add_error('improvements', "Please tell us what went wrong so we can fix it.")
        return cleaned
