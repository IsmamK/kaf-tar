from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'forms', FormViewSet)
router.register(r'form_responses', FormResponseViewSet)

urlpatterns = [
    path('', include(router.urls)),
  path('form-fields/<int:form_id>/', FormFieldListCreateView.as_view(), name='formfield-list-create'),
    path('form-fields/<int:form_id>/<int:pk>/', FormFieldDetailView.as_view(), name='formfield-detail'),

    path('layout/navbar/', NavbarView.as_view(), name='navbar'),
    path('layout/footer/', FooterView.as_view(), name='footer'),


    path('home/carousel/', CarouselView.as_view(), name='carousel'),
    path('home/hero/', HeroView.as_view(), name='hero'),

    path('home/new/', NewView.as_view(), name='new'),


    path('home/cards/', CardsView.as_view(), name='cards'),
    path('home/services/', ServicesView.as_view(), name='services'),
    path('home/statistics/', StatisticsView.as_view(), name='statistics'),
    path('home/timeline/', TimelineView.as_view(), name='timeline'),
    path('home/why-us/', WhyUsView.as_view(), name='why_us'),
    path('home/our-clients/', OurClientsView.as_view(), name='our_clients'),
    path('home/associates/', AssociatesView.as_view(), name='associates'),
    path('home/about-preview/', AboutPreview.as_view(), name='aboutpreview'),
    path('home/testimonials/', Testimonials.as_view(), name='testimonials'),
    path('home/contacts/', Contact.as_view(), name='contact'),
    path('home/client-logos/', ClietLogos.as_view(), name='client_logos'),

    path('home/industries/', IndustriesView.as_view(), name='news'),
    path('home/contact/', ContactView.as_view(), name='contact'),
    path('home/location/', LocationView.as_view(), name='location'),
    path('home/featured-video/', FeaturedVideoView.as_view(), name='featured_video'),

    # About Section
    path('about/about1/', About1View.as_view(), name='about1'),
    path('about/about2/', About2View.as_view(), name='about2'),
    path('about/message/', MessageView.as_view(), name='message'),
    path('about/core-values/', CoreValuesView.as_view(), name='core_values'),
    path('about/team/', TeamView.as_view(), name='team'),

    # Contact Section
    path('contact/contact1/', Contact1View.as_view(), name='contact1'),
    path('contact/contact2/', Contact2View.as_view(), name='contact2'),

    # Projects Section
    path('projects/', ProjectsView.as_view(), name='projects'),

    # Service Section
    path('service/service-list/', ServiceListView.as_view(), name='servicelist'),
    path('service/service-card/', ServiceCardView.as_view(), name='servicecard'),
    path('service-model/', ServicemodelView.as_view(), name='servicemodel'),


      # Projects Section
    path('services/', ServicesPageView.as_view(), name='services-pages'),
    path('project/project-gallery/', ProjectGallery.as_view(), name='project_gallery'),
    path('project/project-card/', ProjectCard.as_view(), name='project_card'),

    # sustainability
    path('sustainability/', Sustainability.as_view(), name='sustainability'),

    # career Info
    path('career/', Career.as_view(), name='career'),
   

   # QuoteForm
   path('quote/', QuoteForm.as_view(), name='quote'),



 # Projects Section
    path('gallery/', GalleryView.as_view(), name='projects'),

    path('get-service-slugs/', get_service_slugs, name='get_service_slugs'),

    path('contact-messages/', ContactMessageListCreate.as_view(), name='contact-message-list-create'),
    path('contact-messages/<int:pk>/', ContactMessageDetail.as_view(), name='contact-message-detail'),

    # MEDICAL REPORTS AND FORMS 

  
    # Medical Reports
path('medical-reports/<str:passport_number>/', MedicalReportDetailAPIView.as_view(), name='medical-report-detail'),
path('medical-reports/', MedicalReportListCreateAPIView.as_view(), name='medical-report-list'),
path('jobs/<int:pk>/', JobDetailAPIView.as_view(), name='job-report-detail'),
path('jobs/', JobListCreateAPIView.as_view(), name='job-report-list'),

  path('images/', UploadedImageViewSet.as_view(), name='image-list-create'),
  path('images/<int:pk>/', RetrieveImage.as_view(), name='image-retrive'),
    
 path('create_payment/', CreatePaymentView.as_view(), name='create_payment'),
    path('execute_payment/', ExecutePaymentView.as_view(), name='execute_payment'),
    path('temp_form_data/', temp_form_data, name='temp_form_data'),
    # path('payment_callback/', PaymentCallbackView.as_view(), name='payment_callback'),
 
    ]

