from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from app.models import Bus,Route,Operator,Owns,Travel,Driver,Person,Booking,Seat
from django.contrib.auth.models import User
import datetime
from .serializers import BusSerializer,OperatorSerializer,RouteSerializer,DriverSerializer,OwnsSerializer,TravelSerializer,PersonSerializer,BookingSerializer,SeatSerializer,BusRouteSerializer
from django.db.models import Q
# Create your views here.



#Authentication

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username    #Extract username from user
        # ...

        return token
class MyTokenObtainPairView(TokenObtainPairView):
     serializer_class=MyTokenObtainPairSerializer

@api_view(['GET'])
def isregistered(request,name):
    uid=User.objects.get(username=name).id
    if(len(Person.objects.filter(user=uid))>0):
        return Response({"regstatus":"Yes"})
    return Response({"regstatus":"No"})

@api_view(['GET'])
def isopregistered(request,id):
    if(len(Operator.objects.filter(user=id))>0):
        return Response({"regstatus":"Yes"})
    return Response({"regstatus":"No"})


@api_view(['POST'])
def verifyusername(request):
    data=request.data
    user=len(User.objects.filter(username=data['username']))
    if(user>0):
        return Response({"status":"Yes"})
    return Response({"status":"No"})


@api_view(['GET'])
def usertype(request,uname):
    admin=User.objects.filter(is_superuser=True,username=uname)
    user=User.objects.filter(username=uname)
    if(len(admin)):
        return Response({"type":"Admin"})
    elif(len(user)):
        return Response({"type":"User"})
    return Response({"type":"None"})

@api_view(['POST'])
def register(request):
    data=request.data
    type=data['type']
    username=data['username'];
    email=data['email'];
    password=data['password'];
    if(type=="User"): 
        my_user=User.objects.create_user(username,email,password)
    elif(type=="Admin"):
         my_user=User.objects.create_superuser(username,email,password)
    return Response(data)

