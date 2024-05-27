import { CartItem } from "~/models/CartItem";

export type Cart = {
  id: string,
  items: CartItem[],
};

export type CartDTO = {
  cart: Cart,
  total: number,
};
