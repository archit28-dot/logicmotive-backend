from django.db import models

# Create your models here.
from django.db import models

class JobApplication(models.Model):
    EXPERIENCE_CHOICES = [
        ('FRESHER', 'Fresher'),
        ('EXPERIENCED', 'Experienced'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=15)
    experience = models.CharField(max_length=20, choices=EXPERIENCE_CHOICES)
    resume = models.FileField(upload_to='resumes/')

    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
