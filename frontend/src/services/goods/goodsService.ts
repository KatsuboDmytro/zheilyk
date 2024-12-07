import { goodsClient } from '../../http/goods/goodsClient.js';
import { Order } from '../../types/Cart.js';

const goodsService = {
  getItems: async () => {
    return goodsClient.get(`/api/v1/store/items/`);
  },
  getOneItem: async (id: string | undefined) => {
    return goodsClient.get(`/api/v1/store/items/${id}`);
  },
  putItemAtCart: async (item: Order) => {
    return goodsClient.post(`/api/v1/store/basket/`, { item });
  },
};

export default goodsService;
