from django.contrib.auth import get_user_model
from rest_framework import generics, viewsets, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User

from user_service.serializers import UserSerializer, ManageUserSerializer


class UserModelView(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = ManageUserSerializer
    queryset = get_user_model().objects.all()

    def get_object(self):
        return self.request.user


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

class VerifyEmailView(generics.GenericAPIView):
    def get(self, request):
        token = request.query_params.get('token', None)
        try:
            user = get_user_model().objects.get(verification_token=token)
        except User.DoesNotExist:
            return Response({"error": "Пользователь с данным токеном не найден"}, status=status.HTTP_404_NOT_FOUND)

        user.is_email_verified = True
        user.verification_token = None
        user.save()

        return Response({"success": "Почта успешно подтверждена"}, status=status.HTTP_200_OK)
