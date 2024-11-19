import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Good } from '../types/Good';
import { BRAND, COLORS, SIZES } from '../vars';
import { CartType } from '../types/Cart';

export interface ActionState {
  goods: Good[];
  cart: CartType[];
  inputFilter?: string;
  language: string;
}

const loadStateFromLocalStorage = (): ActionState => {
  if (!localStorage.getItem('language')) {
    localStorage.setItem('language', JSON.stringify('en'));
  }
  if (!localStorage.getItem('goods')) {
    localStorage.setItem('goods', JSON.stringify([]));
  }
  const storedGoods = localStorage.getItem('goods');
  const goods = storedGoods ? JSON.parse(storedGoods) : [];
  const cart = JSON.parse(localStorage.getItem('cart') || 'null');
  const inputFilter = JSON.parse(localStorage.getItem('inputFilter') || 'null');
  const storedLang = localStorage.getItem('language');
  const language = storedLang ? JSON.parse(storedLang) : 'uk';

  return { goods, cart, inputFilter, language };
};

const saveStateToLocalStorage = (state: ActionState) => {
  localStorage.setItem('goods', JSON.stringify(state.goods));
  localStorage.setItem('language', JSON.stringify(state.language));
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
    setFilters: (state: ActionState, action: PayloadAction<Good[]>) => {
      const uniqueValues = (arr: string[]): string[] => Array.from(new Set(arr));
      
      if (!Array.isArray(action.payload)) {
        console.error("Expected action.payload to be an array of goods.");
        return;
      }

      const colors = action.payload
        .flatMap((good: Good) =>
          Array.isArray(good.additional_info)
            ? good.additional_info.map(info => info.color.toLowerCase())
            : []
        )
        .filter((color: string) => color);

      const sizes = action.payload
        .flatMap((good: Good) =>
          Array.isArray(good.additional_info)
            ? good.additional_info.map(info => info.size)
            : []
        )
        .filter((size: string) => size);

      const brands = action.payload
        .map((good: Good) => good.brand)
        .filter((brand: string) => brand);

      COLORS.splice(0, COLORS.length, ...uniqueValues(colors));
      SIZES.splice(0, SIZES.length, ...uniqueValues(sizes));
      BRAND.splice(0, BRAND.length, ...uniqueValues(brands));
    },
    setLanguage: (state: ActionState, action: PayloadAction<string>) => {
      state.language = action.payload;
      saveStateToLocalStorage(state);
    },
    setInputFilter: (state: ActionState, action) => {
      state.inputFilter = action.payload;
      saveStateToLocalStorage(state);
    },
    init: (state: ActionState) => {
      const loadedState = loadStateFromLocalStorage();
      state.goods = loadedState.goods;
      state.language = loadedState.language;
    },
  },
});

export const {
  setGoods,
  setFilters,
  setInputFilter,
  setLanguage,
  init,
} = goodsSlice.actions;

export default goodsSlice.reducer;
