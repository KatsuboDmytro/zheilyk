import { User } from "./User";

export interface CartType {
  id: number;
  user: User;
  basket_items: Basket[];
}

export interface OrderType {
  id: number;
  // user: User;
  items: Basket[];
  // delivery_address: string; // додане поле
}

export interface Basket {
  id: number;
  item: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  images: string[];
}

export interface Order {
  color: string;
  item: string;
  size: string;
  quantity: number;
}
