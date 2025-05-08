from django.db import models
import os
from django.utils.text import slugify

# Create your models here.

from django.db import models

class ComponentData(models.Model):
    name = models.CharField(max_length=255, unique=True)  # Component identifier
    data = models.JSONField()  # Use the built-in JSONField
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.email}"

from django.db import models
from datetime import datetime
class MedicalReport(models.Model):
    passport_number = models.CharField(max_length=100, unique=True)
    medical_report = models.FileField(upload_to="medical_reports/")
    uploaded_at = models.DateTimeField(auto_now_add=True,null=True,blank=True)

    def __str__(self):
        return f"Report for {self.passport_number}"


# models.py
from django.db import models
from datetime import datetime


# Form Model
class Form(models.Model):
    FORM_TYPES = (
        ('demand_submission', 'Demand Submission'),
        ('agent_registration', 'Agent Registration'),
        ('worker_registration', 'Worker Registration'),
        ('apply_now', 'Apply Now'),

    )
    
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    form_type = models.CharField(choices=FORM_TYPES, max_length=50)
    payment_amount = models.DecimalField(max_digits=10,decimal_places=2,default=0,blank=True)
    def __str__(self):
        return self.name


from django.db import models

class FormField(models.Model):
    FIELD_TYPE_CHOICES = [
        ('text', 'Text'),
        ('email', 'Email'),
        ('phone', 'Phone'),
        ('image', 'Image'),
        ('file', 'File'),
        ('textarea', 'TextArea'),
        ('select', 'Select'),
        ('checkbox', 'Checkbox'),
        ('radio', 'Radio'),
    ]

    is_job_field = models.BooleanField(default=False)  # Mark if this is a job-related select field
    form = models.ForeignKey(Form, related_name='fields', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    field_type = models.CharField(max_length=10, choices=FIELD_TYPE_CHOICES)
    required = models.BooleanField(default=True)
    # JSONField to store options for choice-based fields
    options = models.JSONField(null=True, blank=True, help_text="Options for choice/select fields. Example: [{'value': 'Option 1'}, {'value': 'Option 2'}]")
    priority = models.PositiveIntegerField(default=0, help_text="Priority for ordering the fields.")
    file = models.FileField(upload_to='uploads/%Y/%m/%d/', null=True, blank=True)
    
    class Meta:
        ordering = ['priority'] 

    def __str__(self):
        return self.name


# FormResponse Model
class FormResponse(models.Model):
    submitted_at = models.DateTimeField(auto_now_add=True)
    form = models.ForeignKey(Form, related_name='responses', on_delete=models.CASCADE)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Response for {self.form.name} at {self.submitted_at}"

# FieldResponse Model
class FieldResponse(models.Model):

    form_response = models.ForeignKey(FormResponse, related_name='field_responses', on_delete=models.CASCADE)
    form_field = models.ForeignKey(FormField, related_name='field_responses', on_delete=models.CASCADE)
    value = models.TextField()
    file = models.FileField(upload_to='form_responses/', null=True, blank=True)

    def __str__(self):
        return f"Response for {self.form_field.name}"



from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=255,null=True, blank=True)
    city = models.CharField(max_length=100,null=True, blank=True)
    country = models.CharField(max_length=100,null=True, blank=True)
    industry = models.CharField(max_length=100,null=True, blank=True)
    requirements = models.TextField(null=True, blank=True)
    poster = models.ImageField(upload_to='job_posters/', null=True, blank=True)  # Poster image
    
    def __str__(self):
        return self.title

from django.db import models

class UploadedImage(models.Model):
    category = models.CharField(max_length=255)
    image = models.FileField(upload_to="uploaded_images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.image.name} - {self.category}"
        
    def save(self, *args, **kwargs):
        # Ensure the filename is not too long
        base_filename, ext = os.path.splitext(self.image.name)
        max_filename_length = 100  # Maximum allowed length for filename

        # Truncate filename if it's too long
        if len(base_filename) > max_filename_length:
            base_filename = base_filename[:max_filename_length]

        # Generate a safe filename
        new_filename = f"{slugify(base_filename)}{ext}"

        # Update the image name with the new filename
        self.image.name = f"uploaded_images/{new_filename}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.image.name} - {self.category}"


from django.db import models

from django.db import models
from django.utils.timezone import now, timedelta

class BkashToken(models.Model):
    id_token = models.TextField()
    refresh_token = models.TextField()
    expires_at = models.DateTimeField()

    def is_expired(self):
        return now() >= self.expires_at

from django.db import models

class Payment(models.Model):
    form_response = models.ForeignKey(FormResponse, related_name='payments', on_delete=models.CASCADE,null=True,blank=True)
    payment_id = models.CharField(max_length=255, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Payment {self.payment_id} for {self.form_response}"


class Product:
    def __init__(self, name, price, description):
        self.name = name
        self.price = price
        self.description = description

    def __str__(self):
        return f"{self.name} - {self.price} - {self.description}"
    