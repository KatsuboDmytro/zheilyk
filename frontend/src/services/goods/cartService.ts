
import { goodsClient } from '../../http/goods/goodsClient';
import { Basket, Order } from '../../types/Cart';

interface CartService {
  addCartItem: (item: Order) => Promise<any>;
  getCart: () => Promise<any>;
  createOrder: (clientData: any) => Promise<any>;
  getOrder: () => Promise<any>;
  updateCart: (cart: Basket) => Promise<any>;
  deleteItemFromCart: (id: number) => Promise<any>;
}

const cartService: CartService = {
  addCartItem: (good) => {
    return goodsClient.post(`/api/v1/store/basket-items/`, good);
  },
  getCart: () => {
    return goodsClient.get(`/api/v1/store/basket/`);
  },
  updateCart: (cart) => {
    return goodsClient.patch(`/api/v1/store/basket-items/${cart.id}/`, {
      quantity: cart.quantity,
    });
  },
  getOrder: () => {
    return goodsClient.get(`/api/v1/store/orders/`);
  },
  createOrder: (clientData) => {
    return goodsClient.post(`/api/v1/store/orders/`, clientData);
  },
  deleteItemFromCart: (id) => {
    return goodsClient.delete(`/api/v1/store/basket-items/${id}`);
  },
};

export default cartService;