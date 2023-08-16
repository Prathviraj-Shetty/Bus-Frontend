from django.contrib import admin
from .models import Bus,Route,Operator,Owns,Travel,Driver,Person,Booking,Seat
# Register your models here.

admin.site.register(Operator)
admin.site.register(Bus)
admin.site.register(Owns)
admin.site.register(Route)
admin.site.register(Driver)
admin.site.register(Travel)
admin.site.register(Person)
admin.site.register(Booking)
admin.site.register(Seat)

