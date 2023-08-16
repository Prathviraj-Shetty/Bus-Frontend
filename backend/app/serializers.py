from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Bus,Route,Operator,Owns,Travel,Driver,Person,Booking,Seat


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', )


class OperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operator
        fields = '__all__'



class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class OwnsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owns
        fields = '__all__'

class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = '__all__'


class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'


class TravelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Travel
        fields = '__all__'

class BusRouteSerializer(serializers.ModelSerializer):
        route=RouteSerializer(many=True,read_only=True)
        driver=DriverSerializer(many=True,read_only=True)
        class Meta:
            model = Bus
            fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'





