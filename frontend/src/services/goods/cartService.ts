import { authClient } from '../../http/auth/authClient';
import { goodsClient } from '../../http/goods/goodsClient';
import { Basket, CartType, Order, OrderType } from '../../types/Cart';
import { accessTokenService } from '../access/accessTokenService';

interface CartService {
  addCartItem: (item: Order, language: string) => Promise<any>;
  getCart: (language: string) => Promise<any>;
  createOrder: (clientData: any, language: string) => Promise<any>;
  getOrder: (language: string) => Promise<any>;
  updateCart: (cart: Basket, language: string) => Promise<any>;
  deleteItemFromCart: (id: number, language: string) => Promise<any>;
}

const cartService: CartService = {
  addCartItem: async (good, language) => {
    try {
      const accessToken = accessTokenService.get();
      console.log("🚀 ~ addCartItem: ~ accessToken:", accessToken)

      return await authClient.post(`en/api/v1/store/basket-items/`, good, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      console.error('Failed to send request to add cart item:', error);
      throw error;
    }
  },
  getCart: (language) => {
    const accessToken = accessTokenService.get();

    return goodsClient.get(`${language}/api/v1/store/basket/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  updateCart: (cart, language) => {
    const accessToken = accessTokenService.get();

    return goodsClient.patch(`${language}/api/v1/store/basket-items/${cart.id}/`, {
      quantity: cart.quantity
    }, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  getOrder: (language) => {
    const accessToken = accessTokenService.get();

    return goodsClient.get(`${language}/api/v1/store/orders/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  createOrder: (clientData, language) => {
    const accessToken = accessTokenService.get();

    return goodsClient.post(`en/api/v1/store/orders/`, clientData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  deleteItemFromCart: (id, language) => {
    const accessToken = accessTokenService.get();

    return goodsClient.delete(`${language}/api/v1/store/basket-items/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default cartService;