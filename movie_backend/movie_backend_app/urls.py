from .views import *
from django.urls import path

urlpatterns = [
    path("signin/",SignInView.as_view(),name='sign-in'),
    path("signup/",SignUpView.as_view(),name='sigm-up'),
    path("movies/",MovieView.as_view(),name='movie-view'),
    path("theater/",TheaterView.as_view(),name='theater-view'),
    path("seats/",SeatsView.as_view(),name="Seat-view"),
    path("tickets/",TicketView.as_view(),name="tickets-summary"),
    path("userid/",UserIdGet.as_view(),name="userid-get"),
    path("movieticket/",TicketmoviegetView.as_view(),name="userid-get")
]

