import os
import json
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.utils.decorators import method_decorator
from .models import *
# Utility functions

from .models import ComponentData

from rest_framework import generics
from .models import FormField, Form
from .serializers import FormFieldSerializer

class FormFieldListCreateView(generics.ListCreateAPIView):
    serializer_class = FormFieldSerializer

    def get_queryset(self):
        form_id = self.kwargs.get('form_id')
        return FormField.objects.filter(form_id=form_id)

    def perform_create(self, serializer):
        form_id = self.kwargs.get('form_id')
        form = Form.objects.get(id=form_id)
        serializer.save(form=form)

        from rest_framework import generics
from .models import FormField
from .serializers import FormFieldSerializer

class FormFieldDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FormFieldSerializer

    def get_queryset(self):
        form_id = self.kwargs.get('form_id')
        return FormField.objects.filter(form_id=form_id)



def write_to_db(model_name, data):
    """
    Write JSON data to the database.
    """
    component, created = ComponentData.objects.get_or_create(name=model_name)
    component.data = data
    component.save()

@method_decorator(csrf_exempt, name='dispatch')
class JsonDBView(View):
    model_name = None  # Override this in subclasses

    def get(self, request):
        try:
            component = ComponentData.objects.get(name=self.model_name)
            data = component.data
            return JsonResponse(data, safe=False)
        except ComponentData.DoesNotExist:
            return JsonResponse({"error": f"{self.model_name} does not exist in the database"}, status=404)

    def patch(self, request):
        updated_data = json.loads(request.body)
        try:
            component = ComponentData.objects.get(name=self.model_name)
            existing_data = component.data

            if isinstance(existing_data, list) and isinstance(updated_data, list):
                existing_data = updated_data
            elif isinstance(existing_data, dict) and isinstance(updated_data, dict):
                existing_data.update(updated_data)
            else:
                return JsonResponse({"error": "Invalid data format"}, status=400)

            write_to_db(self.model_name, existing_data)
            return JsonResponse(existing_data, safe=False)
        except ComponentData.DoesNotExist:
            return JsonResponse({"error": f"{self.model_name} does not exist in the database"}, status=404)

    def put(self, request):
        new_data = json.loads(request.body)
        write_to_db(self.model_name, new_data)
        return JsonResponse(new_data, safe=False)



## Specific Views for Each Component Using the Database
class CarouselView(JsonDBView):
    model_name = 'carousel_data'

class NavbarView(JsonDBView):
    model_name = 'navbar_data'

class FooterView(JsonDBView):
    model_name = 'footer_data'

class HeroView(JsonDBView):
    model_name = 'hero_data'

class NewView(JsonDBView):
    model_name = 'new_component'

class CardsView(JsonDBView):
    model_name = 'cards_data'

class ServicesView(JsonDBView):
    model_name = 'services_data'

class ClietLogos(JsonDBView):
    model_name = 'client-logos'

class StatisticsView(JsonDBView):
    model_name = 'statistics_data'

class TimelineView(JsonDBView):
    model_name = 'timeline_data'

class WhyUsView(JsonDBView):
    model_name = 'why_us_data'

class OurClientsView(JsonDBView):
    model_name = 'our_clients_data'

class AssociatesView(JsonDBView):
    model_name = 'associates_data'

class AboutPreview(JsonDBView):
    model_name = 'about_preview'

class Testimonials(JsonDBView):
    model_name = 'testimonials'
class Contact(JsonDBView):
    model_name = 'contact'


class IndustriesView(JsonDBView):
    model_name = 'industries_data'

class ContactView(JsonDBView):
    model_name = 'contact_data'

class LocationView(JsonDBView):
    model_name = 'location_data'

class FeaturedVideoView(JsonDBView):
    model_name = 'featured_video_data'

# About Component Views
class About1View(JsonDBView):
    model_name = 'about1_data'

class About2View(JsonDBView):
    model_name = 'about2_data'

class CoreValuesView(JsonDBView):
    model_name = 'core_values_data'

class MessageView(JsonDBView):
    model_name = 'message_data'
    

class TeamView(JsonDBView):
    model_name = 'team_data'
   

# Contact Component Views
class Contact1View(JsonDBView):
    model_name = 'contact1_data'
    

class Contact2View(JsonDBView):
    model_name = 'contact2_data'


# Services Page View
class ServicesPageView(JsonDBView):
    model_name = 'services_page_data'

class ServiceListView(JsonDBView):
    model_name = 'serviceList'

class ServiceCardView(JsonDBView):
    model_name = 'servicecard'

class Sustainability(JsonDBView):
    model_name = 'sustainability'

class Career(JsonDBView):
    model_name = 'career'

class ServicemodelView(JsonDBView):
    model_name = 'service-model'


# Projects View
class ProjectsView(JsonDBView):
    model_name = 'projects_data'

class ProjectGallery(JsonDBView):
    model_name = 'projectGallery'

class ProjectCard(JsonDBView):
    model_name = 'projectCard'

# Quote Form
class QuoteForm(JsonDBView):
    model_name = 'quoteForm'

# Gallery View
class GalleryView(JsonDBView):
    model_name = 'gallery_data'

