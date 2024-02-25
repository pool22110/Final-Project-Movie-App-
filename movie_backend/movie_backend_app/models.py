
from django.db import models

from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("Username cant't be empty")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, password, extra_fields)


class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=70)
    password = models.CharField(max_length=16)
    mobile = models.IntegerField()
    username = models.CharField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "username"

    objects = UserManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    director = models.CharField(max_length=200)
    genre = models.CharField(max_length=200)
    language = models.CharField(max_length=200)
    description = models.TextField()
    image=models.URLField()                  
    rating = models.FloatField(default=0)
    altrating = models.CharField(max_length=10,default="U")
    movie_length = models.IntegerField()
    location = models.CharField(max_length=50,default="india")
    release_date = models.DateTimeField(default=None, null=True)

    def __str__(self):
        return self.title
    
class Theater(models.Model):
    movie=models.ForeignKey(Movie,on_delete=models.CASCADE,related_name="theater_movies")
    name= models.CharField(max_length=200)
    # address=models.TextField()
    city=models.CharField(max_length=100)
    pincode=models.CharField(max_length=10)
    movie_timing=models.DateTimeField(default=None,null=True)
    available_seats=models.IntegerField(default=45)

    def __str__(self) -> str:
        return self.name
    
class Seat(models.Model):
    theater= models.ForeignKey(Theater, on_delete=models.CASCADE)
    movie=models.ForeignKey(Movie,on_delete=models.CASCADE)
    seat_number=models.CharField(max_length=6)
    is_reserved=models.BooleanField(default=False)
    row = models.CharField(max_length=10,default=None)
    # seat_type=models.CharField(max_length=50)
    # category=models.CharField(max_length=200)
    price=models.FloatField(default=0.00)
    available_seats_flag = models.BooleanField(default=True)


    def __str__(self):
        return f"{self.theater.name} - {self.movie.title} - Seat {self.seat_number}"

class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE)
    total_price = models.FloatField(default=0)
    seats = models.TextField(max_length=100)

    def __str__(self) -> str:
        return f"{self.theater}-{self.seats}"

# class Booking(models.Model):
#     user=models.ForeignKey(User,on_delete=models.CASCADE)
#     theater = models.ForeignKey(Theater, on_delete=models.CASCADE)
#     movie=models.ForeignKey(Movie,on_delete=models.CASCADE)
#     seats =models.ManyToManyField(Seat)
#     total_cost=models.FloatField(default=0.00)
#     booking_time=models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.user.username} - {self.movie.title}"