@api_view(['GET'])
def getuser(request):
    uid =request.user.id
    q=Person.objects.filter(user=uid)
    print(q)
    serializer=PersonSerializer(q,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def operator(request,str):
        data=request.data
        user=User.objects.filter(id=data["user"])[0]
        if str=="new":
            Operator.objects.create(user=user,name=data['name'],address=data['address'],dob=data['dob'],phone=data['phone'])
        elif str=="update":
            Operator.objects.filter(user=user.id).update(name=data['name'],address=data['address'],dob=data['dob'],phone=data['phone'])
        q=Operator.objects.last()
        serializer=OperatorSerializer(q,many=False)
        return Response(serializer.data)
@api_view(['GET'])
def getoperatorprofile(request,uid):
    op=Operator.objects.filter(user=uid)
    serializer=OperatorSerializer(op,many=True)
    return Response(serializer.data)
 

@api_view(['GET'])
def getownerid(request,id):
    q=Operator.objects.all().filter(id=id)
    if(len(q)==0):
        return Response({"id":"invalid"})
    return Response({"id":id})

@api_view(['GET','POST'])
def bus(request,id):
    if(request.method=='POST'):
        data=request.data
        op=Operator.objects.all().get(user=id)
        q1=Bus.objects.create(operator=op,regno=data['regno'],busname=data['name'],seat=data['seat'],type=data['type'],frontimg=data['fImg'],sideimg=data['sImg'],interiorimg=data['iImg'])
        oid=Operator.objects.all().get(id=op.id);
        Owns.objects.create(bid=q1,oid=oid)
        q=Bus.objects.last()
        len=q.seat
        for i in range(1,len+1):
            Seat.objects.create(bus=q,seatno=i)
        serializer=BusSerializer(q,many=False)
        return Response(serializer.data)
        # return Response({"hw":"ded"})
    else:
        q=Bus.objects.last()
       
        serializer=BusSerializer(q,many=False)
        return Response(serializer.data)


@api_view(['GET','POST'])
def getimages(request,id):
    q=Bus.objects.all().filter(id=id)
    serializer=BusSerializer(q,many=True)
    return Response(serializer.data)   

@api_view(['GET','POST'])
def driver(request,str,id):
    if(request.method=='POST'):
        data=request.data
        bus=Bus.objects.all().last()
        if(str=="update"):
            q=Driver.objects.filter(bid=bus).update(name=data['name'],dob=data['dob'],address=data['address'],experience=data['experience'],phone=data['phone'])
        else:
            q=Driver.objects.create(bid=bus,name=data['name'],dob=data['dob'],address=data['address'],experience=data['experience'],phone=data['phone'])
        q1=Driver.objects.last()
        serializer=DriverSerializer(q1,many=False)
        return Response(serializer.data)    

@api_view(['GET'])
def getdriver(request,id):    
    q1=Driver.objects.filter(bid=id)
    print(q1)
    serializer=DriverSerializer(q1,many=True)
    return Response(serializer.data)

@api_view(['GET','POST'])
def route(request,str,id):
    if(request.method=='POST'):
        data=request.data
        bus=Bus.objects.filter(id=id)[0]
        if(str=="update"):
             q1=Route.objects.filter(bid=bus.id).update(start=data['start'],dest=data['dest'],via=data['via'],starttime=data['stime'],reachtime=data['rtime'])
        elif(str=="change"):
             q1=Route.objects.filter(bid=bus.id).update(start=data['start'],dest=data['dest'],via=data['via'],starttime=data['stime'],reachtime=data['rtime'])
             Booking.objects.filter(bus=bus.id).delete()
             Seat.objects.filter(bus=bus.id).update(seat="A")
        else:
            q1=Route.objects.create(bid=bus,start=data['start'],dest=data['dest'],via=data['via'],starttime=data['stime'],reachtime=data['rtime'])
            Travel.objects.create(bid=bus,rid=q1)
        q=Route.objects.last()
        serializer=BusRouteSerializer(bus,many=False)
        return Response(serializer.data)

@api_view(['GET'])
def getcurroute(request,id):
    q1=Route.objects.filter(bid=id)
    print(q1)
    serializer=RouteSerializer(q1,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getdetails(request,str):
    if(str=='bus'):
        q=Bus.objects.all()
        serializer=BusSerializer(q,many=True)
        return Response(serializer.data)
    if(str=='route'):
        q=Route.objects.all()
        serializer=RouteSerializer(q,many=True)
        return Response(serializer.data)
    if(str=='person'):
        q=Person.objects.all()
        serializer=PersonSerializer(q,many=True)
        return Response(serializer.data)
    if(str=='ticket'):
        q=Booking.objects.all()
        serializer=BookingSerializer(q,many=True)
        return Response(serializer.data)


@api_view(['GET','POST'])
def searchbus(request):
    if(request.method=='GET'):
        q1=Bus.objects.all()
        serializer=BusRouteSerializer(q1,many=True)
        return Response(serializer.data)

@api_view(['GET','POST'])
def searchbusdynamic(request,str):
    if(request.method=='GET'):
        q1=Bus.objects.all().filter(busname__contains=str)
        serializer=BusRouteSerializer(q1,many=True)
        return Response(serializer.data)

@api_view(['GET','POST'])
def searchroute(request):
    if(request.method=='GET'):
        q1=Route.objects.all()
        serializer=RouteSerializer(q1,many=True)
        print(serializer.data)
        return Response(serializer.data)


@api_view(['GET','POST'])
def searchroutedynamic(request,str):
    if(request.method=='GET'):
        q1=Route.objects.all().filter(Q(start__startswith=str)|Q(dest__startswith=str))
        print(q1)
        serializer=RouteSerializer(q1,many=True)
        print(serializer.data)
        return Response(serializer.data)



@api_view(['GET','POST'])
def searchroutebus(request,id):
    if(request.method=='GET'):
        q=Route.objects.all().get(id=id)
        start=q.start
        dest=q.dest
        bid_list=Route.objects.all().filter(start=start,dest=dest).values_list("bid",flat=True)
        q1=Bus.objects.filter(id__in=bid_list)  
        serializer=BusRouteSerializer(q1,many=True)
        print(serializer.data)
        return Response(serializer.data)





@api_view(['GET','POST'])
def getbusdetails(request,id):
        q1=Bus.objects.all().filter(id=id)
        q2=Route.objects.all().get(bid=id)
        opname=Bus.objects.all().get(id=id).operator.name
        curtime=datetime.datetime.now()
        cur=str(curtime)[:16]
        reach=str(q2.reachtime)[:16]
        status=False
        if(cur>reach):
                status=True
        print(opname)
        serializer=BusRouteSerializer(q1,many=True)
        return Response(serializer.data[0]|{"opname":opname,"reached":status})

 
@api_view(['POST'])
def userprofile(request,str):
        data=request.data
        user=User.objects.filter(id=data['user'])[0]
        if str=="new":
            print(data['profileImg'])
            Person.objects.create(user=user,img=data['profileImg'],name=data['name'],dob=data['dob'],phone=data['phone'],gender=data['gender'])
        elif str=="update":
            print(data['profileImg'])
            Person.objects.filter(user=user.id).update(img=data['profileImg'],name=data['name'],dob=data['dob'],phone=data['phone'],gender=data['gender'])
        q=Person.objects.last()
        serializer=PersonSerializer(q,many=False)
        return Response(serializer.data)
@api_view(['GET'])
def getuserprofile(request,uid):
    client=Person.objects.filter(user=uid)
    print(client)
    serializer=PersonSerializer(client,many=True)
    return Response(serializer.data)


@api_view(['GET','POST'])
def seatdetails(request,id):
    if request.method=="GET":
        q=Bus.objects.all().get(id=id)
        q1=Seat.objects.all().filter(bus=q)
        # print(q1)
        serializer=SeatSerializer(q1,many=True)
        return Response(serializer.data)

@api_view(['POST'])
def setSeatPrice(request,id):
   if request.method=="POST":
        data=request.data
        if(data['seatno']=="all"):
            print("ALL",data['price'])
            q=Seat.objects.all().filter(bus=id).update(price=data['price'])
            print("ALL",data['price'])
        else:
            q=Seat.objects.all().filter(bus=id,seatno=data['seatno']).update(price=data['price'])
        serializer=SeatSerializer(q,many=False)
        
        return Response({'msg':"success"})

@api_view(['GET','POST'])
def bookseat(request,id):
    if request.method=="POST":
        data=request.data
        print(data,"hello")
        q1=Person.objects.filter(user=id)[0]
        print(q1)
        q2=Bus.objects.filter(id=data["bid"])[0]
        # q5=Seat.objects.all().get(bus=id,seatno=data['seatno']).price
        q3=Booking.objects.create(bus=q2,user=q1,seatno=data['seatno'],amt=data['price'])
        q4=Seat.objects.all().filter(bus=q2.id,seatno=data['seatno'])
        print(q4)
        q5=q4.update(seat="B")
        q6=Booking.objects.last()
        serializer=BookingSerializer(q6,many=False)
        return Response(serializer.data)

@api_view(['GET'])
def ticket(request):
    q1=Booking.objects.last()
    q2=Booking.objects.filter(ticketno=q1.ticketno)
    bus=q1.bus
    q3=Bus.objects.filter(id=bus.id)
    serializer1=BookingSerializer(q2,many=True)
    serializer2=BusRouteSerializer(q3,many=True)
    # print(serializer2.data)
    return Response(serializer1.data[0]|serializer2.data[0])

@api_view(['GET'])
def bookinghistory(request,id):
    if(id=="null"):
       return Response({'status':'No'})
    pid=Person.objects.get(user=id).id
    q2=Booking.objects.filter(user=pid)
    serializer=BookingSerializer(q2,many=True)
    return Response(serializer.data)
    

@api_view(['GET','POST'])
def getbookingdetails(request,ticket):
    q1=Booking.objects.all().filter(ticketno=ticket)
    q2=Booking.objects.all().get(ticketno=ticket)
    q3=Bus.objects.filter(id=q2.bus.id)
    serializer1=BookingSerializer(q1,many=True)
    serializer2=BusRouteSerializer(q3,many=True)
    return Response(serializer1.data[0]|serializer2.data[0])




@api_view(['GET'])
def busbookinglist(request,id):
   if(id=="null"):
       return Response({'status':'No'})
   pid=Operator.objects.get(user=id).id
   q1=Bus.objects.filter(operator=pid)
   q2=Booking.objects.filter(bus=q1[0].id)
   serializer1=BusRouteSerializer(q1,many=True)
   for i in serializer1.data:
       i["count"]=len(Booking.objects.filter(bus=i["id"]))
   print(serializer1.data)
   return Response(serializer1.data)

@api_view(['GET'])
def busbookingdetails(request,id):
        q1=Seat.objects.filter(bus=id,seat="B")
        serializer=SeatSerializer(q1,many=True)
        for i in serializer.data:
            q=Booking.objects.filter(bus=i["bus"],seatno=i["seatno"])[0]
            s=Person.objects.filter(id=q.user.id)
            per=PersonSerializer(s,many=True)
            i["person"]=per.data[0]
            i["ticketno"]=q.ticketno
        return Response(serializer.data)
 

@api_view(['GET'])
def getbuslist(request,id):
    print("ID=",id)
    if(id=="null"):
       return Response({'status':'No'})
    pid=Operator.objects.get(user=id).id
    q1=Bus.objects.filter(operator=pid)
    serializer=BusRouteSerializer(q1,many=True)
    for i in serializer.data:
        q2=Route.objects.all().get(bid=i["id"])
        curtime=datetime.datetime.now()
        cur=str(curtime)[:16]
        reach=str(q2.reachtime)[:16]
        status=False
        if(cur>reach):
                status=True
        i["reached"]=status
    return Response(serializer.data)
 
@api_view(['GET'])
def deletebus(request,id):   
    Bus.objects.filter(id=id).delete()
    return Response({"status":"success"})


