import stripe
from django.shortcuts import redirect
from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import Basket, Category, Item, Order, OrderItem
from .serializers import (BasketSerializer, CategorySerializer,
                          ItemDetailSerializer, ItemSerializer, OrderSerializer)
from config import settings


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


class CategoryModelViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class OrderModelViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def create(self, request, *args, **kwargs):
        user = request.user
        delivery_address_data = request.data.get('delivery_address', {})

        basket = self.get_basket_for_user(user)
        if not basket:
            return Response({"detail": "Корзина не найдена."}, status=status.HTTP_400_BAD_REQUEST)

        if not self.has_items_in_basket(basket):
            return Response({"detail": "Корзина пуста."}, status=status.HTTP_400_BAD_REQUEST)

        delivery_address = self.create_delivery_address(delivery_address_data)
        order = self.create_order(user, delivery_address)

        self.create_order_items(basket, order)
        self.clear_basket(basket)

        serializer = self.get_serializer(order)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_basket_for_user(self, user):
        try:
            return Basket.objects.get(user=user)
        except Basket.DoesNotExist:
            return None

    def has_items_in_basket(self, basket):
        return basket.items.exists()

    def create_delivery_address(self, delivery_address_data):
        from backend.user_service.models import DeliveryAddress
        return DeliveryAddress.objects.create(**delivery_address_data)

    def create_order(self, user, delivery_address):
        return Order.objects.create(
            user=user,
            delivery_address=delivery_address,
            is_paid=False
        )

    def create_order_items(self, basket, order):
        create_checkout_session(basket.items.all())

        for basket_item in basket.items.all():
            item = basket_item.item
            OrderItem.objects.create(
                order=order,
                item=item,
                quantity=basket_item.quantity,
                unit_price=item.price
            )

    def clear_basket(self, basket):
        basket.items.clear()


def create_checkout_session(basket_items):
    try:
        line_items = []

        for item in basket_items:
            price = stripe.Price.create(
                unit_amount=int(item.price * 100),
                currency='usd',
                product_data={
                    "name": item.name,
                    "description": item.description,
                },
            )

            line_items.append({
                'price': price.id,
                'quantity': item.quantity,
            })

        # Создание сессии оформления заказа
        checkout_session = stripe.checkout.Session.create(
            line_items=line_items,
            mode='payment',
            success_url=settings.YOUR_DOMAIN + '/success.html',
            cancel_url=settings.YOUR_DOMAIN + '/cancel.html',
        )
    except stripe.error.StripeError as e:
        return redirect('/error.html?message=' + str(e))
    return redirect(checkout_session.url, code=303)
