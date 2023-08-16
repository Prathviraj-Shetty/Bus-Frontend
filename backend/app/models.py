from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Operator(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    name=models.CharField(max_length=122)
    address=models.CharField(max_length=122,default="")
    dob=models.DateField()
    phone=models.CharField(max_length=122,default="")
    def __str__(self) :
        return self.name

class Bus(models.Model):
    class TYPE(models.TextChoices):
        SEATER = 'SE'
        SLEEPER = 'SL'
        SEMISLEEPER ='SM',
    operator=models.ForeignKey(Operator,on_delete=models.CASCADE,related_name='bus')
    regno=models.CharField(max_length=122);
    busname=models.CharField(max_length=122,default="");
    seat=models.IntegerField(default=0);
    type=models.CharField(max_length=20,choices=TYPE.choices, default=TYPE.SEATER);
    frontimg=models.ImageField(upload_to="busImages",default="busImages/DeafultImg.png")
    sideimg=models.ImageField(upload_to="busImages",default="")
    interiorimg=models.ImageField(upload_to="busImages",default="")

    def __str__(self) :
        return self.busname

class Owns(models.Model):
    bid=models.ForeignKey(Bus,on_delete=models.CASCADE)
    oid=models.ForeignKey(Operator,on_delete=models.CASCADE)
    def __str__(self) :
        return str(self.bid.id)+"-"+str(self.oid.id)

class Route(models.Model):
    bid=models.ForeignKey(Bus,on_delete=models.CASCADE,related_name='route')
    start=models.CharField(max_length=122,default="")
    dest=models.CharField(max_length=122,default="")
    via=models.CharField(max_length=122,default="")
    starttime=models.DateTimeField(max_length=122,default="")
    reachtime=models.DateTimeField(max_length=122,default="")

    def __str__(self) :
        return self.start+"-"+self.dest

class Driver(models.Model):
    bid=models.ForeignKey(Bus,on_delete=models.CASCADE,related_name='driver')
    name=models.CharField(max_length=122,default="")
    dob=models.DateField()
    address=models.CharField(max_length=122,default="")
    experience=models.CharField(max_length=122,default="")
    phone=models.CharField(max_length=122,default="")
    def __str__(self) :
        return self.name

class Travel(models.Model):
    bid=models.ForeignKey(Bus,on_delete=models.CASCADE)
    rid=models.ForeignKey(Route,on_delete=models.CASCADE)
    def __str__(self) :
        return str(self.id)+"-"+str(self.id)



class Person(models.Model):
    class GENDER(models.TextChoices):
        MALE = 'M'
        FEMALE = 'F'
        OTHER = 'O',
    img=models.ImageField(upload_to="busImages",default="busImages/adminlogo.png")
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    name=models.CharField(max_length=122,default="")
    phone=models.CharField(max_length=122,default="")
    dob=models.DateField()
    gender=models.CharField(max_length=20,choices=GENDER.choices, default=GENDER.MALE);
    def __str__(self) :
        return self.name


class Booking(models.Model):
    ticketno=models.AutoField(primary_key=True,unique=True)
    bus=models.ForeignKey(Bus,on_delete=models.CASCADE,related_name='booking')
    user=models.ForeignKey(Person,on_delete=models.CASCADE,related_name='booking')
    bookingdate=models.DateTimeField(auto_now_add=True)
    seatno=models.IntegerField()
    amt=models.IntegerField()
    def __str__(self) :
        return str(self.ticketno)


class Seat(models.Model):
    class STATUS(models.TextChoices):
        BOOKED= 'B'
        AVAILABE = 'A'
    bus=models.ForeignKey(Bus,on_delete=models.CASCADE,related_name='seats')
    seatno=models.IntegerField(default=0)
    seat=models.CharField(max_length=20,choices=STATUS.choices, default=STATUS.AVAILABE)
    price=models.IntegerField(default=0)
    
    def __str__(self) :
        return str(self.bus)+str(self.seatno)



def upload_path(instance, filname):
    return '/'.join(['covers', str(instance.title), filname])



