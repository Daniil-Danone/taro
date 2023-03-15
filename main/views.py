from rest_framework import (generics, views)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer, CourseSerializer, ThemeSerializer
from .models import User, Course, Theme


class UserRegistration(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserList(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        return Response({
            'users': UserSerializer(User.objects.all(), many=True).data
        })


class CoursesAPIView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class ThemesAPIView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer


class ThemesByCourseIdAPIView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ThemeSerializer

    def get_queryset(self, *args, **kwargs):
        return Theme.objects.filter(course_id=self.kwargs["pk"])


    # def get(self, request):
    #     return Response({
    #         "courses": ThemeSerializer(Theme.objects.all(), many=True).data
    #     })
    #
    # def post(self, request):
    #     serializer = ThemeSerializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data)
