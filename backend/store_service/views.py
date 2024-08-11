from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import Basket, Category, Item
from .serializers import (BasketSerializer, CategorySerializer,
                          ItemDetailSerializer, ItemSerializer)


class ItemModelViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ItemDetailSerializer
        else:
            return self.serializer_class

    def get_queryset(self):
        queryset = Item.objects.all()
        size = self.request.query_params.get("size", None)
        if size:
            queryset = queryset.filter(size__contains=size)
        color = self.request.query_params.get("color", None)
        if color:
            queryset = queryset.filter(color__contains=color)
        brand = self.request.query_params.get("brand", None)
        if brand:
            queryset = queryset.filter(brand__contains=brand)
        sale = self.request.query_params.get("sale", None)
        if sale:
            sale = sale.lower() == "true"
            queryset = queryset.filter(sale=sale)
        in_stock = self.request.query_params.get("in_stock", None)
        if in_stock:
            in_stock = in_stock.lower() == "true"
            queryset = queryset.filter(in_stock=in_stock)
        ordering = self.request.query_params.get("ordering", None)
        if ordering:
            if ordering.lower() == "newest":
                queryset = queryset.order_by("-id")
            elif ordering.lower() == "cheaper":
                queryset = queryset.order_by("price")
            elif ordering.lower() == "exp":
                queryset = queryset.order_by("-price")
        return queryset


class BasketModelViewSet(viewsets.ModelViewSet):
    serializer_class = BasketSerializer
    queryset = Basket.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class CategoryModelViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
