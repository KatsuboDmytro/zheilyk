import { authClient } from '../../http/auth/authClient';
import { goodsClient } from '../../http/goods/goodsClient';
import { CartType, Order } from '../../types/Cart';
import { accessTokenService } from '../access/accessTokenService';

interface CartService {
  addCartItem: (item: Order, language: string) => Promise<any>;
  getCart: (language: string) => Promise<any>;
  updateCart: (item: CartType, language: string) => Promise<any>;
}

const cartService: CartService = {
  addCartItem: async (good, language) => {
    try {
      const accessToken = accessTokenService.get();

      return await authClient.post(`/${language}/api/v1/store/basket-items/`, good, {
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

    return goodsClient.put(`${language}/api/v1/store/basket/${cart.id}/`, cart, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default cartService;
