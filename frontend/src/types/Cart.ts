import { User } from "./User";

export interface CartType {
  id: number;
  user: User;
  basket_items: Basket[];
}

export interface Basket {
  id: number;
  item: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Order {
  color: string,
  item: string,
  size: string,
  quantity: number,
  id: number,
}