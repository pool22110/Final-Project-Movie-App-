from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK 
from rest_framework.views import APIView 
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.db.models import Q
from django.core.paginator import Paginator

from .models import *
from .serializers import *


class SignUpView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response(
                {"Access": str(refresh.access_token), "Refresh": str(refresh)},
                status=201,
            )
        return Response(serializer.errors, status=400)


class SignInView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            print(user)
            refresh = RefreshToken.for_user(user)
            return Response(
                {"Access": str(refresh.access_token), "Refresh": str(refresh),"username":str(user)},
                status=201,
            )
        return Response(serializer.errors, status=400)
    
class MovieView(APIView):

    def get(self, request):
        id=request.GET.get("id",None)
        name = request.GET.get("name",None)
        genre = request.GET.get("genre",None)
        altrating=request.GET.get("altrating",None)
        language = request.GET.get("language",None)
        location = request.GET.get("location",None)
        movie_list = Movie.objects.all().order_by("id") 

        if id:
            movie_list=movie_list.filter(id=int(id))
            
        if name:
            movie_list = movie_list.filter(title__icontains=name)

        if genre:
            movie_list = movie_list.filter(genre__icontains=genre)

        if language:
            movie_list = movie_list.filter(language__icontains=language)
        
        if altrating:
            movie_list = movie_list.filter(altrating__iexact=altrating)

        if location:
            movie_list = movie_list.filter(location__icontains=location)

        # if rating:
        #     movie_list = movie_list.filter(
        #         Q(rating__gte=int(rating)) & Q(rating__lte=int(rating))
        #     ).order_by("id")    

        return Response(movie_list.values() , status=200)
    
    def post(self,request):
        serializer = MovieSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Movie added succesfully"} , status=201)
        return Response(serializer.errors , status=400)
    
    def put(self, request): 
        mname = request.data["moviename"]
        moviedetail = Movie.objects.get(title__icontains=mname)
        serializer = MovieSerializer(moviedetail, data= request.data , partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({"Movie updated succesfully" } , status=201) 
        return Response(serializer.errors, status=400)
    
    def delete(self , request): 
        moviedetail = Movie.objects.get(moviename= request.data["moviename"]) 
        moviedetail.delete()
        return Response({"message: movie deleted succesfully"} , status=204)

    

        
class TheaterView(APIView):
    def get(self,request):
        movie_id= request.GET.get("movie_id",None)
        theatername= request.GET.get("theatername",None)
        if(movie_id):
            avaiable_theaters=Theater.objects.filter(movie__id=movie_id).values()
            # serializer=TheaterSerializer(avaiable_theaters,many=True).data
            # return Response(avaiable_theaters,status=200)
        elif(theatername):
            avaiable_theaters=Theater.objects.filter(theater_name=theatername).values()
        else:
            avaiable_theaters=Theater.objects.all().values()
            # return Response(avaiable_theaters,status=200)
        return Response(avaiable_theaters,status=200)

    def post(self, request):
        serializer = TheaterSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Theater added succesfully"} , status=201)
        return Response(serializer.errors , status=400)

class SeatsView(APIView):
    def get(self,request):
        seats = []
        ticket_list=[]
        theatername = request.GET.get("theater",None)
        # movie_time = request.GET.get("movietime",None)
        print(theatername)
        if theatername:
            # query = Q(theater__name=theatername) & Q(theater__movie_timing=movie_time)
            ticket_list = Ticket.objects.filter(theater__name=theatername).values()
        else :
            ticket_list = Ticket.objects.all().values()
        for each in ticket_list:
            string_seats = each["seats"]
            list_seats  = string_seats.split(",")
            seats.extend(list_seats)
        return Response(seats,status=200)   

class TicketView(APIView):
    def get(self,request):
        username= request.GET.get("username",None)
        theaterid=request.GET.get("theaterid",None)
        theater_list=[]
        theater_details=[]
        if (username):
            theater_list=Ticket.objects.filter(user__username=username)
        if(theaterid):
            theater_details=Ticket.objects.filter(theater__id=theaterid).values()
            theater=theater_details[0]["theater_id"]
            theater_details=Ticket.objects.filter(theater__id=theaterid).values()
            # movie=theater["movie__title"]    
            return Response(theater,status=200)
        return Response(theater_list.values(),status=200)
    
    def post(self,request):
        print(request.data)
        # print(request.data["user"])
        # id = User.objects.filter(username=request.data["user"])
        # print(id["id"])
        serializer = TicketSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Ticket Booked succesfully"} , status=201)
        print(serializer.errors)
        return Response(serializer.errors , status=400)
        

class UserIdGet(APIView):
    def get(self,request):
        username= request.GET.get("username",None)
        if (username):
            userdetail=User.objects.filter(username=username)
        return Response(userdetail.values(),status=200)
    

class TicketmoviegetView(APIView):
    def get(self,request):
        #we will expect theater id(i.e query paramater) in get request and will store in theaterid var
        theaterid = request.GET.get('theaterid', None)
        theater=[]
        if (theaterid):
            theater_list = Theater.objects.filter(id=theaterid).values()
            theater = theater_list[0]
            movie_id = theater["movie_id"]
            movie_detail = Movie.objects.filter(id=movie_id).values()
            moviename = movie_detail[0]["title"]
            theater["moviename"] = moviename
       
        return Response(theater,200)

# class TicketView(APIView):
#     def get(self, request):
#         tickets = Ticket.objects.filter(user=request.user.id)
#         serializer = TicketSerializer(tickets, many=True).data
#         return Response(serializer,status=200)
    





            

