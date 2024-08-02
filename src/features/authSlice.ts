import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';
import axios from 'axios';

export interface ActionState {
  isChecked: boolean;
  user: null | string;
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

export const activate = createAsyncThunk<
  string,
  string | undefined,
  {
    rejectValue: { message: string };
  }
>(
  'auth/activate',
  async (activationToken, { rejectWithValue }) => {
    try {
      const response = await authService.activate(activationToken);
      const { accessToken, user } = response.data;
      accessTokenService.save(accessToken);
      return user;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue({ message: error.message });
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuthStatus: (state: ActionState, action: PayloadAction<boolean>) => {
      state.isChecked = action.payload;
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
  checkAuthStatus,
  init,
} = authSlice.actions;

export default authSlice.reducer;
