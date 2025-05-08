from django.contrib import admin
from django.apps import apps

app = apps.get_app_config('api')  # Replace 'your_app_name' with your actual app name

for model in app.get_models():
    admin.site.register(model)
