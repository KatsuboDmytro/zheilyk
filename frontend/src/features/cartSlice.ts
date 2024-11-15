import { createSlice } from "@reduxjs/toolkit";
import { Basket, CartType } from "../types/Cart";

export interface ActionState {
  cart: Basket[];
}

const loadStateFromLocalStorage = (): ActionState => {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  const cart = JSON.parse(localStorage.getItem('cart') || 'null');

  return { cart };
};

const saveStateToLocalStorage = (state: ActionState) => {
  localStorage.setItem('cart', JSON.stringify(state.cart));
};

const initialState: ActionState = loadStateFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state: ActionState, action) => {
      state.cart = action.payload;
      saveStateToLocalStorage(state);
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