def get_service_slugs(request):
    data = ComponentData.objects.get(name="services_page_data").data

    result = [{'slug': data['slug'], 'title': data['title']} for data in data]
    return JsonResponse(result,safe=False)

from rest_framework import generics
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageListCreate(generics.ListCreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class ContactMessageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer


#  ------------------------ FORMS AND REPORTS  ------------------

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import MedicalReport
from .serializers import MedicalReportSerializer

from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .models import MedicalReport
from .serializers import *

class MedicalReportListCreateAPIView(generics.ListCreateAPIView):
    queryset = MedicalReport.objects.all()
    serializer_class = MedicalReportSerializer
    parser_classes = [MultiPartParser, FormParser]

class MedicalReportDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MedicalReport.objects.all()
    serializer_class = MedicalReportSerializer
    lookup_field = 'passport_number'

    

class JobListCreateAPIView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class JobDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Form, FormResponse, FieldResponse
from .serializers import FormSerializer, FormResponseSerializer, FieldResponseSerializer
from django.core.files.storage import default_storage
from rest_framework.parsers import MultiPartParser, FormParser

class FormViewSet(viewsets.ModelViewSet):
    queryset = Form.objects.all()
    serializer_class = FormSerializer

    @action(detail=True, methods=['get'])
    def fields(self, request, pk=None):
        form = self.get_object()
        fields = form.fields.all()
        return Response(FormFieldSerializer(fields, many=True).data)


from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from .models import FormResponse
from .serializers import FormResponseSerializer
from django_filters.rest_framework import DjangoFilterBackend


from smtplib import SMTPException
from django.core.mail import send_mail, BadHeaderError
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status

class FormResponseViewSet(viewsets.ModelViewSet):
    queryset = FormResponse.objects.all()
    serializer_class = FormResponseSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['form']
    parser_classes = (MultiPartParser, FormParser)  # Add parser classes to handle multipart data

    def get_queryset(self):
        form_id = self.request.query_params.get('form_id', None)
        if form_id:
            return FormResponse.objects.filter(form_id=form_id)
        return FormResponse.objects.all()

    @action(detail=False, methods=['post'])
    def submit(self, request):
        form_id = request.data.get('form_id')

        if not form_id:
            raise ValidationError({"form_id": "Form ID is required."})
        
        form = Form.objects.get(id=form_id)
        form_response = FormResponse.objects.create(form=form)

        responses = []
        for key, value in request.data.items():
            if key.startswith("field_"):
                field_id = key.split("_")[1]  
                file_field = request.FILES.get(f"file_{field_id}")  

                file_instance = None
                if file_field:
                    file_instance = handle_file_upload(file_field)

                field_response = FieldResponse.objects.create(
                    form_response=form_response,
                    form_field_id=field_id,
                    value=value,
                    file=file_instance
                )
                if file_instance:
                    responses.append(f"{field_response.form_field.name}: {request.build_absolute_uri(settings.MEDIA_URL + file_instance)}")
                else:
                    responses.append(f"{field_response.form_field.name}: {value}")

        email_subject = f"New Form Submission - {form.name}"
        email_body = f"Form Type: {form.get_form_type_display()}\n\n" + "\n".join(responses)

        if form_id == '3':
            recipient_list = ['ceo@stechgroupbd.com', 'ismam.khan@g.bracu.ac.bd']
        else:
            recipient_list = ['hr@stechgroupbd.com', 'ismam.oisbd@gmail.com']

        print(f"Preparing to send email to: {recipient_list}")
        print(f"Subject: {email_subject}")
        print(f"Body: {email_body[:100]}...")  # Print first 100 characters of body for debugging

        email_sent = 0
        successfully_sent_to = []  # Track the recipients of successful emails

        for recipient in recipient_list:
            try:
                print(f"Sending email to {recipient}")
                send_mail(
                    subject=email_subject,
                    message=email_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[recipient],  # Send to one recipient at a time
                    fail_silently=False,
                )
                print(f"Email successfully sent to {recipient}")
                successfully_sent_to.append(recipient)  # Add to the success list
                email_sent += 1
            except (BadHeaderError, SMTPException) as e:
                print(f"Error sending email to {recipient}: {str(e)}")
            except Exception as e:
                print(f"Unexpected error sending email to {recipient}: {str(e)}")

        print(f"Total number of emails sent: {email_sent}")
        if email_sent == 0:
            print("No emails were sent.")
        else:
            print(f"Emails successfully sent to {email_sent} recipient(s): {', '.join(successfully_sent_to)}")

        return Response({'status': 'success', 'id': form_response.id}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def fetch_jobs(self, request):
        jobs = Job.objects.all().values('id', 'title', 'city', 'country', 'poster')
        return Response(jobs)

from django.conf import settings
from django.core.files.storage import default_storage
import os

def handle_file_upload(file):
    # Directory within the media root to store form responses
    directory = 'form_responses'

    # Get the path using Django's MEDIA_ROOT
    media_root = settings.MEDIA_ROOT  # This should be configured in settings.py

    # Ensure the directory exists
    path = os.path.join(media_root, directory)
    if not os.path.exists(path):
        os.makedirs(path)

    # Create a unique filename or use the original name
    filename = file.name
    file_path = os.path.join(directory, filename)

    # Save the file using Django's default storage
    with default_storage.open(file_path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

    # Return the file path relative to MEDIA_URL for storage in the database
    return file_path



from rest_framework.generics import ListCreateAPIView
from .models import UploadedImage
from .serializers import UploadedImageSerializer

class UploadedImageViewSet(ListCreateAPIView):
    queryset = UploadedImage.objects.all()
    serializer_class = UploadedImageSerializer

class RetrieveImage(generics.RetrieveUpdateDestroyAPIView):
    queryset = UploadedImage.objects.all()
    serializer_class = UploadedImageSerializer


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from .models import Payment, FormResponse
from .utils import create_payment, execute_payment
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FormResponse, Payment
from .utils import create_payment, execute_payment
import time

@method_decorator(csrf_exempt, name='dispatch')
class CreatePaymentView(APIView):
    def post(self, request):
        amount = request.data.get('amount')
        callback_url = request.data.get('callback_url')

        try:
            # Step 1: Create bKash payment request
            payment_response = create_payment(
                amount=amount,
                invoice_number=f"INV{int(time.time())}",
                callback_url=callback_url
            )

            if payment_response.get('statusCode') == '0000':
                # Step 2: Create a payment record
                payment = Payment.objects.create(
                    payment_id=payment_response['paymentID'],
                    amount=amount,
                    status='Pending'  # Payment is pending until execution
                )
                return Response({
                    'status': 'success',
                    'bkash_url': payment_response['bkashURL'],
                    'payment_id': payment_response['paymentID']  # Return payment_id from create_payment
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'status': 'error',
                    'message': payment_response.get('statusMessage', 'Payment creation failed')
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@method_decorator(csrf_exempt, name='dispatch')
class ExecutePaymentView(APIView):
    def post(self, request):
        payment_id = request.data.get("payment_id")
        print(f"Inside Execute {payment_id}")

        try:
            # Step 1: Retrieve form data from temporary storage
            cache_key = f"form_data_{payment_id}"
            form_data = cache.get(cache_key)

            # Debug: Print cache key and form data
            print(f"Retrieving form data for payment_id: {payment_id}")
            print(f"Cache Key: {cache_key}")
            print(f"Form Data: {form_data}")

            if not form_data:
                return Response({
                    "status": "error",
                    "message": "Form data not found"
                }, status=status.HTTP_404_NOT_FOUND)

            # Step 2: Execute the payment
            execute_response = execute_payment(payment_id)

            if execute_response.get("statusCode") == "0000":
                # Step 3: Create form response after successful payment
                form_response = FormResponse.objects.create(
                    form_id=2  # Assuming form_id is 2
                )

                # Step 4: Save form data using FieldResponse
                for field_name, field_value in form_data.items():
                    # Find the corresponding FormField
                    form_field = FormField.objects.filter(name=field_name).first()
                    if form_field:
                        # Create a FieldResponse for each field
                        FieldResponse.objects.create(
                            form_response=form_response,
                            form_field=form_field,
                            value=field_value
                        )

                # Step 5: Link payment to form response
                payment = Payment.objects.get(payment_id=payment_id)
                payment.form_response = form_response
                payment.status = "Completed"
                payment.save()

                # Step 6: Clear temporary form data
                cache.delete(cache_key)

                return Response({
                    "status": "success",
                    "message": "Payment completed successfully",
                    "form_response_id": form_response.id
                }, status=status.HTTP_200_OK)
            else:
                payment.status = "Failed"
                payment.save()
                return Response({
                    "status": "error",
                    "message": execute_response.get("statusMessage", "Payment execution failed")
                }, status=status.HTTP_400_BAD_REQUEST)
        except Payment.DoesNotExist:
            return Response({
                "status": "error",
                "message": "Payment not found"
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                "status": "error",
                "message": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.cache import cache

@csrf_exempt
def temp_form_data(request):
    if request.method == "POST":
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)
            payment_id = data.get("payment_id")
            print(f"Inside Temp {payment_id}")
            form_data = data.get("form_data")

            if not payment_id or not form_data:
                return JsonResponse({
                    "status": "error",
                    "message": "payment_id and form_data are required"
                }, status=400)

            # Debug: Print payment_id and form_data
            print(f"Storing form data for payment_id: {payment_id}")
            print(f"Form Data: {form_data}")

            # Store form data in cache linked to payment_id
            cache.set(f"form_data_{payment_id}", form_data, timeout=3600)  # Store for 1 hour

            return JsonResponse({"status": "success"})
        except json.JSONDecodeError:
            return JsonResponse({
                "status": "error",
                "message": "Invalid JSON data"
            }, status=400)
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": str(e)
            }, status=500)
    return JsonResponse({
        "status": "error",
        "message": "Invalid request method"
    }, status=400)

# 

from rest_framework.response import Response
from rest_framework import status

from rest_framework import generics
from .models import FormField, Form
from .serializers import FormFieldSerializer
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import FormField, Form
from .serializers import FormFieldSerializer

