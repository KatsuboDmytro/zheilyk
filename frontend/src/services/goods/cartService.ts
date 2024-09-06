import { authClient } from '../../http/auth/authClient';
import { goodsClient } from '../../http/goods/goodsClient';

interface CartService {
  addCartItem: (language: string, item: any) => Promise<any>;
  getCart: (language: string) => Promise<any>;
  deleteCartItem: (language: string, id: any) => Promise<any>;
  createBasket: (language: string, params: { cart: any; accessToken: any }) => Promise<any>;
}

const cartService: CartService = {
  addCartItem: async (language, item) => {
    try {
      return await authClient.post(`${language}/api/v1/store/basket-items/`, item);
    } catch (error) {
      console.error('Failed to send request to add cart item:', error);
      throw error;
    }
  },

  getCart: (language) => {
    return goodsClient.get(`${language}/api/v1/store/basket/`);
  },

  deleteCartItem: (language, id) => {
    return goodsClient.delete(`${language}/api/v1/store/basket-items/${id}/`);
  },

  createBasket: (language, { cart, accessToken }) => {
    return goodsClient.post(`${language}/api/v1/store/basket/`, { cart }, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default cartService;
