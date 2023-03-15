from main.views import UserRegistration, UserList
from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/user-registration", UserRegistration.as_view()),
    path("api/v1/user-list", UserList.as_view()),
    path("api/v1/auth/", include("djoser.urls")),
    re_path(r"^auth/", include("djoser.urls.authtoken"))
]
