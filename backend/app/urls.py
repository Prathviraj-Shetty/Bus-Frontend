
from django.contrib import admin
from django.urls import path
from app import views 
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
  
    TokenRefreshView,
)


urlpatterns = [
    #Authentication
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/',views.register,name='register'),
    
    path('admin/', admin.site.urls),
    path('bus/<str:id>/', views.bus),
    path('getuser/', views.getuser),
    path('driver/<str:str>/<str:id>/', views.driver),
    path('getdriver/<str:id>/', views.getdriver),
    path('route/<str:str>/<str:id>/', views.route),
    path('getcurroute/<str:id>/', views.getcurroute),
    path('get/<str:str>/', views.getdetails),
    path('getimages/<str:id>/', views.getimages),
    path('getownerid/<str:id>/', views.getownerid),
    path('searchbus/', views.searchbus),
    path('searchbusdynamic/<str:str>/', views.searchbusdynamic),
    path('searchroute/', views.searchroute),
    path('searchroutedynamic/<str:str>/', views.searchroutedynamic),
    path('searchroutebus/<str:id>/', views.searchroutebus),
    path('isregistered/<str:name>/', views.isregistered),
    path('isopregistered/<str:id>/', views.isopregistered),
    path('verifyusername/', views.verifyusername),
    path('usertype/<str:uname>/', views.usertype),
    path('getuserprofile/<str:uid>/', views.getuserprofile),
    path('userprofile/<str:str>/', views.userprofile),
    path('getoperatorprofile/<str:uid>/', views.getoperatorprofile),
    path('operatorprofile/<str:str>/', views.operator),
    path('getbusdetails/<str:id>/', views.getbusdetails),
    path('seatdetails/<str:id>/', views.seatdetails),
    path('setSeatPrice/<str:id>/', views.setSeatPrice),
    path('bookseat/<str:id>/', views.bookseat),
    path('bookinghistory/<str:id>/', views.bookinghistory),
    path('getbookingdetails/<str:ticket>/', views.getbookingdetails),
    path('busbookinglist/<str:id>/', views.busbookinglist),
    path('busbookingdetails/<str:id>/', views.busbookingdetails),
    path('getbuslist/<str:id>/', views.getbuslist),
    path('deletebus/<str:id>/', views.deletebus),
    path('ticket/', views.ticket),
   
]
