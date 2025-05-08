import os
import json
from django.core.management.base import BaseCommand
from api.models import ComponentData

class Command(BaseCommand):
    help = "Load existing JSON data into the database."

    DATA_MAPPING = {
        "carousel_data": "api/data/home_data/carousel.json",
        "navbar_data": "api/data/layout_data/navbar.json",
        "footer_data": "api/data/layout_data/footer.json",
        "hero_data": "api/data/home_data/hero.json",
        "cards_data": "api/data/home_data/cards.json",
        "services_data": "api/data/home_data/services.json",
        "statistics_data": "api/data/home_data/statistics.json",
        "grid_cards_data": "api/data/home_data/grid_cards.json",
        "why_us_data": "api/data/home_data/why_us.json",
        "our_clients_data": "api/data/home_data/our_clients.json",
        "associates_data": "api/data/home_data/associates.json",
        "news_data": "api/data/home_data/news.json",
        "contact_data": "api/data/home_data/contact.json",
        "location_data": "api/data/home_data/location.json",
        "featured_video_data": "api/data/home_data/featured_video.json",
        "about1_data": "api/data/about_data/about1.json",
        "about2_data": "api/data/about_data/about2.json",
        "faq_data": "api/data/about_data/faq.json",
        "message_data": "api/data/about_data/message.json",
        "team_data": "api/data/about_data/team.json",
        "contact1_data": "api/data/contact_data/contact1.json",
        "contact2_data": "api/data/contact_data/contact2.json",
        "services_page_data": "api/data/services_data/services.json",
        "projects_data": "api/data/project_data/projects.json",
        "gallery_data": "api/data/gallery_data/gallery.json",
    }

    def handle(self, *args, **kwargs):
        for name, file_path in self.DATA_MAPPING.items():
            if not os.path.exists(file_path):
                self.stdout.write(self.style.WARNING(f"File not found: {file_path}"))
                continue

            try:
                with open(file_path, "r") as f:
                    data = json.load(f)
                    ComponentData.objects.update_or_create(
                        name=name,
                        defaults={"data": data},
                    )
                    self.stdout.write(self.style.SUCCESS(f"Loaded data for: {name}"))
            except json.JSONDecodeError as e:
                self.stdout.write(self.style.ERROR(f"Error decoding JSON for {name}: {e}"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error loading {name}: {e}"))
