import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Good } from '../types/Good';

export interface ActionState {
  goods: Good[];
  cart: Good[];
}

const loadStateFromLocalStorage = (): ActionState => {
  if (!localStorage.getItem('goods')) {
    localStorage.setItem('goods', JSON.stringify([]));
  }
  const storedGoods = localStorage.getItem('goods');
  const goods = storedGoods ? JSON.parse(storedGoods) : [];
  const cart = JSON.parse(localStorage.getItem('cart') || 'null');

  return { goods, cart };
};

const saveStateToLocalStorage = (state: ActionState) => {
  localStorage.setItem('goods', JSON.stringify(state.goods));
};

const initialState: ActionState = loadStateFromLocalStorage();

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    setGoods: (state: ActionState, action) => {
      state.goods = action.payload;
      saveStateToLocalStorage(state);
    },
    addInCart: (state: ActionState, action) => {
      state.cart = action.payload;
      saveStateToLocalStorage(state);
    },
    init: (state: ActionState) => {
      const loadedState = loadStateFromLocalStorage();
      state.goods = loadedState.goods;
    },
  },
});

export const {
  setGoods,
  addInCart,
  init,
} = goodsSlice.actions;

export default goodsSlice.reducer;
