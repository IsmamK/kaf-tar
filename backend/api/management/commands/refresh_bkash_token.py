from django.core.management.base import BaseCommand
from myapp.utils import get_bkash_token

class Command(BaseCommand):
    help = "Refresh bKash token"

    def handle(self, *args, **kwargs):
        get_bkash_token()
        self.stdout.write(self.style.SUCCESS("bKash token refreshed successfully"))
