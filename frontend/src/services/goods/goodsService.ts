import { goodsClient } from '../../http/goods/goodsClient.js';
import { Order } from '../../types/Cart.js';

interface GoodsService {
  getItems: (language: string) => Promise<any>;
  getOneItem: (id: string | undefined, language: string) => Promise<any>;
  putItemAtCart: (item: Order, language: string, id: any) => Promise<any>;
}

const goodsService: GoodsService = {
  getItems: (language) => {
    return goodsClient.get(`${language}/api/v1/store/items/`);
  },
  getOneItem: (id, language) => {
    return goodsClient.get(`${language}/api/v1/store/items/${id}`);
  },
  putItemAtCart: (item, language) => {
    return goodsClient.post(`${language}/api/v1/store/basket/`, { item });
  },
};

export default goodsService;
