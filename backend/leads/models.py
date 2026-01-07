from django.db import models

# Create your models here.
class Lead(models.Model):
    SERVICE_CHOICES = [
        ('SAP', 'SAP Implementation & Support'),
        ('STAFF', 'Staffing Solutions'),
        ('ERP', 'ERPNext Implementation'),
        ('ACCESS', 'AccessIntel'),
        ('AUDIT', 'Audit & Advisory'),
    ]
    name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=15)
    company = models.CharField(max_length=150)
    service = models.CharField(max_length=20, choices=SERVICE_CHOICES)
    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name