import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';


export interface ActionState {
  isChecked: boolean;
  user: User | null;
}

const loadStateFromLocalStorage = (): ActionState => {
  const isChecked = JSON.parse(localStorage.getItem('isChecked') || 'false');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return { isChecked, user };
};

const saveStateToLocalStorage = (state: ActionState) => {
  localStorage.setItem('isChecked', JSON.stringify(state.isChecked));
  localStorage.setItem('user', JSON.stringify(state.user));
};

const initialState: ActionState = loadStateFromLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setChecked: (state: ActionState, action: PayloadAction<boolean>) => {
      state.isChecked = action.payload;
      saveStateToLocalStorage(state);
    },
    setUser: (state: ActionState, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      saveStateToLocalStorage(state);
    },
    init: (state: ActionState) => {
      const loadedState = loadStateFromLocalStorage();
      state.isChecked = loadedState.isChecked;
      state.user = loadedState.user;
    },
  },
});

export const {
  setChecked,
  setUser,
  init,
} = authSlice.actions;

export default authSlice.reducer;
