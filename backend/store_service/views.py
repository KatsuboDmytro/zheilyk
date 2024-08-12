import stripe
from django.shortcuts import redirect
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import Basket, Category, Item, Order, OrderItem
from .serializers import (
    BasketSerializer,
    CategorySerializer,
    ItemDetailSerializer,
    ItemSerializer,
    OrderSerializer,
    BasketListSerializer,
)
from config import settings

from user_service.models import User, DeliveryAddress


@extend_schema_view(
    list=extend_schema(
        summary="List items",
        description="Retrieve a list of items, with optional filters for size, color, brand, sale status, stock status, and ordering.",
        responses={200: ItemSerializer(many=True)},
    ),
    retrieve=extend_schema(
        summary="Retrieve an item",
        description="Retrieve detailed information about a specific item.",
        responses={200: ItemDetailSerializer},
    ),
)
class ItemModelViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ItemDetailSerializer
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


@extend_schema_view(
    create=extend_schema(
        summary="Create a basket",
        description="Create a new basket for the current user and add items to it.",
        responses={201: BasketSerializer},
    ),
)
class BasketModelViewSet(viewsets.ModelViewSet):
    serializer_class = BasketSerializer
    queryset = Basket.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        basket, created = Basket.objects.get_or_create(user=self.request.user)
        items = serializer.validated_data.get("items", [])
        for item in items:
            basket.items.add(item)
        basket.save()

    def get_serializer_class(self):
        if self.action == "create":
            return BasketSerializer
        return BasketListSerializer


@extend_schema_view(
    list=extend_schema(
        summary="List categories",
        description="Retrieve a list of categories.",
        responses={200: CategorySerializer(many=True)},
    ),
)
class CategoryModelViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


@extend_schema_view(
    create=extend_schema(
        request=OrderSerializer,
        summary="Create an order",
        description="Create a new order for the user, including delivery address and items from the basket.",
        responses={201: OrderSerializer},
    ),
)
class OrderModelViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        basket = self.get_basket_for_user(user)
        delivery_address = self.get_delivery_address(user)

        order = self.create_order(user, basket, delivery_address)
        self.create_order_items(basket, order)
        self.delete_basket(basket)
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def create_order_items(self, basket: Basket, order: Order):
        for basket_item in basket.items.all():
            OrderItem.objects.create(
                order=order, item=basket_item, price=basket_item.price
            )

    def get_basket_for_user(self, user: User) -> Basket:
        basket = Basket.objects.get(user=user)
        return basket

    def delete_basket(self, basket) -> None:
        basket.delete()

    def get_delivery_address(self, user: User) -> str:
        return DeliveryAddress.objects.get(user=user)

    def create_order(
        self, user: User, basket: Basket, delivery_address: DeliveryAddress
    ) -> Order:
        return Order.objects.create(
            user=user, basket=basket, delivery_address=delivery_address
        )


def create_checkout_session(basket_items):
    try:
        line_items = []

        for item in basket_items:
            price = stripe.Price.create(
                unit_amount=int(item.price * 100),
                currency="usd",
                product_data={
                    "name": item.name,
                    "description": item.description,
                },
            )

            line_items.append(
                {
                    "price": price.id,
                    "quantity": item.quantity,
                }
            )

        checkout_session = stripe.checkout.Session.create(
            line_items=line_items,
            mode="payment",
            success_url=settings.YOUR_DOMAIN + "/success.html",
            cancel_url=settings.YOUR_DOMAIN + "/cancel.html",
        )
    except stripe.error.StripeError as e:
        return redirect("/error.html?message=" + str(e))
    return redirect(checkout_session.url, code=303)
