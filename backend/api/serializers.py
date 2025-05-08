from rest_framework import serializers
from .models import *

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'submitted_at']


from rest_framework import serializers
from .models import MedicalReport

class MedicalReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalReport
        fields = '__all__'  # You can choose specific fields as needed


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'  # You can choose specific fields as needed

# Serializer for FormField model
# serializers.py
from rest_framework import serializers
from .models import Form, FormField, FormResponse, FieldResponse

class FormFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormField
        fields = '__all__'

class FormSerializer(serializers.ModelSerializer):
    fields = FormFieldSerializer(many=True)

    class Meta:
        model = Form
        fields = "__all__"

    # def update(self, instance, validated_data):
    #     # Extract fields data from validated_data
    #     fields_data = validated_data.pop('fields', [])

    #     # Update the Form instance
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.payment_amount = validated_data.get('payment_amount', instance.payment_amount)
    #     instance.save()

    #     # Update or create FormField instances
    #     for field_data in fields_data:
    #         field_id = field_data.get('id', None)
    #         if field_id:
    #             # Update existing field
    #             field = FormField.objects.get(id=field_id, form=instance)
    #             for key, value in field_data.items():
    #                 setattr(field, key, value)
    #             field.save()
    #         else:
    #             # Create new field
    #             FormField.objects.create(form=instance, **field_data)

    #     # Delete fields that are not in the updated data
    #     existing_field_ids = [field.get('id') for field in fields_data if field.get('id')]
    #     instance.fields.exclude(id__in=existing_field_ids).delete()

    #     return instance


class FieldResponseSerializer(serializers.ModelSerializer):
    form_field = FormFieldSerializer()  # Use the nested serializer for form_field

    class Meta:
        model = FieldResponse
        fields = "__all__"
    

class FormResponseSerializer(serializers.ModelSerializer):
    field_responses = FieldResponseSerializer(many=True)

    class Meta:
        model = FormResponse
        fields = "__all__"

from rest_framework import serializers
from .models import UploadedImage

class UploadedImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = UploadedImage
        fields = '__all__'

