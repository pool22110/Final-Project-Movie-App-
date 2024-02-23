from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Movie)
admin.site.register(Theater)
admin.site.register(Seat)
admin.site.register(Ticket)

# Register your models here.
